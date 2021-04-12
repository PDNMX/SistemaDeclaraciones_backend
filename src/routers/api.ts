import { EnvironmentConfig, Scopes } from '../config';
import CreateError from 'http-errors';
import Express from 'express';
import JWTMiddleware from 'express-jwt';
import { Jwt } from '../library';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../db/models/user_model';


export class ApiRouter {
  private router: Express.Router;

  public constructor() {
    this.router = Express.Router();
    this.router.post(
      '/new-jwt-token',
      JWTMiddleware({ secret: EnvironmentConfig.RefreshJWTConfig.secret, algorithms: ['HS256', 'RS256'] }),
      ApiRouter.refreshToken,
    );
  }

  public getRouter(): Express.Router {
    return this.router;
  }

  public static create(app: Express.Application): void {
    const api: ApiRouter = new ApiRouter();
    app.use(api.getRouter());
  }

  private static async refreshToken(req: Express.Request, res: Express.Response): Promise<any> {
    const user = await UserModel.findById({ _id: req.user.id });
    if (!user) {
      throw new CreateError.Forbidden('There is an unwanted request.');
    } else if(!user.refreshJwtToken.expiration || user.refreshJwtToken.salt !== req.user.salt) {
      throw new CreateError.Forbidden('Token is invalid');
    } else if(user.refreshJwtToken.expiration < Date.now()) {
      throw new CreateError.BadRequest('Token is already expired');
    }

    const token =  Jwt.sign(EnvironmentConfig.AuthJWTConfig, {
      id: user._id,
      roles: user.roles,
      scopes: Scopes.createByRoles(user.roles),
    });

    return res.status(StatusCodes.OK).send({
      token: token,
    });
  }
}
