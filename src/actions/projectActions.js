import axios from "axios";
import {
  GET_ERRORS,
  GET_WALLETS,
  DELETE_WALLET,
  GET_WALLET,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_TRANSACTION,
} from "./types";

export const createWallet = (newWallet, history) => async (dispath) => {
  await axios
    .post("/wallet", newWallet)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      dispath({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const updateWallet = (id, updatedWallet, history) => async (dispath) => {
  await axios
    .put(`/wallet/${id}`, updatedWallet)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      dispath({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const getWallets = () => async (dispath) => {
  await axios.get("/wallet").then((res) => {
    dispath({ type: GET_WALLETS, payload: res.data });
  });
};

export const getWallet = (id) => async (dispath) => {
  await axios.get(`/wallet/${id}`).then((res) => {
    dispath({ type: GET_WALLET, payload: res.data });
  });
};

export const deleteWallet = (id) => async (dispath) => {
  await axios.delete(`/wallet/${id}`).then((res) => {
    dispath({ type: DELETE_WALLET, payload: id });
  });
};

//Transactions

export const getTransactions = (walletid) => async (dispath) => {
  await axios.get(`/transaction/${walletid}`).then((res) => {
    dispath({ type: GET_TRANSACTIONS, payload: res.data });
  });
};

export const getTransaction = (walletId, id) => async (dispath) => {
  await axios.get(`/transaction/${walletId}/${id}`).then((res) => {
    dispath({ type: GET_TRANSACTION, payload: res.data });
  });
};

export const createTransaction = (newTransaction, history, walletId) => async (
  dispath
) => {
  await axios
    .post(`/transaction/${walletId}`, newTransaction)
    .then((res) => {
      history.push(`/transactions/${walletId}`);
    })
    .catch((err) => {
      console.log(err);
      dispath({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const updateTransaction = (
  walletId,
  id,
  updatedTransaction,
  history
) => async (dispath) => {
  await axios
    .put(`/transaction/${walletId}/${id}`, updatedTransaction)
    .then((res) => {
      history.push(`/transactions/${walletId}`);
    })
    .catch((err) => {
      dispath({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const deleteTransaction = (walletid, id) => async (dispath) => {
  await axios.delete(`/transaction/${walletid}/${id}`).then((res) => {
    dispath({ type: DELETE_TRANSACTION, payload: id });
  });
};
