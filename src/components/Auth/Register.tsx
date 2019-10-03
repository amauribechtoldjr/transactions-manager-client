import * as React from 'react';

import SignIn from './SignIn/SignIn';
import SignUp from './SingUp/SignUp';

import { Container, Grid, Button } from '@material-ui/core';

import { CombinedReducersState } from '../../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorState } from '../../store/error/types';

import useStyles, {
  getButtonStyle,
  ContainerSignInSignUp,
  ErrorContainer,
} from './RegisterStyled';
import { clearErrors } from '../../store/error/actions';

const Register: React.FC = ({ ...props }) => {
  const [isSignIn, setSignIn] = React.useState(true);
  const error: ErrorState = useSelector(
    state => (state as CombinedReducersState).error
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(clearErrors());
  }, [isSignIn, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <ContainerSignInSignUp>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              className={getButtonStyle(!isSignIn, classes)}
              onClick={() => setSignIn(false)}
            >
              Registrar
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disableTouchRipple
              className={getButtonStyle(isSignIn, classes)}
              onClick={() => setSignIn(true)}
            >
              Conectar
            </Button>
          </Grid>
          {error.message && (
            <Grid item xs={12}>
              <ErrorContainer>{error.message}</ErrorContainer>
            </Grid>
          )}
          <Grid item xs={12}>
            {isSignIn ? <SignIn {...props} /> : <SignUp {...props} />}
          </Grid>
        </Grid>
      </ContainerSignInSignUp>
    </Container>
  );
};

export default Register;
