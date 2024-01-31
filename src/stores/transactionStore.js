import { defineStore } from "pinia";
import axios from "axios";

export const useTransactionStore = defineStore("transaction", () => {
  const getDataAllTransaction = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/transactions/show"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const transactionDataStore = async (dataTransaction) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/transactions/store",
        dataTransaction
      );
      return response.status;
      //   console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getDataAllTransaction,
    transactionDataStore,
  };
});
