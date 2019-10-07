import * as React from 'react';
import * as st from './TransactionsStyled';

import { useSelector, useDispatch } from 'react-redux';
import { CombinedReducersState } from '../../store/reducers';
import { getTransactions } from '../../store/transactions/actions';
import {
  ITransaction,
  TransactionsState,
} from '../../store/transactions/types';
import { IUser, AuthState } from '../../store/auth/types';
import { Grid, Typography } from '@material-ui/core';

import GridList from './GridList/GridList';
import AppBar from '../UI/AppBar/AppBar';
import Dialog from './Dialog/Dialog';
import { numberWithCommas } from '../../helpers/numbers';
import { useTranslation } from 'react-i18next';

const Transactions: React.FC = () => {
  const transactions: TransactionsState = useSelector(
    state => (state as CombinedReducersState).transactions
  );
  const auth: AuthState = useSelector(
    state => (state as CombinedReducersState).auth
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(getTransactions((auth.user as IUser)._id));
  }, [auth.user, dispatch]);

  const getTotalValue = (transactions: ITransaction[]): number => {
    let totalValue: number = 0;

    transactions.forEach(transaction => {
      totalValue += transaction.value;
    });

    return totalValue;
  };

  return (
    <React.Fragment>
      <AppBar />
      <Grid container justify="center">
        <Grid item xs={8}>
          <st.ActionsGridContainer
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={6} sm={3}>
              <Dialog />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h5">
                {`${t('totalLabel')} ${t('currency')} ${numberWithCommas(
                  getTotalValue(transactions.transactions)
                )}`}
              </Typography>
            </Grid>
          </st.ActionsGridContainer>
        </Grid>
        <Grid item xs={8}>
          <GridList data={transactions.transactions} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Transactions;
