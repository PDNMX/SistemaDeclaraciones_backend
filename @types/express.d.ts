import { Context } from './src/types';

declare global {
    namespace Express {
        interface Request {
            user: Context;
        }
    }
}
