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
import moment from "../../../node_modules/moment/moment";
import axios from "axios";

export default function NewTransaction() {
  const [open, setOpen] = useState(false);
  const [receivingID, setReceivingID] = useState("");
  const [txnAmt, setTxnAmt] = useState("");
  const [comment, setComment] = useState("");
  const [dateTxn, setDateTxn] = useState(moment().format("YYYY-MM-DDTHH:mm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetAllFields = () => {
    setReceivingID("");
    setComment("");
    setTxnAmt("");
    setDateTxn(moment().format("YYYY-MM-DDTHH:mm"));
  };

  const handleSubmit = () => {
    setOpen(false);
    const requestBody = {
      account_id: "123",
      receiving_account_id: receivingID,
      amount: txnAmt,
      comment: comment,
      date: dateTxn,
    };
    console.log(requestBody);

    var config = {
      withCredentials: true,
      method: "post",
      url: "http://localhost:8800/api/transactions",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    axios(config).then(function (response) {
      console.log("response", response);
    });

    resetAllFields();
  };

  const onChangeReceivingID = (e) => {
    setReceivingID(e.target.value);
  };

  const onChangeTxnAmt = (e) => {
    setTxnAmt(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onChangeDate = (e) => {
    setDateTxn(e.target.value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
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
            onChange={onChangeReceivingID}
            value={receivingID}
          />
          <TextField
            margin="dense"
            id="transaction_amount"
            label="Transaction Amount"
            type="number"
            fullWidth
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={onChangeTxnAmt}
            value={txnAmt}
          />
          <TextField
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChangeComment}
            value={comment}
          />
          <TextField
            margin="dense"
            id="date_of_transaction"
            helperText="Date of Transaction"
            type="datetime-local"
            fullWidth
            variant="outlined"
            onChange={onChangeDate}
            value={dateTxn}
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
