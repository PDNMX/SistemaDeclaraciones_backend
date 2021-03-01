import { Declaracion } from './declaraciones';
import { Document } from 'mongoose';
import { User } from './users';


export interface DeclaracionDocument extends Declaracion, Document {
  owner: UserDocument;
}

export interface UserDocument extends User, Document {
  password: string;
  declaraciones: DeclaracionDocument[];
}
