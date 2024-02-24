export interface PaginatedData<T> {
    pageNumber: number | null;
    pageSize: number | null;
    totalPages: number | null;
    numberOfTotalItems: number;
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    items: T[];
}
