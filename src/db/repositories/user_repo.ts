import { BCrypt, SendgridClient } from '../../library';
import {
  Context,
  Login,
  Pagination,
  PaginationInputOptions,
  Role,
  UserDocument,
  UserES,
  UserProfileInput,
  UserSignUpInput,
} from '../../types';
import { EnvironmentConfig, Scopes } from '../../config';
import CreateError from 'http-errors';
import Crypto from 'crypto';
// import ElasticSearchAPI from '../../elasticsearch/es_api';
import { Jwt } from '../../library';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user_model';
import ms from 'ms';

export class UserRepository {

  public static async changeRoles(userID: string, roles:[Role]): Promise<UserDocument> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    user.roles = roles;
    user.save();
    //await ElasticSearchAPI.update(user);

    return user;
  }

  public static async changePassword(userID: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    if (!BCrypt.compare(oldPassword, user.password)) {
      throw new CreateError.Forbidden('Provided old password does not match.');
    }

    user.password = BCrypt.hash(newPassword);
    user.resetToken = {};
    user.save();

    return true;
  }

  public static async forgotPassword(username: string): Promise<boolean> {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      throw new CreateError.NotFound(`User[${username}] does not exist.`);
    }

    const salt = Crypto.randomBytes(20).toString('hex');
    const token = Jwt.sign(EnvironmentConfig.EmailJWTConfig, {
      id: user._id,
      salt: salt,
    });
    var enviado = await SendgridClient.sendRecoveryPassword(username, Buffer.from(token).toString('base64'));
    user.resetToken = {
      salt: salt,
      expiration: Date.now() + ms(EnvironmentConfig.EmailJWTConfig.expiresIn),
    };

    if(enviado){
      user.save();
      return enviado;
    }
    else
      throw new CreateError.BadRequest("Error al enviar el correo electrónico");
  }

  public static async getAll(pagination: PaginationInputOptions = {}): Promise<Pagination<UserDocument>> {
    const page: number = pagination.page || 0;
    const limit: number = pagination.size || 20;
    const users = await UserModel.paginate({
      sort: { createdAt: 'desc'},
      page: page + 1,
      limit: Math.min(limit, 100),
    });
    if (users) {
      return users;
    }

    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false };
  }

  public static async getUser(userID: string): Promise<UserDocument> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    return user;
  }

  public static async login(username: string, password: string): Promise<Login> {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      throw new CreateError.NotFound(`User[${username}] does not exist.`);
    } else if (!BCrypt.compare(password, user.password)) {
      throw new CreateError.Forbidden('The provided password does not match.');
    }

    // NOTE: Only the last successfully logged user is allowed to use the refresh token
    user.refreshJwtToken = {
      salt: Crypto.randomBytes(20).toString('hex'),
      expiration: Date.now() + ms(EnvironmentConfig.RefreshJWTConfig.expiresIn),
    };
    user.save();

    return {
      user: user,
      jwtToken: Jwt.sign(EnvironmentConfig.AuthJWTConfig, {
        id: user._id,
        roles: user.roles,
        scopes: Scopes.createByRoles(user.roles),
      }),
      refreshJwtToken: Jwt.sign(EnvironmentConfig.RefreshJWTConfig, {
        id: user._id,
        salt: user.refreshJwtToken.salt,
      }),
    };
  }

  public static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const decodedToken = Jwt.decodeToken(
        EnvironmentConfig.EmailJWTConfig.secret,
        Buffer.from(token, 'base64').toString()
    );
    const user = await UserModel.findById({ _id: decodedToken.id });
    if (!user) {
      throw new CreateError.NotFound(`User[${decodedToken.id}] does not exist.`);
    } else if (!user.resetToken.expiration || user.resetToken.salt !== decodedToken.salt) {
      throw new CreateError.Forbidden('Token is invalid');
    } else if(user.resetToken.expiration < Date.now()) {
      throw new CreateError.BadRequest('Token is already expired');
    }

    user.password = BCrypt.hash(newPassword);
    user.resetToken = {};
    user.save();
    return true;
  }

  public static async signup(user: UserSignUpInput): Promise<UserDocument> {
    user.password = BCrypt.hash(user.password);

    var existe = await UserModel.findOne({ $or: [{username: user.username}, {curp: user.curp}, {rfc: user.rfc}] });
    if(existe != null)
      throw new CreateError.BadRequest("El usuario ya está registrado en el sistema, los campos CURP, RFC y correo electrónico deben ser únicos");

    try {
      const createdUser = await UserModel.create(user);
      //await ElasticSearchAPI.add(createdUser);

      return createdUser;
    } catch(err: any) {
      throw new CreateError.BadRequest(err);
    }
  }

  public static async  search(keyword: string, pagination: PaginationInputOptions = {}): Promise<Pagination<UserES>> {
    var filtro = {$or: [
      {"username": {'$regex': keyword, "$options": "i"} },
      {"nombre": {'$regex': keyword, "$options": "i"}},
      {"primerApellido": {'$regex': keyword, "$options": "i"}},
      {"segundoApellido": {'$regex': keyword, "$options": "i"}}
    ]};

    var retorno = UserModel.find(filtro).sort({
      "primerApellido": 1,
      "segundoApellio": 1,
      "nombre": 1
    })
    .skip((pagination.page || 0) * (pagination.size || 1))
    .limit(pagination.size || 1)
    ;

    var total = (await UserModel.find(filtro)).length;

    var usrsES: Array<UserES> = [];

    (await retorno).forEach((val,index,todos)=> {
      var u: UserES = {
        _id: val.id,
        nombre: val.nombre,
        primerApellido: val.primerApellido,
        segundoApellido: val.segundoApellido,
        curp: val.curp,
        rfc: val.rfc,
        createdAt: val.createdAt.toString(),
        roles: val.roles,
        updatedAt: val.updatedAt.toString(),
        username: val.username
      }

      usrsES.push(u);
    });
    
    return {
      totalDocs: total,
      docs: usrsES,
      page: pagination.page,
      limit: pagination.size,
    };
    //return ElasticSearchAPI.search(keyword, pagination);
  }

  public static async updateProfile(profile: UserProfileInput, context: Context): Promise<UserDocument> {
    const updatedProfile = await UserModel.findOneAndUpdate(
      { _id: context.user.id },
      { $set: profile },
      { new: true, runValidators: true, context: 'query'},
    );

    if (!updatedProfile) {
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong on updateProfile',
        { debug_info: { profile, context } },
      );
    }

    //await ElasticSearchAPI.update(updatedProfile);
    return updatedProfile;
  }

  public static async restaurarContrasena(usuario: string, nuevaContrasena: string) {
    const user = await UserModel.findOne({ username: usuario });
    
    if (!user) {
      throw new CreateError.NotFound(`User[${usuario}] does not exist.`);
    }

    user.password = BCrypt.hash(nuevaContrasena);
    user.resetToken = {};
    user.save();
    return true;
  }
}
