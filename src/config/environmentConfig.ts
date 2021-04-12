import { JWTConfig } from '../types';

export class EnvironmentConfig {
  static AuthJWTConfig: JWTConfig;
  static RefreshJWTConfig: JWTConfig;
  static EmailJWTConfig: JWTConfig;

  public static build(): void {
    EnvironmentConfig.AuthJWTConfig = {
      secret: `${process.env.JWT_SECRET}`,
      expiresIn: `${process.env.JWT_EXPIRATION}`,
    };

    EnvironmentConfig.RefreshJWTConfig = {
      secret: `${process.env.REFRESH_JWT_SECRET}`,
      expiresIn: `${process.env.REFRESH_JWT_EXPIRATION}`,
    };

    EnvironmentConfig.EmailJWTConfig = {
      secret: `${process.env.REFRESH_JWT_SECRET}`,
      expiresIn: '1h',
    };
  }
}
