import { defineStore } from 'pinia'
import axios from "axios"

export const UseAppStore = defineStore('AppStore', () => {
    // food store
    const getDataAllFood = async () => {
        try {
            const response = await axios.get('/products/show');
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const getDataDetailFood = async (idDataFood) => {
        try {
            const response = await axios.get('/products/show/'+idDataFood);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    // employee store
    const getDataAllEmployee = async () => {
        try {
            const response = await axios.get('/employees/show');
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const getDataDetailEmployee = async (idData) => {
        try {
            const response = await axios.get('/employees/show/'+idData);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    // transaction store
    const getDataAllTransaction = async () => {
        try {
            const response = await axios.get('/transactions/show');
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const storeDataTransaction = async (dataTransaction) => {
        try {
            const response = await axios.post('/transactions/store',dataTransaction);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    return{
        getDataAllFood,
        getDataDetailFood,
        getDataAllEmployee,
        getDataDetailEmployee,
        getDataAllTransaction,
        storeDataTransaction
    };
});


// import { defineStore } from 'pinia'
// import axios from "axios"

// export const UseAppStore = defineStore('AppStore', () => {
//     // food store
//     const getDataAllFood = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/products/show');
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const getDataDetailFood = async (idDataFood) => {
//         try {
//             const response = await axios.get('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/products/show/'+idDataFood);
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // employee store
//     const getDataAllEmployee = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/employees/show');
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const getDataDetailEmployee = async (idData) => {
//         try {
//             const response = await axios.get('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/employees/show/'+idData);
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // transaction store
//     const getDataAllTransaction = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/transactions/show');
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const storeDataTransaction = async (dataTransaction) => {
//         try {
//             const response = await axios.post('http://127.0.0.1/kasir-makanan/kasir-makanan-BE/public/api/transactions/store',dataTransaction);
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return{
//         getDataAllFood,
//         getDataDetailFood,
//         getDataAllEmployee,
//         getDataDetailEmployee,
//         getDataAllTransaction,
//         storeDataTransaction
//     };
// });