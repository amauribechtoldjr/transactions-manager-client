import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ErrorState,
  ErrorActionTypes,
} from './types';

const initialState: ErrorState = {
  message: '',
  status: '',
  id: '',
};

export default function transactionsReducer(
  state = initialState,
  action: ErrorActionTypes
): ErrorState {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return { message: '', status: '', id: '' };
    default:
      return state;
  }
}
