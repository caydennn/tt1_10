import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function NewTransaction() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Schedule New Transaction
      </Button>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Schedule a New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Receiving Account ID"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Transaction Amount"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Schedule</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
