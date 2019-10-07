import * as React from 'react';

import { TextField, Button, Grid } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../../store/auth/actions';

import useStyles from './SingUpStyled';
import {
  getFieldsSignUp,
  FIRSTNAME,
  LASTNAME,
  EMAIL,
  PASSWORD,
} from './SignUpHelper';
import {
  IFormField,
  getFieldError,
  getFieldValue,
  handleFieldChange,
  ValidateFormResult,
  validateForm,
} from '../../../helpers/forms';
import { useTranslation } from 'react-i18next';

const SignUp: React.FC<any> = ({ ...props }) => {
  const [fields, setFields] = React.useState<IFormField[]>(getFieldsSignUp());
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const _handleAuthClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let validateResult: ValidateFormResult = validateForm(fields);

    if (!validateResult.validationSuccess) {
      setFields(validateResult.fields);
      return;
    }

    const firstName = getFieldValue(FIRSTNAME, fields);
    const lastName = getFieldValue(LASTNAME, fields);
    const email = getFieldValue(EMAIL, fields);
    const password = getFieldValue(PASSWORD, fields);

    dispatch(registerUser(firstName + lastName, email, password));
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            variant="outlined"
            required
            fullWidth
            label={t('firstName')}
            autoFocus
            error={getFieldError(FIRSTNAME, fields) !== ''}
            helperText={getFieldError(FIRSTNAME, fields)}
            value={getFieldValue(FIRSTNAME, fields)}
            onChange={event =>
              setFields(
                handleFieldChange(event.target.value, FIRSTNAME, fields)
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label={t('lastName')}
            autoComplete="lname"
            error={getFieldError(LASTNAME, fields) !== ''}
            helperText={getFieldError(LASTNAME, fields)}
            value={getFieldValue(LASTNAME, fields)}
            onChange={event =>
              setFields(handleFieldChange(event.target.value, LASTNAME, fields))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label={t('email')}
            error={getFieldError(EMAIL, fields) !== ''}
            helperText={getFieldError(EMAIL, fields)}
            value={getFieldValue(EMAIL, fields)}
            onChange={event =>
              setFields(handleFieldChange(event.target.value, EMAIL, fields))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label={t('password')}
            type="password"
            autoComplete="current-password"
            error={getFieldError(PASSWORD, fields) !== ''}
            helperText={getFieldError(PASSWORD, fields)}
            value={getFieldValue(PASSWORD, fields)}
            onChange={event =>
              setFields(handleFieldChange(event.target.value, PASSWORD, fields))
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
        {t('signUpButton')}
      </Button>
    </form>
  );
};

export default React.memo(SignUp);
