import { defineStore } from 'pinia'
import axios from "axios"

export const UseAppStore = defineStore('AppStore', () => {
    //auth
    const login = async ({username,password}) => {
        const response = await axios.post('/login',{username,password});
        return response;
    };
    const logout = async ({headers}) => {
        const response = await axios.get('/logout',{headers});
        return response;
    };

    // food store
    const getDataAllFood = async ({headers}) => {
        try {
            const response = await axios.get('/products/show',{headers});
            return response;
        } catch (error) {
        }
    };
    const getDataDetailFood = async (idDataFood,{headers}) => {
        try {
            const response = await axios.get('/products/show/'+idDataFood,{headers});
            return response;
        } catch (error) {
        }
    };
    const storeDataFood = async (dataFood,config) => {
        // try {
            const response = await axios.post('/products/store',dataFood,config);
            return response;
        // } catch (error) {
        // }
    };
    const updateDataFood = async (idDataFood,dataFood,{headers}) => {
        // try {
            const response = await axios.put('/products/update/'+idDataFood,dataFood,{headers});
            return response;
        // } catch (error) {
        // }
    };
    const destroyDataFood = async (idDataFood,{headers}) => {
        try {
            const response = await axios.delete('/products/destroy/'+idDataFood,{headers});
            return response;
        } catch (error) {
        }
    };

    // employee store
    const getDataAllEmployee = async ({headers}) => {
        try {
            const response = await axios.get('/employees/show',{headers});
            return response;
        } catch (error) {
        }
    };
    const getDataDetailEmployee = async (idData,{headers}) => {
        try {
            const response = await axios.get('/employees/show/'+idData,{headers});
            return response;
        } catch (error) {
        }
    };
    const storeDataEmployee = async (dataEmployee,{headers}) => {
        // try {
            const response = await axios.post('/employees/store',dataEmployee,{headers});
            return response;
        // } catch (error) {
        //     console.log(error.response.data.errors)
        // }
    };
    const updateDataEmployee = async (idEmployee,dataEmployee,{headers}) => {
        // try {
            const response = await axios.put('/employees/update/'+idEmployee, dataEmployee,{headers});
            return response;
        // } catch (error) {
            
        // }
    };
    const destroyDataEmployee = async (idEmployee,{headers}) => {
        try {
            const response = await axios.delete('/employees/destroy/'+idEmployee,{headers});
            return response;
        } catch (error) {
            
        }
    };

    // transaction store
    const getDataAllTransaction = async ({headers}) => {
        try {
            const response = await axios.get('/transactions/show',{headers});
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const storeDataTransaction = async (dataTransaction,{headers}) => {
        // try {
            const response = await axios.post('/transactions/store',dataTransaction,{headers});
            return response;
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return{
        login,
        logout,
        getDataAllFood,
        getDataDetailFood,
        storeDataFood,
        updateDataFood,
        destroyDataFood,
        getDataAllEmployee,
        getDataDetailEmployee,
        storeDataEmployee,
        updateDataEmployee,
        destroyDataEmployee,
        getDataAllTransaction,
        storeDataTransaction
    };
});