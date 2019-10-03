import * as React from 'react';
import * as st from './ConfirmDialogStyled';
import { Dialog, DialogActions, Button } from '@material-ui/core';

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  confirmMessage: string;
  title?: string;
  cancelText?: string;
  confirmText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <st.TitleStyled>{props.title}</st.TitleStyled>
      <st.DialogContentStyled>{props.confirmMessage}</st.DialogContentStyled>
      <DialogActions>
        <st.CancelButtonStyled onClick={props.onCancel}>
          {props.cancelText}
        </st.CancelButtonStyled>
        <Button onClick={props.onConfirm}>{props.confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.defaultProps = {
  title: 'Confirmação',
  cancelText: 'Não',
  confirmText: 'Sim',
};

export default ConfirmDialog;
