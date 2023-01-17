import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";
import Button from "./Button";

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          text="No"
          color="grey"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Button text="Yes" color="success" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  );
}
