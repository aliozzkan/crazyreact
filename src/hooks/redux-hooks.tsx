import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "store";
import { Project } from "services/swagger";
import { UserRoles } from "models/user";

export function useRedux(): [Store, Dispatch<any>] {
  const reduxStore = useSelector<Store, Store>((store) => store);
  const dispatch = useDispatch();
  return [reduxStore, dispatch];
}

export function useAuth() {
  const [state] = useRedux();
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user as any,
    project: state.auth.project as Project,
    token: state.auth.jwt,
    role: state?.auth?.user?.userRoleID || (0 as UserRoles),
  };
}

export function useApp() {
  const [state] = useRedux();
  return {
    appName: state.app.appName,
  };
}
