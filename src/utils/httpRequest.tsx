import {PaginatedData} from './paginatedData';

export enum httpRequestStatus {
  Pending,
  Fullfilled,
  Rejected
}

export interface httpState<TData> {
  data: TData | null;
  status: httpRequestStatus,
  error: null
}
export class ModelState {
  public static initiateModel<TModel>(): TModel {
    return new (class {}) as TModel;
  }

  public static initiatePaginatedData<TModel>(): httpState<PaginatedData<TModel>> {
    return {
      data: {
        pageNumber: null,
        pageSize: null,
        totalPages: null,
        countOfAllItems: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        items: []
      },
      status: httpRequestStatus.Pending,
      error: null
    };
  }
}