import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { InputLabel } from '@material-ui/core';

const useDialogStyles = makeStyles(theme => ({
  inputLabel: {
    marginBottom: '8px',
    marginTop: '8px',
  },
  transactionItems: {
    textAlign: 'center',
    margin: '2px 6px',
  },
  dialogContent: {
    maxWidth: '30vw',
  },
  actionButtons: {
    fontSize: '12px',
  },
}));

export const InputLabelStyled = styled(InputLabel)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export default useDialogStyles;
