import axios, { AxiosError } from "axios";
import queryString from "query-string";

const createUrl = (
  endPoint: string,
  queryParams: object | undefined = undefined
): string => {
  let params = "";

  if (queryParams) {
    const queries = { ...queryParams };
    params += `?${queryString.stringify(queries)}`;
  }

  return endPoint + params;
};

export const ApiService = {
  get: async <T>(
    endPoint: string,
    queryParams: object | undefined = undefined,
    authToken: string | undefined = undefined
  ): Promise<T | undefined> => {
    const config = authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      : undefined;
    const url = createUrl(endPoint, queryParams);
    try {
      return (await axios.get(url, config)).data;
    } catch (error) {
      const axiosError = error as AxiosError<T>;
      return axiosError?.response?.data;
    }
  },

  post: async <T>(
    endPoint: string,
    data: object,
    queryParams: object | undefined = undefined,
    authToken: string | undefined = undefined
  ): Promise<T | undefined> => {
    const url = createUrl(endPoint, queryParams);
    const config = authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      : undefined;
    try {
      return (await axios.post(url, data, config)).data;
    } catch (error) {
      const axiosError = error as AxiosError<T>;
      return axiosError?.response?.data;
    }
  },

  delete: async (
    endPoint: string,
    authToken: string | undefined = undefined
  ): Promise<boolean> => {
    const url = createUrl(endPoint, {});
    const config = authToken
      ? {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      : undefined;
    try {
      await axios.delete(url, config);
      return true;
    } catch (error) {
      return false;
    }
  },
};
