export interface PaginatedData<T> {
    pageNumber: number | null;
    pageSize: number | null;
    totalPages: number | null;
    countOfAllItems: number;
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    items: T[];
}
