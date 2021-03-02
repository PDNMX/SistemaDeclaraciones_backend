import jwt from 'jsonwebtoken';

export default class Jwt {

  public static sign(data: any): string {
    return jwt.sign(data, `${process.env.JWT_SECRET}`, {
      expiresIn: '8h',
    });
  }

  public static decodeToken(token: string): any {
    try {
      return jwt.verify(token, `${process.env.JWT_SECRET}`, {
        algorithms: ['HS256', 'RS256']
      });
    } catch(err) {
      if (err.name === 'TokenExpiredError') {
        throw new Error('Your token is expired');
      }

      throw new Error('You are not authorized for this resource');
    }
  }
}
