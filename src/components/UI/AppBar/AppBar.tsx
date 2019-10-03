import * as React from 'react';
import useAppBarStyles from './AppBarStyled';
import { AppBar, Toolbar, Link, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/actions';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const AppBarComponent: React.FC = () => {
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const classes = useAppBarStyles();

  const doLogout = () => {
    dispatch(logout());
  };

  const _handleClose = () => {
    setConfirmDialogOpen(false);
  };

  const _handleOpen = () => {
    setConfirmDialogOpen(true);
  };

  return (
    <div>
      <ConfirmDialog
        confirmMessage={'Tem certeza que deseja sair?'}
        open={confirmDialogOpen}
        onCancel={_handleClose}
        onConfirm={doLogout}
      />
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
          >
            {'Transactions Manager'}
          </Link>
          <div className={classes.right}>
            <Button color="inherit" onClick={_handleOpen}>
              {'Logout'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
};

export default AppBarComponent;
