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
import BCrypt from '../../library/BCrypt';
import CreateError from 'http-errors';
import Crypto from 'crypto';
import ElasticSearchAPI from '../../elasticsearch/es_api';
import Jwt from '../../library/jwt';
import { Scopes } from '../../config';
import Sendgrid from '@sendgrid/mail';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user_model';


export class UserRepository {

  public static async changeRoles(userID: string, roles:[Role]): Promise<UserDocument> {
    const user = await UserModel.findById({ _id: userID });
    if (!user) {
      throw new CreateError.NotFound(`User[${userID}] does not exist.`);
    }

    user.roles = roles;
    user.save();
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

    const data = {
      id: user._id,
      salt: Crypto.randomBytes(20).toString('hex'),
      expiration: Date.now() + (60 * 60 * 1000), // 1HOUR
    };
    const token = Jwt.sign(data);
    const message = {
      to: username,
      from: `${process.env.SENDGRID_MAIL_SENDER}`,
      subject: 'Recuperación de Contraseña',
      text: `Para recuperar tu contraseña por favor usa el siguiente enlace: ${process.env.FE_RESET_PASSWORD_URL}?token=${token}`,
    };

    Sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);
    user.resetToken = data;
    try {
      await Sendgrid.send(message);
      user.save();

      return true;
    } catch(e) {
      throw CreateError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong at forgotPassword',
        {debug_info: {username, error: e}},
      );
      return false;
    }
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

    return { docs: [], page, limit, hasMore: false, hasNextPage: false, hasPrevPage: false }
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

    const data = {
      id: user._id,
      roles: user.roles,
      scopes: Scopes.createByRoles(user.roles),
    };

    return {
      user: user,
      jwtToken: Jwt.sign(data),
    };
  }

  public static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const decodedToken = Jwt.decodeToken(token);
    const user = await UserModel.findById({ _id: decodedToken.id });
    if (!user) {
      throw new CreateError.NotFound(`User[${decodedToken.id}] does not exist.`);
    } else if (user.resetToken.salt !== decodedToken.salt) {
      throw new CreateError.Forbidden('Token is invalid');
    } else if(user.resetToken.expiration && user.resetToken.expiration < Date.now()) {
      throw new CreateError.BadRequest('Token is already expired');
    }

    user.password = BCrypt.hash(newPassword);
    user.resetToken = {};
    user.save();
    return true;
  }

  public static async signup(user: UserSignUpInput): Promise<UserDocument> {
    user.password = BCrypt.hash(user.password);
    try {
      const createdUser = await UserModel.create(user);
      await ElasticSearchAPI.add(createdUser);

      return createdUser;
    } catch(err) {
      throw new CreateError.BadRequest(`User with username: ${user.username} already exist`);
    }
  }

  public static search(keyword: string, pagination: PaginationInputOptions = {}): Promise<Pagination<UserES>> {
    return ElasticSearchAPI.search(keyword, pagination);
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

    await ElasticSearchAPI.update(updatedProfile);
    return updatedProfile;
  }
}
