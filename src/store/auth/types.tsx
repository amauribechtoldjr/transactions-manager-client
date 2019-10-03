export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const FAILED_LOAD_USER = 'FAILED_LOAD_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface setUserLoadingAction {
  type: typeof USER_LOADING;
  payload: {};
}

interface setUserLoadedAction {
  type: typeof USER_LOADED;
  payload: IUser;
}

interface setRegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    user: IUser;
    token: string | null;
  };
}

interface setAuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: {};
}

interface setLogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
  payload: {};
}

interface setRegisterFailAction {
  type: typeof REGISTER_FAIL;
  payload: {};
}

interface setFailedLoadUserAction {
  type: typeof FAILED_LOAD_USER;
  payload: {};
}

export type AuthActionTypes =
  | setUserLoadingAction
  | setUserLoadedAction
  | setRegisterSuccessAction
  | setAuthErrorAction
  | setLogoutSuccessAction
  | setRegisterFailAction
  | setFailedLoadUserAction;
