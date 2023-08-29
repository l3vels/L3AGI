export interface PaginationResult<T> {
  items: T[]
  page: number
  total: number
  limit: number
}
