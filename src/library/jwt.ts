import CreateError from 'http-errors';
import { JWTConfig } from '../types';
import jwt from 'jsonwebtoken';


export class Jwt {
  public static sign(config: JWTConfig, data: any): string {
    return jwt.sign(data, config.secret, {
      expiresIn: config.expiresIn,
    });
  }

  public static decodeToken(secret: string, token: string): any {
    try {
      return jwt.verify(token, secret, {
        algorithms: ['HS256', 'RS256']
      });
    } catch(err) {
      if (err.name === 'TokenExpiredError') {
        throw new CreateError.Unauthorized('Your token is expired');
      }

      throw new CreateError.Unauthorized('You are not authorized for this resource');
    }
  }
}
