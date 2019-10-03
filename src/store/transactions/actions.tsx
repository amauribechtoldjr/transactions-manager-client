import api from '../../helpers/api';
import {
  GET_TRANSACTIONS,
  ITransaction,
  TransactionsActionTypes,
  ADD_TRANSACTION,
  LOADING_TRANSACTIONS,
  LOAD_TRANSACTIONS_FAILURE,
} from './types';

import { AsyncAction, AsyncActionDispatch } from '../store';
import { returnErrors } from '../error/actions';

export const getTransactions = (userId: string): AsyncAction => {
  return async (dispatch: AsyncActionDispatch): Promise<void> => {
    dispatch(setLoadingTransactions());

    try {
      const response = await api.get(
        `/transactions/findByUser?userId=${userId}`
      );

      if (response.status === 200) {
        dispatch({
          type: GET_TRANSACTIONS,
          payload: response.data.transactions,
        });
      }
    } catch (error) {
      dispatch(returnErrors(error));
      dispatch({ type: LOAD_TRANSACTIONS_FAILURE });
    }
  };
};

export const addTransaction = (transaction: ITransaction): AsyncAction => {
  return async (dispatch: AsyncActionDispatch): Promise<void> => {
    try {
      const response = await api.post('/transactions/register', transaction);
      dispatch({
        type: ADD_TRANSACTION,
        payload: response.data.transaction,
      });
    } catch (error) {
      dispatch(returnErrors(error));
    }
  };
};

export function setLoadingTransactions(): TransactionsActionTypes {
  return { type: LOADING_TRANSACTIONS };
}
