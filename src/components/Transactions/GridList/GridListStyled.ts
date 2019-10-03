import { makeStyles } from '@material-ui/core';

export const useGridListStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    hover: {
      '&$hover:hover': {
        backgroundColor: '#49bb7b',
      },
    },
  },
}));
