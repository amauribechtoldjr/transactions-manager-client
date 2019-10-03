import api from '../../helpers/api';
import { push } from 'connected-react-router';
import {
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  FAILED_LOAD_USER,
} from './types';

import { returnErrors } from '../error/actions';
import { AsyncAction, AsyncActionDispatch } from '../store';

export interface IConfigHeaders {
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
}

export const registerUser = (
  name: string,
  email: string,
  password: string
): AsyncAction => {
  return async (dispatch: AsyncActionDispatch): Promise<void> => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      });
      dispatch(push('/app'));
    } catch (error) {
      dispatch(
        returnErrors({
          message: error.response.data,
          status: error.response.status,
          id: REGISTER_FAIL,
        })
      );
      dispatch({ type: REGISTER_FAIL });
    }
  };
};

export const authUser = (email: string, password: string): AsyncAction => {
  return async (dispatch: AsyncActionDispatch): Promise<void> => {
    dispatch({ type: USER_LOADING });
    try {
      const response = await api.post('/auth/authenticate', {
        email,
        password,
      });
      dispatch({ type: USER_LOADED, payload: response.data });
      dispatch(push('/app'));
    } catch (e) {
      dispatch(returnErrors(e));
      dispatch({ type: AUTH_ERROR });
    }
  };
};

export const logout = (): AsyncAction => {
  return async (dispatch: AsyncActionDispatch): Promise<void> => {
    localStorage.removeItem('token');

    dispatch(push('/'));
    dispatch({ type: LOGOUT_SUCCESS });
  };
};

export const loadUserByToken = (): AsyncAction => {
  return async (dispatch: AsyncActionDispatch): Promise<void> => {
    dispatch({ type: USER_LOADING });
    try {
      const response = await api.get('/auth/getUser');
      dispatch({ type: USER_LOADED, payload: response.data });
    } catch (e) {
      dispatch(push('/'));
      dispatch({ type: FAILED_LOAD_USER });
    }
  };
};

export const getHeaders = (withToken: boolean = false): IConfigHeaders => {
  const config: IConfigHeaders = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (withToken) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
  }

  return config;
};
