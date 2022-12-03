import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    //   transaction_id: {
    //     type: String,
    //     required: true,
    //   },
    account_id: {
      type: String,
      required: true,
    },
    sender_user_id: {
      type: String,
      required: true,
    },
    receiving_account_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
