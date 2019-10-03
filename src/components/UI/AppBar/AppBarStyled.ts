import { makeStyles } from '@material-ui/core/styles';

const useAppBarStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  placeholder: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default useAppBarStyles;
