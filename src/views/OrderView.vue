<template>
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                <ContentHeader TextContentHeader="Daftar Pesanan" />
                <section class="content">
                    <div class="col-md-12">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Daftar Pesanan</h3>
                            </div>
                            <div class="card-body">
                                <div class="card-body p-0">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama Makanan</th>
                                                <th>Keterangan</th>
                                                <th>Jumlah</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="VarAppStore.totalData != ''"
                                            v-for="(item, index) in VarAppStore.cartData">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.nama_produk }}</td>
                                            <td>{{ item.keterangan }}</td>
                                            <td><button @click="VarAppStore.descreaseOrderValue(item)" type="button"
                                                    class="btn btn-xs btn-default">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                {{ item.jumlah_sub_total }}
                                                <button @click="VarAppStore.increaseOrderValue(item)" type="button"
                                                    class="btn btn-xs btn-default">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </td>
                                            <td>Rp {{ item.harga }}</td>
                                            <td>Rp {{ item.total.toFixed(2) }}</td>
                                            <td><i @click="VarAppStore.deleteDataFromCart(item)" class="fas fa-trash"
                                                    style="cursor: pointer;"></i></td>
                                        </tbody>
                                        <tbody v-else>
                                            <td colspan="7" class="text-center"
                                                style="background-color: rgb(230, 230, 230);">Tidak ada Data</td>
                                        </tbody>
                                    </table>
                                    <li class="list-group-item" style="font-size: 20px;">
                                        <b>Total Bayar</b>
                                        <b class="float-right">Rp {{ (VarAppStore.resultCalculatePayment).toFixed(2) }}</b>               
                                    </li>
                                </div>
                            </div>
                            <div class="card-footer">
                                <ButtonGreen textButton="Bayar" @click="storeData" buttonType="button" class="mr-1" />
                                <RouterLink class="btn btn-primary" to="/menu">Kembali</RouterLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <Footer />
</template>
<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
import ContentHeader from '../components/ContentHeader.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import { reactive } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import Cookies from "js-cookie";

const VarAppStore = UseAppStore();

const headers = {
    Authorization: `Bearer ${Cookies.get('token')}`,
};

const pegawaiAkif = localStorage.getItem('userLoginName');
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const invoiceData = reactive({
    pegawai_melayani: pegawaiAkif,
    tanggal_transaksi: date,
    waktu_transaksi: time,
    total: VarAppStore.resultCalculatePayment
})

const storeData = async () => {
    try {
        if (VarAppStore.cartData == '') {
            Swal.fire({
                title: "Daftar Pesanan Masih Kosong",
                icon: "info"
            });
        } else {
            const responseInvoice = await VarAppStore.storeDataTransaction(invoiceData, { headers });
            for (const iterator of VarAppStore.cartData) {
                const responseTransaction = await VarAppStore.storeDataTransaction(iterator, { headers });
            }
            if (responseInvoice.status == 200) {
                Swal.fire({
                    title: "Pembayaran Berhasil",
                    icon: "success"
                })
            }
            
        }
    } catch (error) {

    }
};
</script>
