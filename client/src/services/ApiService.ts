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
  post: async <T>(
    endPoint: string,
    data: object,
    queryParams: object | undefined = undefined
  ): Promise<T | undefined> => {
    const url = createUrl(endPoint, queryParams);
    try {
      return (await axios.post(url, data)).data;
    } catch (error) {
      const axiosError = error as AxiosError<T>;
      return axiosError?.response?.data;
    }
  },
};
