import { DeclaracionDocument, UserDocument } from './documents';

interface Pagination {
  pageNumber: number;
}

export interface UsersPage extends Pagination {
  docs: UserDocument[];
}

export interface DeclaracionesPage extends Pagination {
  docs: DeclaracionDocument[];
}
