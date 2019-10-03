import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { RouteProps } from 'react-router-dom';
import { CombinedReducersState } from '../store/reducers';
import { AuthState } from '../store/auth/types';
import { loadUserByToken } from '../store/auth/actions';

const PrivateRoutes: React.FC<RouteProps> = ({ component, ...rest }: any) => {
  const auth: AuthState = useSelector(
    state => (state as CombinedReducersState).auth
  );
  const dispatch = useDispatch();

  const verifyConnectivity = React.useCallback(() => {
    if (!auth.isAuthenticated || !auth.user) {
      dispatch(loadUserByToken());
    }
  }, [dispatch, auth]);

  React.useEffect(() => {
    verifyConnectivity();
  }, [verifyConnectivity]);

  if (!auth.user || !auth.isAuthenticated)
    return <React.Fragment></React.Fragment>;

  return <React.Fragment>{rest.children}</React.Fragment>;
};

export default PrivateRoutes;
