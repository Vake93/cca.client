import {
  RegisterApiResult,
  RegisterData,
  RegisterResult,
} from "./Models/Register";
import { LoginData, LoginResult, LoginApiResult } from "./Models/Login";
import { ApiService } from "./ApiService";

const UserServiceUrl = process.env.REACT_APP_USER_SERVICE_URL;

export const UserService = {
  loginUser: async (e: LoginData): Promise<LoginResult> => {
    var loginApiResult = await ApiService.post<LoginApiResult>(
      `${UserServiceUrl}/api/users/login`,
      e
    );

    if (loginApiResult) {
      localStorage.setItem("TOKEN", loginApiResult.token ?? "");
      localStorage.setItem("REFRESH_TOKEN", loginApiResult.refreshToken ?? "");
      
      return {
        success: !loginApiResult.errors,
        errorMessage: loginApiResult.errors,
      };
    }

    return {
      success: false,
      errorMessage: "Something went wrong",
    };
  },

  registerUser: async (e: RegisterData): Promise<RegisterResult> => {
    var registerApiResult = await ApiService.post<RegisterApiResult>(
      `${UserServiceUrl}/api/users/register`,
      e
    );

    if (registerApiResult) {
      return {
        success: !registerApiResult.errors,
        errorMessage: registerApiResult.errors,
      };
    }

    return {
      success: false,
      errorMessage: "Something went wrong",
    };
  },
};
