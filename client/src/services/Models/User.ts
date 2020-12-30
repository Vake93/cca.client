export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProfileApiResult {
  firstName?: string;
  lastName?: string;
  email?: string;
  errors?: string;
}
