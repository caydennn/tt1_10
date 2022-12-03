import Transaction from "../models/transaction.js";
import Account from "../models/account.js";
import mongoose from "mongoose";
import e from "express";

export const getTransactions = async (req, res) => {
  console.log(`Getting all transactions`)
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
    res.status(500).json({ message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  const { id } = req.params;
  console.log(`Getting transaction with id: ${id}`)
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const transaction = await Transaction.findById(id);
      console.log(transaction)
      res.status(200).json(transaction);
    } else {
      res.status(400).json({ message: `Invalid transaction id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  console.log(`Creating transaction with ${req.body}`);
  try {
    const {account_id, receiving_account_id, date, amount, comment} = req.body
    // hopefully validations.transaction can check the date
    if (amount < 0) {
      res.status(400).json({message: "Amount must be a positive number"})
    }
    if (date < Date.now()) {
      res.status(400).json({message: "Transaction must be in the future"})
    }
    if (!mongoose.Types.ObjectId.isValid(account_id)) {
      res.status(400).json({message: `${account_id} is not a valid Account Id`})
    }
    if (!mongoose.Types.ObjectId.isValid(account_id)) {
      res.status(400).json({message: `${receiving_account_id} is not a valid Account Id`})
    }

    const account = await Account.findById(account_id)
    const receiving_account = await Account.findById(receiving_account_id)
    if (!account) {
      res.status(404).json({message: "Account not found"})
    }
    if (!receiving_account) {
      res.status(404).json({message: "Receiving account not found"})
    }
    if (account.balance < amount) {
      res.status(400).json({message: "Insufficient funds"})
    }

    const newTransaction = new Transaction({
      ...req.body,
      sender_user_id: req.user,
    });

    const savedTransaction = await newTransaction.save()
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  
  const { id } = req.params;
  console.log(`Deleting transaction ${id}...`)
    
  if (!id) {
    res.status(400).json({ message: `Invalid transaction id ${id}` });
  }

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const transaction = await Transaction.findById(id)
      if (!transaction) {
        res.status(404).json({ message: `Transaction id ${id} not found` });
      }

      if (transaction.date < Date.now()) {
        res.status(400).json({ message: `Cannot delete past transaction` });
      }
      
      const resp = await Transaction.findByIdAndRemove(id);
      console.log(resp);
      res.status(204).json(resp);
    } else {
      res.status(400).json({message: `${id} is not a valid transaction id`})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  console.log(`Updating transaction ${req.params.id} with body ${req.body}...`)
  const { id } = req.params;
  const { comment } = req.body;

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
