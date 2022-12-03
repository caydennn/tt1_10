import Transaction from "../models/transaction.js";

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
