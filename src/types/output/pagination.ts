export interface Pagination<T> {
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: Boolean; // eslint-disable-line
  hasNextPage?: Boolean; // eslint-disable-line
  prevPage?: number;
  nextPage?: number;
  hasMore?: Boolean; // eslint-disable-line
  docs: T[];
}
