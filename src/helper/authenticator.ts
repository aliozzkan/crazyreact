import { store } from "store";
import * as storageManager from "./storage-manager";
import {
  clearAuth,
  setAuth,
  setAuthWithProject,
  setProject,
} from "store/auth/actions";
import {clearAllData} from 'store/fetch/actions'
import { api, __mode__ } from "../consts";

const __dev__ = process.env.NODE_ENV === "development";

export const Authenticator = {
  Login: (token: string, user: any, decoded: any = null) => {
    storageManager.setUserAndToken(token, { ...user, apiType: __mode__ });
    store.dispatch(
      setAuth({ decoded, jwt: token, user: { ...user, apiType: __mode__ } })
    );
  },
  SetProject: (token: any, user: any, project: any) => {
    storageManager.setAuth(token, user, project);
    store.dispatch(setProject(project));
  },
  LoginWithProject: (
    token: any,
    user: any,
    project: any,
    decoded: any = null
  ) => {
    storageManager.setAuth(token, user, project);
    store.dispatch(setAuthWithProject({ decoded, jwt: token, project, user }));
  },
  Logout: () => {
    storageManager.clearToken();
    store.dispatch(clearAuth());
    store.dispatch(clearAllData());
  },
  Compose: () => {
    if (__dev__) console.log("Authenticator Compose");

    const data = storageManager.getAuthInfo();
    if (!data) return Authenticator.Logout();

    if (!!!data.token || !!!data.user) return Authenticator.Logout();

    if (data.user.apiType != __mode__) return Authenticator.Logout();

    if (!!data.project) {
      return store.dispatch(
        setAuthWithProject({
          decoded: null,
          jwt: data.token,
          project: data.project,
          user: data.user,
        })
      );
    }

    return store.dispatch(
      setAuth({ decoded: null, jwt: data.token, user: data.user })
    );
  },
  GetAuthInfo: () => {
    return {
      isLoggedIn: store.getState().auth.isLoggedIn,
      user: store.getState().auth.user,
      project: store.getState().auth.project,
      token: store.getState().auth.jwt,
    };
  },
};
