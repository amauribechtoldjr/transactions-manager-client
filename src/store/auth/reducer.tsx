import {
  AuthState,
  AuthActionTypes,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  IUser,
  FAILED_LOAD_USER,
} from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: localStorage.getItem('token'),
};

export default function AuthReducerType(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
    case REGISTER_SUCCESS:
      const { token, user } = action.payload as { token: string; user: IUser };

      localStorage.setItem('token', token);
      return {
        ...state,
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case FAILED_LOAD_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
