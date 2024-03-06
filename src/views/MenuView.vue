<template>
  <Navbar />
  <Sidebar />
  <div class="content-wrapper">
    <div class="content">
      <div class="container-fluid">

        <ContentHeader TextContentHeader="Menu Makanan" />
        <section class="content">
          <!-- Default box -->
          <div class="card card-solid" v-show="displayAll">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-4" v-for="item in dataAllMenu.data">
                  <div class="position-relative shadow">
                    <!-- <img src="../assets/image/P-003.jpg" alt="Photo 1" class="img-fluid"> -->
                    <img :src="'http://127.0.0.1:8000/storage/image/' + item.gambar" alt="Photo 1" class="img-fluid">

                    <div class="card-body">
                      <p class="card-text">{{ item.nama_produk }}</p>
                      <p class="card-text">Rp {{ item.harga }}</p>
                      <!-- <RouterLink :to="{name:'menudetail',params:{ id:dataAllMenu.id }}" type="button" class="btn btn-success">Pesan</RouterLink> -->
                      <!-- <RouterLink :to="'/menu/' + item.id" type="button" class="btn btn-success">Pesan</RouterLink> -->
                      <ButtonGreen textButton="Pesan" @click="selectFood(item.id)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
          <div class="card card-solid" v-show="displayDetails">
            <div class="card-body">
              <div class="row" v-for="item in dataDetailMenu">
                <div class="col-12 col-sm-6">
                  <div class="col-12">
                    <!-- <img :src="require('@/assets/image/'+item.kode_produksi)" class="product-image" alt="Product Image"> -->
                    <img :src="'http://127.0.0.1:8000/storage/image/' + item.gambar" class="product-image"
                      alt="Product Image">
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <form v-on:submit.prevent>
                    <!-- <input type="text" :value="dataInputOrder.kode_produk"> -->
                    <!-- <Suspense>
                <template #default>
                  <h3 class="my-3">{{ item.nama_produk }}</h3>
                </template>
                <template #fallback>
                  <Skeleton/>
                </template>
              </Suspense> -->

                    <h3 class="my-3">{{ item.nama_produk }}</h3>
                    <p>{{ item.deskripsi }}</p>
                    <hr>
                    <h4>Rp. {{ item.harga }}</h4>
                    <FormInputBase labelText="Jumlah Pesan" v-model="dataInputOrder.jumlah"
                      :errorMessage="errorMessageValue?.jumlah" inputType="number" />
                    <FormInputTextArea labelText="Keterangan" v-model="dataInputOrder.keterangan"
                    :errorMessage="errorMessageValue?.keterangan" rowsLength="3"/>
                    <ButtonGreen textButton="Pesan" @click="orderFood" class="mr-1" />
                    <ButtonBlue textButton="Kembali" @click="backToMenu" />
                  </form>
                </div>
              </div>
            </div>
            <!-- /.card-body -->
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
import { Skeleton } from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css";
import { SkeletonComponent } from "@syncfusion/ej2-vue-notifications";
import FormInputBase from '../components/form/FormInputBase.vue';
import FormInputTextArea from '../components/form/FormInputTextArea.vue';

import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import ContentHeader from '../components/ContentHeader.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue'

let displayAll = ref(true);
let displayDetails = ref(false);

const VarAppStore = UseAppStore();
const dataAllMenu = ref([]);
const dataDetailMenu = ref([]);
const errorMessageValue = ref({});

const cartV2 = ref([]);

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const dataInputOrder = reactive({
  kode_produk: '',
  jumlah: '',
  tanggal_transaksi: date,
  waktu_transaksi: time,
  pegawai_melayani: localStorage.getItem('userLoginName'),
  keterangan: ''
});

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataAllFood({ headers });
    dataAllMenu.value = response.data
  } catch (error) {
  }
};

const selectFood = async (idFood) => {
  try {
    displayAll.value = false;
    displayDetails.value = true;
    const response = await VarAppStore.getDataDetailFood(idFood, { headers });
    dataDetailMenu.value = response.data;
    dataInputOrder.kode_produk = response.data.data.kode_produk;
  } catch (error) {
  }
};

const orderFood = async () => {
  try {
    const response = await VarAppStore.storeDataTransaction(dataInputOrder, {headers});
    if (response.status == 201) {
      console.log('success');
    } else {
      Swal.fire({
        title: "Data Gagal Ditambahkan",
        icon: "error"
      });
    }
    // VarAppStore.cart.value.data = dataInputOrder;
    // cartV2.value = dataInputOrder;
    // console.log(cartV2);
  } catch (error) {
    errorMessageValue.value = error.response.data.errors;
    console.clear();
  }
};

const emptyForm = async () => {
    try {
      dataInputOrder.jumlah = '';
      dataInputOrder.keterangan = '';
    } catch (error) {

    }
};

const emptyMessage = async () => {
    try {
        errorMessageValue.value = '';
    } catch (error) {

    }
};

const backToMenu = async () => {
  try {
    displayAll.value = true;
    displayDetails.value = false;
    emptyForm();
    emptyMessage();
  } catch (error) {

  }
};

onMounted(async () => {
  await fetchData();
});

onUnmounted(async () => {
  await selectFood();
});

</script>
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-notifications/styles/material.css";
</style>