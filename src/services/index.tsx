import { Project, AuthApiFactory, InventoryApiFactory } from "./swagger/api";
import { useFetchManager, useFetchManagerStore } from "hooks/fetch-manager";
import axios, { AxiosError, AxiosInstance } from "axios";
import { store } from "store";
import { __mode__, api } from "consts";

const BASE_URL = "https://siemensapi.tesisyonetim.pro";
const TEST_URL = "https://siemensapitest.tesisyonetim.pro";
const APL_URL = "https://tysapi.tesisyonetim.pro/";
const API_URL =
  __mode__ === api.test ? TEST_URL : __mode__ === api.apl ? APL_URL : BASE_URL;

const axiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create();
  // Add a request interceptor
  axiosInstance.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      config.headers.Authorization = "Bearer " + store.getState().auth.jwt;
      resolve(config);
    });
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      console.log("Interceptors Error", error);
      if ([401, 403].includes(error.response?.status!)) {
        // Invalid Token
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const founds = [undefined, API_URL, axiosInstance()] as const;

const API = {
  Auth: AuthApiFactory(...founds),
  Inventory: InventoryApiFactory(...founds),
  Custom: {
    login: async (userName: string, password: string) => {
      return axios.post("https://jsonplaceholder.typicode.com/posts", {userName, password});
    }
  }
};

export const Hooks = {
  Login: () =>
    useFetchManager<typeof API.Custom.login>(API.Custom.login),
};
