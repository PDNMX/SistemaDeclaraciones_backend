import {
  Context,
  Login,
  Role,
  UserDocument,
  UserProfileInput,
  UserSignUpInput,
  UsersPage,
} from '../../types';
import { UserRepository } from '../../db/repositories/user_repo';

export default {
  Query: {
    forgotPassword(_: unknown, args: { username: string }): Promise<boolean> {
      return UserRepository.forgotPassword(args.username);
    },

    login(_: unknown, args: { username: string, password: string }): Promise<Login> {
      return UserRepository.login(args.username, args.password);
    },

    userProfile(_: unknown, args: unknown, context: Context): Promise<UserDocument> {
      return UserRepository.getUser(context.user.id);
    },

    users(_: unknown, args: { pageNumber?: number }): Promise<UsersPage> {
      return UserRepository.getAll(args.pageNumber);
    },
  },

  Mutation: {
    changeRoles(_: unknown, args: { userID: string, roles:[Role] }): Promise<UserDocument> {
      return UserRepository.changeRoles(args.userID, args.roles);
    },

    changePassword(_: unknown, args: { oldPassword: string, newPassword: string }, context: Context): Promise<boolean> {
      return UserRepository.changePassword(context.user.id, args.oldPassword, args.newPassword);
    },

    resetPassword(_: unknown, args: { token: string, newPassword: string }): Promise<boolean> {
      return UserRepository.resetPassword(args.token, args.newPassword);
    },

    signup(_: unknown, args: { user: UserSignUpInput }): Promise<UserDocument> {
      return UserRepository.signup(args.user);
    },

    updateUserProfile(_: unknown, args: { profile: UserProfileInput }, context: Context): Promise<UserDocument> {
      return UserRepository.updateProfile(args.profile, context);
    },
  }
};
