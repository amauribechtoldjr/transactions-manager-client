import { makeStyles, styled } from '@material-ui/core/styles';

import clsx from 'clsx';

export const ContainerSignInSignUp = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  margin: '10px',
  backgroundColor: '#e6e6e6',
}));

export const ErrorContainer = styled('span')(() => ({
  marginTop: '8px',
  fontWeight: 300,
  fontSize: '13px',
  color: 'red',
  paddingLeft: '10px',
}));

const useStyles = makeStyles(theme => ({
  signInSignOutButtons: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  selectedButton: {
    border: '1px double',
  },
}));

export function getButtonStyle(isSelected: boolean, classes: any) {
  let payload = clsx(classes.signInSignOutButtons);

  if (isSelected) {
    payload = clsx(classes.signInSignOutButtons, classes.selectedButton);
  }
  return payload;
}

export default useStyles;
