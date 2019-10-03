export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const LOADING_TRANSACTIONS = 'LOADING_TRANSACTIONS';
export const LOAD_TRANSACTIONS_FAILURE = 'GET_TRANSACTIONS_FAILURE';

export enum ETransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export interface ITransaction {
  _id?: string;
  value: number;
  description: string;
  type: string;
  userId: string;
  createdAt?: string;
}

export interface ISortTransactions {
  field: string;
  sortType: string;
}

export interface TransactionsState {
  transactions: ITransaction[];
  sort?: ISortTransactions;
  isLoading: boolean;
}

interface getTransactionsAction {
  type: typeof GET_TRANSACTIONS;
  payload: ITransaction[];
}

interface addTransactionAction {
  type: typeof ADD_TRANSACTION;
  payload: ITransaction;
}

interface setLoadingTransactionsAction {
  type: typeof LOADING_TRANSACTIONS;
}

interface setLoadTransactionsFailureAction {
  type: typeof LOAD_TRANSACTIONS_FAILURE;
}

export type TransactionsActionTypes =
  | getTransactionsAction
  | addTransactionAction
  | setLoadingTransactionsAction
  | setLoadTransactionsFailureAction;
