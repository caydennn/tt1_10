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

import data from "../../sample-data/ScheduledTransactions.json";

export default function NewTransaction() {
  const [open, setOpen] = useState(false);
  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);

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
            margin="dense"
            id="receiving_account_id"
            label="Receiving Account ID"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="transaction_amount"
            label="Transaction Amount"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <TextField
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="date_of_transaction"
            // label="Date of Transaction"
            helperText="Date of Transaction"
            type="datetime-local"
            fullWidth
            variant="outlined"
            onFocus={onFocus}
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
