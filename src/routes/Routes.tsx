import * as React from 'react';

import Transactions from '../components/Transactions/Transactions';
import Register from '../components/Auth/Register';
import PrivateRoutes from './PrivateRoutes';

import { ConnectedRouter } from 'connected-react-router';

import history from './history';

import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Register} />
        <PrivateRoutes>
          <Route path="/app" component={Transactions} />
        </PrivateRoutes>
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;
