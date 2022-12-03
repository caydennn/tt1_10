import Transaction from "../models/transaction.js";
import mongoose from 'mongoose'

export const getTransactions = async (req, res) => {
  try {
    let q = req.query;
    // take all the queries except for sort
    // and put them in a filter object
    const { sort, ...filter } = req.query;
    //
    // // if sort is not empty

    console.log(filter);
    console.log(sort);
    const transactions = await Transaction.find(filter).sort(sort);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const createTransaction = async (req, res) => {
    // Add a check for balance
    const newTransaction = new Transaction({...req.body, sender_user_id: req.user})

    try {
        const savedTransaction = await newTransaction.save()
        res.status(201).json(savedTransaction)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params
    } catch (error) {
        res.status(400).json({ message: `Invalid transaction id ${id}` })
    }
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            await Transaction.findByIdAndRemove(id)
            res.status(204)
        } else {
            res.status(404).json({ message: `Transaction id ${id} not found` })
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTransaction = async(req, res) => {
    try {
        const { id } = req.params
        const { comment } = req.body
    }
    catch (error) {
        res.status(400).json({ message: `Invalid transaction id ${id}` })
    }
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const transaction = await Transaction.findById(blogId)
            if (transaction) {
                transaction.comment = comment
                const updatedTransaction = await transaction.save()
                res.status(200).json(updatedTransaction)
            } else {
                res.status(404).json({ message: `Transaction id ${id} not found` })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
