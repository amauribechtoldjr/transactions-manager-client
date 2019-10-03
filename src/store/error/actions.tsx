import {
  CLEAR_ERRORS,
  GET_ERRORS,
  ErrorState,
  ErrorActionTypes,
} from './types';

const normalizeErrors = (e: any): ErrorState => {
  const payload: ErrorState = {
    message: '',
    status: '',
    id: '',
  };

  if (e.message === 'Network Error') {
    payload.message = 'Não foi possível conectar-se ao servidor';
    return payload;
  }

  if (e.response) {
    if (e.response.data.error === 'Authentication failed') {
      payload.message = 'Dados incorretos';
    } else {
      payload.message = e.response.data.error;
    }
    payload.status = e.response.status;

    return payload;
  }

  return payload;
};

export function returnErrors(error: any): ErrorActionTypes {
  const payload = normalizeErrors(error);

  return {
    type: GET_ERRORS,
    payload,
  };
}

export function clearErrors(): ErrorActionTypes {
  return {
    type: CLEAR_ERRORS,
  };
}
