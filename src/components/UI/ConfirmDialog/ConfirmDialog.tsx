import * as React from 'react';
import * as st from './ConfirmDialogStyled';
import { Dialog, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  let title = props.title;
  if (!title) title = t('confirmDialogTitleDefault');

  let cancelText = props.cancelText;
  if (!cancelText) cancelText = t('confirmDialogCancelText');

  let confirmText = props.confirmText;
  if (!confirmText) confirmText = t('confirmDialogConfirmText');

  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <st.TitleStyled>{title}</st.TitleStyled>
      <st.DialogContentStyled>{props.confirmMessage}</st.DialogContentStyled>
      <DialogActions>
        <st.CancelButtonStyled onClick={props.onCancel}>
          {cancelText}
        </st.CancelButtonStyled>
        <Button onClick={props.onConfirm}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.defaultProps = {
  title: '',
  cancelText: '',
  confirmText: '',
};

export default ConfirmDialog;
