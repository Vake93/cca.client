export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResult {
  success: boolean;
  errorMessage?: string;
}

export interface RegisterApiResult {
  errors?: string;
}
