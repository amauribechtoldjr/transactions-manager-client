import * as React from 'react';
import * as st from './DialogStyled';

import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {
  getFieldError,
  getFieldValue,
  ValidateFormResult,
  validateForm,
  IFormField,
  handleFieldChange,
  clearFields,
} from '../../../helpers/forms';
import { DESCRIPTION, VALUE, TYPE, getTransactionFields } from './DialogHelper';
import { AuthState, IUser } from '../../../store/auth/types';
import { CombinedReducersState } from '../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../../store/transactions/actions';
import { ETransactionType } from '../../../store/transactions/types';
import NumberFormatInput from '../../UI/NumberFormatInput/NumberFormatInput';
import useDialogStyles from './DialogStyled';
import { useTranslation } from 'react-i18next';

const TransactionDialog: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [fields, setFields] = React.useState<IFormField[]>(
    getTransactionFields()
  );
  const auth: AuthState = useSelector(
    state => (state as CombinedReducersState).auth
  );
  const dispatch = useDispatch();
  const classes = useDialogStyles();
  const { t } = useTranslation();

  const _handleClose = () => {
    setFields(clearFields(fields));
    setDialogOpen(false);
  };

  const _handleOpen = () => {
    setDialogOpen(true);
  };

  const _handleAuthClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    isAddNew: boolean = false
  ) => {
    event.preventDefault();

    let validateResult: ValidateFormResult = validateForm(fields);

    if (!validateResult.validationSuccess) {
      setFields(validateResult.fields);
      return;
    }

    dispatch(
      addTransaction({
        description: getFieldValue(DESCRIPTION, fields),
        value: Number(getFieldValue(VALUE, fields).replace(/,/g, '')),
        type: getFieldValue(TYPE, fields),
        userId: (auth.user as IUser)._id,
      })
    );
    cleanDialog();

    if (!isAddNew) {
      setDialogOpen(false);
    }
  };

  const cleanDialog = () => {
    setFields(clearFields(fields));
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={_handleOpen}>
        {t('newTransaction')}
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={_handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Adicionar nova transação</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                label="Descrição"
                autoFocus
                error={getFieldError(DESCRIPTION, fields) !== ''}
                helperText={t(getFieldError(DESCRIPTION, fields))}
                value={getFieldValue(DESCRIPTION, fields)}
                onChange={event =>
                  setFields(
                    handleFieldChange(event.target.value, DESCRIPTION, fields)
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                label="R$"
                InputProps={{
                  inputComponent: NumberFormatInput,
                }}
                fullWidth
                autoComplete="lname"
                error={getFieldError(VALUE, fields) !== ''}
                helperText={t(getFieldError(VALUE, fields))}
                value={getFieldValue(VALUE, fields)}
                onChange={event => {
                  setFields(
                    handleFieldChange(event.target.value, VALUE, fields)
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <st.InputLabelStyled>Tipo de transação</st.InputLabelStyled>
              <Select
                fullWidth
                value={getFieldValue(TYPE, fields)}
                onChange={event =>
                  setFields(handleFieldChange(event.target.value, TYPE, fields))
                }
              >
                <MenuItem
                  value={ETransactionType.CREDIT}
                  className={classes.transactionItems}
                >
                  Crédito
                </MenuItem>
                <MenuItem
                  value={ETransactionType.DEBIT}
                  className={classes.transactionItems}
                >
                  Débito
                </MenuItem>
              </Select>
              {getFieldError(TYPE, fields) !== '' && (
                <FormHelperText style={{ color: 'red', marginLeft: '10px' }}>
                  {t(getFieldError(TYPE, fields))}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={_handleClose} className={classes.actionButtons}>
            Fechar
          </Button>
          <Button onClick={_handleAuthClick} className={classes.actionButtons}>
            Salvar
          </Button>
          <Button
            onClick={event => _handleAuthClick(event, true)}
            className={classes.actionButtons}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TransactionDialog;
