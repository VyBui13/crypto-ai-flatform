export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
};

export type PaginationRequest = {
  page?: number;
  pageSize?: number;
  isUnpaged?: boolean;
};

export type FilterRequest<TFilter = Record<string, any>> = {
  filter?: TFilter;
};

export type SortRequest<TSortField extends string = string> = {
  sortBy?: TSortField;
  sortOrder?: "asc" | "desc";
};

export type BaseListRequest<
  TFilter = Record<string, any>,
  TSortField extends string = string,
> = PaginationRequest & FilterRequest<TFilter> & SortRequest<TSortField>;
