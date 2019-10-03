export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export enum ErrorTypes {
  REGISTER_FAIL = 'REGISTER_FAIL',
}

export interface ErrorState {
  message: string;
  status: string;
  id?: string;
}

interface getErrorsAction {
  type: typeof GET_ERRORS;
  payload: ErrorState;
}

interface clearErrorsAction {
  type: typeof CLEAR_ERRORS;
}

export type ErrorActionTypes = getErrorsAction | clearErrorsAction;
