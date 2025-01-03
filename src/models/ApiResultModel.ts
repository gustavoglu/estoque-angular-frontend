export type ApiResultModel<T> = {
  success: boolean;
  errors: string[];
  data: T;
};
