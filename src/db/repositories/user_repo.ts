import {
  Context,
  Login,
  Role,
  UserDocument,
  UserProfileInput,
  UserSignUpInput,
  UsersPage
} from '../../types';
import BCrypt from '../../library/BCrypt';
import Jwt from '../../library/jwt';
import UserModel from '../models/user_model';
import crypto from 'crypto';
import sendgrid from '@sendgrid/mail';

export class UserRepository {

  public static async changeRoles(userID: string, roles:[Role]): Promise<UserDocument> {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw new Error('USER DOES NOT EXIST');
    }

    user.roles = roles;
    user.save();
    return user;
  }

  public static async changePassword(userID: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw new Error('USER DOES NOT EXIST');
    }

    if (!BCrypt.compare(oldPassword, user.password)) {
      throw new Error('PASSWORD DOES NOT MATCH');
    }

    user.password = BCrypt.hash(newPassword);
    user.resetToken = {};
    user.save();

    return true;
  }

  public static async forgotPassword(username: string): Promise<boolean> {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      throw new Error('USER DOES NOT EXIST');
    }

    const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY as unknown as string;
    sendgrid.setApiKey(SENDGRID_API_KEY);

    const data = {
      salt: crypto.randomBytes(20).toString('hex'),
      exp: Date.now() + (60 * 60 * 1000), // 1HOUR
    };

    const token = Jwt.sign(data);
    const message = {
      to: username,
      from: 'gguerrero@sertech.mx', // Change to your verified sender
      subject: 'Recuperación de contraseña',
      text: `Para recuperar tu contraseña por favor da click en el siguiente link: ${token}`
    };

    try {
      await sendgrid.send(message);
      user.resetToken = data;
      await user.save();

      return true;
    } catch(e) {
      return false;
    }
  }

  public static async getAll(pageNumber = 0): Promise<UsersPage> {
    const nPerPage = 20;
    const offset: number = (pageNumber > 0) ? ((pageNumber - 1) * nPerPage) : 0;
    const users = await UserModel.find()
      .sort({ createdAt: 'desc'})
      .skip(offset)
      .limit(nPerPage);

    return {
      docs: users,
      pageNumber: pageNumber,
    };
  }

  public static async getUser(userID: string): Promise<UserDocument> {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw new Error('USER DOES NOT EXIST');
    }

    return user;
  }

  public static async login(username: string, password: string): Promise<Login> {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      throw new Error('USER DOES NOT EXIST');
    }

    if (!BCrypt.compare(password, user.password)) {
      throw new Error('PASSWORD DOES NOT MATCH');
    }

    const data = {
      id: user._id,
      roles: [user.roles],
    };

    return {
      user: user,
      jwtToken: Jwt.sign(data),
    };
  }

  public static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const decodedToken = Jwt.decodeToken(token);
    const user = await UserModel.findById(decodedToken.username);
    if (!user) {
      throw new Error('USER DOES NOT EXIST');
    } else if (user.resetToken.salt !== decodedToken.salt) {
      throw new Error('SALT IS INVALID');
    } else if(user.resetToken.exp && user.resetToken.exp < Date.now()) {
      throw new Error('RESET TOKEN EXPIRED');
    }

    user.password = BCrypt.hash(newPassword);
    user.resetToken = {};
    user.save();
    return true;
  }

  public static async signup(user: UserSignUpInput): Promise<UserDocument> {
    user.password = BCrypt.hash(user.password);
    return UserModel.create(user);
  }

  public static async updateProfile(profile: UserProfileInput, context: Context): Promise<UserDocument> {
    const updatedProfile = await UserModel.findOneAndUpdate(
      { _id: context.user.id },
      { $set: profile },
      { new: true },
    );

    if (!updatedProfile) {
      throw new Error('USER DOES NOT EXIST');
    }

    return updatedProfile;
  }
}
