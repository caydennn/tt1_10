import Transaction from "../models/transaction.js";
import mongoose from "mongoose";
import e from "express";

export const getTransactions = async (req, res) => {
  try {
    let q = req.query;
    // take all the queries except for sort
    // and put them in a filter object
    let { sort, ...filter } = req.query;

    if (sort) {
      if (sort === "asc") {
        sort = 1;
      } else if (sort === "desc") {
        sort = -1;
      } else {
        throw new Error("Invalid sort value");
      }
    } else {
      sort = -1;
    }

    // in filter, rename the sender_user_id to user_id
    // because that is the name of the field in the model
    filter.sender_user_id = filter.user_id;

    const transactions = await Transaction.find(filter).sort({ date: sort });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const transaction = await Transaction.findById(id);
      console.log(transaction)
      res.status(200).json(transaction);
    } else {
      res.status(400).json({ message: `Invalid transaction id ${id}` });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  // TODO: Add a check for balance
  const newTransaction = new Transaction({
    ...req.body,
    sender_user_id: req.user,
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting...");
  if (!id) {
    res.status(400).json({ message: `Invalid transaction id ${id}` });
  }

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const resp = await Transaction.findByIdAndRemove(id);
      console.log(resp);
      res.status(204).json(resp);
    } else {
      res.status(404).json({ message: `Transaction id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  console.log(req.body);

  try {
    if (!id) {
      res.status(400).json({ message: `Invalid transaction id ${id}` });
    } else if (!comment) {
      res.status(400).json({ message: `Invalid comment ${comment}` });
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      const transaction = await Transaction.findById(id);
      if (transaction) {
        transaction.comment = comment;
        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
      } else {
        res.status(404).json({ message: `Transaction id ${id} not found` });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
