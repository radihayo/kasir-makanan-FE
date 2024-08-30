<template>
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                <ContentHeader TextContentHeader="Dashboard" />
                <div v-show="displayDashboard">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-6">
                            <div class="info-box">
                                <span class="info-box-icon bg-info elevation-1"><i class="fas fa-shopping-cart"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">Pesanan Hari Ini</span>
                                    <span class="info-box-number">{{ totalOrderToday }}</span>
                                </div>
                                <div><a href="javascript:void(0);" @click="dataAllOrderToday" class="small-box-footer"><i
                                            class="fas fa-arrow-circle-right"></i></a></div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6">
                            <div class="info-box mb-3">
                                <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-utensils"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">Produk Terjual Hari Ini</span>
                                    <span class="info-box-number">{{ totalSellToday }}</span>
                                </div>
                                <div><a href="javascript:void(0);" @click="dataAllProductsSellToday"
                                        class="small-box-footer"><i class="fas fa-arrow-circle-right"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-8 col-md-8">
                            <div class="card">
                                <div class="card-header border-0">
                                    <div class="d-flex justify-content-between">
                                        <h3 class="card-title">Statistik Pendapatan Perbulan</h3>
                                        <a href="javascript:void(0);">View Report</a>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex">
                                        <p class="d-flex flex-column">
                                            <span class="text-bold text-lg">820</span>
                                            <span>Visitors Over Time</span>
                                        </p>
                                        <p class="ml-auto d-flex flex-column text-right">
                                            <span class="text-success">
                                                <i class="fas fa-arrow-up"></i> 12.5%
                                            </span>
                                            <span class="text-muted">Since last week</span>
                                        </p>
                                    </div>
                                    <div class="position-relative mb-4">
                                        <canvas id="visitors-chart" height="200"></canvas>
                                    </div>

                                    <div class="d-flex flex-row justify-content-end">
                                        <span class="mr-2">
                                            <i class="fas fa-square text-primary"></i> This Week
                                        </span>

                                        <span>
                                            <i class="fas fa-square text-gray"></i> Last Week
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-4 col-md-4">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Produk Paling Laku Hari Ini</h3>
                                </div>
                                <div class="card-body p-0">
                                    <ul class="products-list product-list-in-card pl-2 pr-2">
                                        <li class="item" v-for="item in tempBestSell">
                                            <div class="product-img">
                                                <img :src="'http://127.0.0.1:8000/storage/image/products/' + item.product_data.gambar"
                                                    alt="Product Image" class="img-size-50">
                                            </div>
                                            <div class="product-info">
                                                <a class="product-title">{{ item.product_data.nama_produk }}
                                                </a>
                                                <span class="product-description">
                                                    Terjual : {{ item.jumlah_sub_total }}
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="displayDataOrderToday">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <ButtonBlue @click="backFromOrderToday" textButton="Kembali"/>
                            </div>
                            <Table :columns="columnsDataOrderToday" :rows="dataOrderToday" />
                        </div>
                    </div>
                </div>
                <div v-show="displayDataProductsSellToday">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <ButtonBlue @click="backFromProductsSellToday" textButton="Kembali"/>
                            </div>
                            <Table :columns="columnsProductsSellToday" :rows="dataProductsSellToday" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <Footer />
</template>
<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue'
import ContentHeader from '../components/ContentHeader.vue'
import { ref, reactive, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import Table from '../components/Table.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import Cookies from "js-cookie";
const headers = {
    Authorization: `Bearer ${Cookies.get('token')}`,
};

const displayDashboard = ref(true);
const displayDataOrderToday = ref(false);
const displayDataProductsSellToday = ref(false);

const VarAppStore = UseAppStore();
const totalOrderToday = ref(0);
const totalSellToday = ref(0);
const tempBestSell = ref(0);

const dataOrderToday = ref([]);
const dataProductsSellToday = ref([]);

const columnsDataOrderToday = ref([
    {
        label: "Total",
        field: "total",
    },
]);

const columnsProductsSellToday = ref([
    {
        label: "Kode Produk",
        field: "kode_produk",
    },
    {
        label: "Nama Produk",
        field: "nama_produk",
    },
    {
        label: "Total Terjual",
        field: "jumlah_sub_total",
    }
]);

const orderToday = async () => {
    try {
        const response = await VarAppStore.orderToday({ headers });
        totalOrderToday.value = response.data.data.length
        // dataOrderToday.value = response.data.data
        console.log(response);
    } catch (error) {

    }
}

const dataAllOrderToday = async () => {
    try {
        displayDataOrderToday.value = true;
        displayDashboard.value = false;
    } catch (error) {

    }
}

const productsSellToday = async () => {
    try {
        const response = await VarAppStore.productsSellToday({ headers });
        let result = 0
        response.data.data.forEach((element, index) => {
            const dataEachProducts = reactive({
                kode_produk: '',
                nama_produk: '',
                harga: '',
                jumlah_sub_total: '',
                total: ''
            })
            result += parseInt(element.jumlah_sub_total)
            Object.assign(dataEachProducts, {
                kode_produk: element.product_data.kode_produk,
                nama_produk: element.product_data.nama_produk,
                jumlah_sub_total: element.jumlah_sub_total
            })
            dataProductsSellToday.value[index] = dataEachProducts
        });
        totalSellToday.value = result
    } catch (error) {

    }
}

const dataAllProductsSellToday = async () => {
    try {
        displayDataProductsSellToday.value = true;
        displayDashboard.value = false;
    } catch (error) {

    }
}

const bestSellingProductsToday = async () => {
    try {
        const response = await VarAppStore.bestSellingProductsToday({ headers });
        tempBestSell.value = response.data.data
    } catch (error) {

    }
}

const backFromOrderToday = async () => {
    try {
        displayDashboard.value = true;
        displayDataOrderToday.value = false;
    } catch (error) {
        
    }
}

const backFromProductsSellToday = async () => {
    try {
        displayDashboard.value = true;
        displayDataProductsSellToday.value = false;
    } catch (error) {
        
    }
}

onMounted(async () => {
    await orderToday();
    await productsSellToday();
    await bestSellingProductsToday();
});

</script>
