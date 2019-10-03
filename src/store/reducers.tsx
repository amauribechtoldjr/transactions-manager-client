import { combineReducers } from 'redux';

import transactionsReducer from './transactions/reducer';
import authReducer from './auth/reducer';
import errorReducer from './error/reducer';

import { TransactionsState } from './transactions/types';
import { AuthState } from './auth/types';
import { ErrorState } from './error/types';
import { connectRouter } from 'connected-react-router';

export interface CombinedReducersState {
  transactions: TransactionsState;
  auth: AuthState;
  error: ErrorState;
}

export interface ActionType {
  payload: {};
  type: string;
}

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    transactions: transactionsReducer,
    auth: authReducer,
    error: errorReducer,
  });
