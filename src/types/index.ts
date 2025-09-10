export interface ApiResponse<T> {
  data: T;
}

export interface Pagination {
  totalCars: number;
  page: number; //parse to number from response!
  totalPages: number;
  limit: number;
}
