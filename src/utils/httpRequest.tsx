import { PaginatedData } from "./paginatedData";

export enum httpRequestStatus {
  Pending,
  Fullfilled,
  Rejected,
  Settled
}

export interface httpState<TData> {
  data: TData | null;
  status: httpRequestStatus,
  error: null,
  typePrefix: null
}
export class ModelState {
  public static initiateModel<TModel>(): TModel {
    return new (class { }) as TModel;
  }

  public static initiatePaginatedData<TModel>(): httpState<PaginatedData<TModel>> {
    return {
      data: {
        pageNumber: null,
        pageSize: null,
        totalPages: null,
        numberOfTotalItems: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        items: []
      },
      status: httpRequestStatus.Pending,
      error: null,
      typePrefix: null
    };
  }

  public static initiateListData<TModel>(): httpState<TModel[]> {
    return {
      data: [],
      status: httpRequestStatus.Pending,
      error: null,
      typePrefix: null
    };
  }
}

export function getTypePrefix(methodType: string): string {
  const parts = methodType.split('/');
  parts.pop();
  return parts.join('/');
}
export function getStatus(methodType: string): httpRequestStatus | null {
  const status = methodType.split('/').slice(-1)[0];
  if (status === 'pending')
    return httpRequestStatus.Pending;
  else if (status === 'fullfilled')
    return httpRequestStatus.Fullfilled;
  else if (status === 'rejected')
    return httpRequestStatus.Rejected;
  else if (status === 'settled')
    return httpRequestStatus.Settled;

  return null
}