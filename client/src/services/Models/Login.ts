export interface LoginData{
  email: string;
  password: string;
  rememberPassword: boolean;
}

export interface LoginResult {
  success: boolean;
  errorMessage?: string;
}

export interface LoginApiResult {
  token?: string;
  refreshToken?: string;
  errors?: string;
}
