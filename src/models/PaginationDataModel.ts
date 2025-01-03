export type PaginationDataModel<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};
