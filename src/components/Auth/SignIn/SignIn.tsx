import * as React from 'react';

import { TextField, Button, Grid } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import useStyles from './SignInStyled';
import {
  IFormField,
  validateForm,
  getFieldValue,
  handleFieldChange,
  getFieldError,
  ValidateFormResult,
} from '../../../helpers/forms';
import { authUser } from '../../../store/auth/actions';
import { getFieldsSignIn } from './SignInHelper';

const SignIn: React.FC<any> = () => {
  const [fields, setFields] = React.useState<IFormField[]>(getFieldsSignIn());

  const classes = useStyles();
  const dispatch = useDispatch();

  const _handleAuthClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let validateResult: ValidateFormResult = validateForm(fields);

    if (!validateResult.validationSuccess) {
      setFields(validateResult.fields);
      return;
    }

    dispatch(
      authUser(
        getFieldValue('email', fields),
        getFieldValue('password', fields)
      )
    );
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            error={getFieldError('email', fields) !== ''}
            helperText={getFieldError('email', fields)}
            label="Email"
            value={getFieldValue('email', fields)}
            onChange={event =>
              setFields(handleFieldChange(event.target.value, 'email', fields))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Senha"
            error={getFieldError('password', fields) !== ''}
            helperText={getFieldError('password', fields)}
            type="password"
            autoComplete="current-password"
            value={getFieldValue('password', fields)}
            onChange={event =>
              setFields(
                handleFieldChange(event.target.value, 'password', fields)
              )
            }
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={_handleAuthClick}
      >
        Conectar
      </Button>
    </form>
  );
};

export default React.memo(SignIn);
