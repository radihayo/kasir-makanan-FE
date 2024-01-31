import { defineStore } from 'pinia'
import axios from "axios"

export const useTransactionStore = defineStore('transaction', () => {
    const getDataAllTransaction = async () => {
        try {
            const response = await axios.get('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/transactions/show');
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const transactionDataStore = async (dataTransaction) => {
        try {
            const response = await axios.post('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/transactions/store',dataTransaction);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    return{
        getDataAllTransaction,
        transactionDataStore
    }
});