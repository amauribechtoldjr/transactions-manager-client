import {
  ADD_TRANSACTION,
  LOADING_TRANSACTIONS,
  GET_TRANSACTIONS,
  TransactionsActionTypes,
  TransactionsState,
  LOAD_TRANSACTIONS_FAILURE,
} from './types';

const initialState: TransactionsState = {
  transactions: [],
  isLoading: false,
};

export default function transactionsReducer(
  state = initialState,
  action: TransactionsActionTypes
): TransactionsState {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case LOADING_TRANSACTIONS:
      return { ...state, isLoading: true };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
      };
    case LOAD_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
