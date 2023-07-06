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
import CreateError from 'http-errors';
import { UserRepository } from '../../db/repositories/user_repo';

export default {
  Query: {
    forgotPassword(_: unknown, args: { username: string }): Promise<boolean> {
      return UserRepository.forgotPassword(args.username);
    },

    login(_: unknown, args: { username: string, password: string }): Promise<Login> {
      return UserRepository.login(args.username, args.password);
    },

    search(_: unknown, args: { keyword: string, pagination?: PaginationInputOptions }): Promise<Pagination<UserES>> {
      return UserRepository.search(args.keyword, args.pagination);
    },

    userProfile(_: unknown, args: { id?: string }, context: Context): Promise<UserDocument> {
      const scopes = context.user.scopes;
      if (scopes.includes('UserProfile:read:all')) {
        return UserRepository.getUser(args.id || context.user.id);
      } else if ((!args.id || args.id === context.user.id) && scopes.includes('UserProfile:read:mine')) {
        return UserRepository.getUser(context.user.id);
      }

      throw new CreateError.Unauthorized(`User[${context.user.id}] is not allowed to perform this operation.`);
    },

    users(_: unknown, args: { pagination?: PaginationInputOptions }): Promise<Pagination<UserDocument>> {
      return UserRepository.getAll(args.pagination);
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
    restaurarContrasena(_: unknown, args: { usuario: string, nuevaContrasena: string }): Promise<boolean> {
      return UserRepository.restaurarContrasena(args.usuario, args.nuevaContrasena);
    },
  }
};
