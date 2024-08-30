import { defineStore } from 'pinia'
import axios from "axios"
import { ref, reactive } from 'vue'

export const UseAppStore = defineStore('AppStore', () => {
    //cart
    const cartData = ref([]);
    const totalData = ref('');
    const errorInput = reactive({
        jumlah_sub_total: '',
        keterangan: ''
    });
    const resultCalculatePayment = ref(0);

    const addDataToCart = (item) => {
        try {
            if (item.jumlah_sub_total != '' && item.keterangan != '') {
                errorInput.jumlah_sub_total = '';
                errorInput.keterangan = '';
                const checkExist = cartData.value.filter(currentDataAdded => currentDataAdded.kode_produk === item.kode_produk)[0];
                if (checkExist) {
                    const dataExist = cartData.value.find(dataUpdate => dataUpdate.kode_produk == checkExist.kode_produk)
                    dataExist.jumlah_sub_total += parseInt(item.jumlah_sub_total);
                    dataExist.total = dataExist.jumlah_sub_total * dataExist.harga;
                    dataExist.keterangan = item.keterangan;
                    // resultCalculatePayment.value += dataExist.total;
                } else {
                    cartData.value = [...cartData.value, { ...item, jumlah_sub_total: parseInt(item.jumlah_sub_total), total: item.jumlah_sub_total * item.harga }];
                    // resultCalculatePayment.value += item.jumlah_sub_total*item.harga
                    // console.log(item.harga);
    
                }
                totalData.value = cartData.value.length;
                caclculatePayment();
            } else if (item.jumlah_sub_total == '' && item.keterangan != '') {
                errorInput.jumlah_sub_total = 'Tidak Boleh Kosong';
                errorInput.keterangan = '';
            } else if (item.jumlah_sub_total != '' && item.keterangan == '') {
                errorInput.jumlah_sub_total = '';
                errorInput.keterangan = 'Tidak Boleh Kosong';
            } else {
                errorInput.keterangan = 'Tidak Boleh Kosong';
                errorInput.jumlah_sub_total = 'Tidak Boleh Kosong';
            }

            // const checkExist = cartData.value.filter(currentDataAdded => currentDataAdded.kode_produk === item.kode_produk)[0];
            // if(checkExist){
            //     // console.log('sudah ada data yang sama');
            //     const dataExist = cartData.value.find(dataUpdate => dataUpdate.kode_produk == checkExist.kode_produk)
            //     dataExist.jumlah_sub_total += parseInt(item.jumlah_sub_total);
            //     dataExist.keterangan = item.keterangan;
            //     // const nyobak = cartData.find(item => item.kode_produk == checkExist.kode_produk)
            //     // cartData.value = [...cartData.value, {...item}];
            //     // cartData[checkExist.kode_produk].jumlah += item.jumlah
            //     // console.log(cartData.[0]);
            //     // console.log(item.jumlah);
            //     // checkExist.jumlah +=1;
            // }else{
            //     cartData.value = [...cartData.value, {...item, jumlah_sub_total:parseInt(item.jumlah_sub_total)}];
            //     // cartData.push(...item);
            //     // cartData.value[counter.value++] = item;
            //     // console.log('data baru ditambahkan');
            // }
            // totalData.value = cartData.value.length;


            // console.log(cartData.value[0].harga*2);
            // console.log(cartData.reduce((acc,cartData) => acc += cartData.value[acc].harga * cartData.value[acc].jumlah,0));
            // caclculatePayment();
            // console.log(cartData.value[0]);
            // console.log(cartData.value);

        } catch (error) {

        }
    };

    const increaseOrderValue = (item) => {
        try {
            const dataCartUpdated = cartData.value.find(dataUpdate => dataUpdate.kode_produk == item.kode_produk);
            dataCartUpdated.jumlah_sub_total += 1;
            dataCartUpdated.total = dataCartUpdated.jumlah_sub_total * dataCartUpdated.harga
            caclculatePayment();
            // resultCalculatePayment.value = dataCartUpdated.total

            // const reduceNyobak = mboh.reduce((acc,mboh) => acc += mboh.value[acc].harga * mboh.value[acc].jumlah,0)
            // const reduceNyobak = mboh.reduce((total,jumlah) => total+jumlah)
            // console.log(reduceNyobak);
            // console.log(kodeProdukData)
            // cartData.value.find(dataUpdate => dataUpdate.kode_produk == kodeProdukData).jumlah += 1;
        } catch (error) {

        }
    };

    const descreaseOrderValue = (item) => {
        try {
            const dataCartUpdated = cartData.value.find(dataUpdate => dataUpdate.kode_produk == item.kode_produk);
            dataCartUpdated.jumlah_sub_total -= 1;
            dataCartUpdated.total = dataCartUpdated.jumlah_sub_total * dataCartUpdated.harga
            caclculatePayment();
            // resultCalculatePayment.value -= dataCartUpdated.total

            // console.log(dataCartUpdated);
            // console.log(kodeProdukData)
            // cartData.value.find(dataUpdate => dataUpdate.kode_produk == kodeProdukData).jumlah -= 1;
            if (dataCartUpdated.jumlah_sub_total == 0) {
                // deleteDataFromCart();
                cartData.value = cartData.value.filter(dataUpdate => dataUpdate.kode_produk !== item.kode_produk);
                // cartData.value.splice(dataCartUpdated,1);
                totalData.value = cartData.value.length;
            }
        } catch (error) {

        }
    };
    const deleteDataFromCart = (item) => {
        try {
            const dataCartUpdated = cartData.value.find(dataUpdate => dataUpdate.kode_produk == item.kode_produk);
            resultCalculatePayment.value -= dataCartUpdated.total;
            cartData.value = cartData.value.filter(dataDelete => dataDelete.kode_produk !== item.kode_produk);
            // const dataCartDeleted = cartData.value.find(dataDelete => dataDelete.kode_produk == item.kode_produk)
            // cartData.value.splice(dataCartDeleted,1);
            totalData.value = cartData.value.length;
            // const checkExist = cartData.value.filter(currentDataAdded => currentDataAdded.kode_produk === item.kode_produk)[0];
            // if(checkExist){
            //     cartData.value.splice(checkExist,1);
            //     totalData.value = cartData.value.length;
            // }else{
            //     console.log('gk onok');
            // }
        } catch (error) {

        }
    };

    const caclculatePayment = () => {
        try {
            let result = 0;
            cartData.value.forEach(element => {
                result += element.total;
            });
            return resultCalculatePayment.value = result

        } catch (error) {

        }
    };

    //auth
    const login = async ({ username, password }) => {
        const response = await axios.post('/login', { username, password });
        return response;
    };
    const logout = async ({ headers }) => {
        const response = await axios.get('/logout', { headers });
        return response;
    };

    // food store
    const getDataAllFood = async ({ headers }) => {
        try {
            const response = await axios.get('/products/show', { headers });
            return response;
        } catch (error) {
        }
    };
    const getDataDetailFood = async (idDataFood, { headers }) => {
        try {
            const response = await axios.get('/products/show/' + idDataFood, { headers });
            return response;
        } catch (error) {
        }
    };
    const storeDataFood = async (dataFood, config) => {
        // try {
        const response = await axios.post('/products/store', dataFood, config);
        return response;
        // } catch (error) {
        // }
    };
    const updateDataFood = async (idDataFood, dataFood, config) => {
        // try {
        const response = await axios.put('/products/update/' + idDataFood, dataFood, config);
        return response;
        // } catch (error) {
        // }
    };
    const destroyDataFood = async (idDataFood, { headers }) => {
        try {
            const response = await axios.delete('/products/destroy/' + idDataFood, { headers });
            return response;
        } catch (error) {
        }
    };

    // employee store
    const getDataAllEmployee = async ({ headers }) => {
        try {
            const response = await axios.get('/employees/show', { headers });
            return response;
        } catch (error) {
        }
    };
    const getDataDetailEmployee = async (idData, { headers }) => {
        // try {
        const response = await axios.get('/employees/show/' + idData, { headers });
        return response;
        // } catch (error) {
        // }
    };
    const storeDataEmployee = async (dataEmployee, config) => {
        // try {
        const response = await axios.post('/employees/store', dataEmployee, config);
        return response;
        // } catch (error) {
        //     console.log(error.response.data.errors)
        // }
    };
    const updateDataEmployee = async (idEmployee, dataEmployee, config) => {
        // try {
        const response = await axios.put('/employees/update/' + idEmployee, dataEmployee, config);
        // const mboh = await axios
        return response;
        // } catch (error) {

        // }
    };
    const destroyDataEmployee = async (idEmployee, { headers }) => {
        try {
            const response = await axios.delete('/employees/destroy/' + idEmployee, { headers });
            return response;
        } catch (error) {

        }
    };
    const changePasswordEmployee = async (idEmployee, passwordEmployee, { headers }) => {
        // try {
        const response = await axios.put('/employees/change_password/' + idEmployee, passwordEmployee, { headers });
        return response;
        // } catch (error) {

        // }
    };
    const resetPasswordEmployee = async (idEmployee, passwordEmployee, { headers }) => {
        const response = await axios.put('/employees/reset_password/' + idEmployee, passwordEmployee, { headers });
        return response;
    };

    // transaction store
    const getDataAllTransaction = async ({ headers }) => {
        // try {
        const response = await axios.get('/transactions/show', { headers });
        return response;
        // } catch (error) {
        //     console.log(error);
        // }
    };
    const storeDataTransaction = async (dataTransaction, { headers }) => {
        // try {
        const response = await axios.post('/transactions/store', dataTransaction, { headers });
        return response;
        // } catch (error) {
        //     console.log(error);
        // }
    };
    const getDataDetailTransaction = async (idTransaction,{ headers }) => {
        const response = await axios.get('/transactions/show/'+idTransaction,{headers})
        return response;
    }

    // dashboard
    const orderToday = async({headers})=>{
        const response = await axios.get('/dashboard/order_today',{headers});
        return response;
    };

    const productsSellToday = async({headers})=>{
        const response = await axios.get('/dashboard/products_sell_today',{headers});
        return response;
    };

    const bestSellingProductsToday = async({headers})=>{
        const response = await axios.get('/dashboard/best_selling_products_today',{headers});
        return response;
    };

    return {
        login,
        logout,
        orderToday,
        productsSellToday,
        bestSellingProductsToday,
        addDataToCart,
        increaseOrderValue,
        descreaseOrderValue,
        deleteDataFromCart,
        totalData,
        cartData,
        errorInput,
        resultCalculatePayment,
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
        changePasswordEmployee,
        resetPasswordEmployee,
        getDataAllTransaction,
        storeDataTransaction,
        getDataDetailTransaction
    };
});