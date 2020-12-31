export interface CreatedApiResponse {
  id?: string;
  errors?: string;
}

export interface ListApiResponse<T> {
  items?: T[];
  count?: number;
  errors?: string;
}
