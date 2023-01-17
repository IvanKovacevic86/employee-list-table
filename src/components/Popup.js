import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ActionButtons from "./ActionButtons";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup, resetForm } = props;

  const dialogWrapper = {
    padding: "16px",
    position: "absolute",
    top: "40px",
  };

  return (
    <div>
      <Dialog open={openPopup} maxWidth="md" sx={dialogWrapper}>
        <DialogTitle>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <ActionButtons
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <CloseIcon color="error" />
            </ActionButtons>
          </Box>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
