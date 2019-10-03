import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import history from '../routes/history';

import combinedReducers from './reducers';

export type AsyncAction = ThunkAction<Promise<void>, {}, {}, AnyAction>;
export type AsyncActionDispatch = ThunkDispatch<{}, {}, AnyAction>;

const middleware = [thunk, routerMiddleware(history)];

const composedMiddlewares = composeWithDevTools({ trace: true });

const store = createStore(
  combinedReducers(history),
  composedMiddlewares(applyMiddleware(...middleware))
);

export default store;
