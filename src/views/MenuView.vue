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
              <div class="row" v-if="dataAllMenu.data != ''">
                <div class="col-sm-4 mt-3" v-for="item in dataAllMenu.data">
                  <div class="position-relative shadow">
                    <img :src="'http://127.0.0.1:8000/storage/image/products/' + item.gambar" alt="product-image"
                      class="img-fluid">

                    <div class="card-body">
                      <p class="card-text">{{ item.nama_produk }}</p>
                      <p class="card-text">Rp {{ item.harga }}</p>
                      <ButtonGreen textButton="Pesan" @click="selectFood(item.id)" buttonType="button" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-else>
                <div class="text-center">
                  Tidak Ada Data
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
                    <img :src="'http://127.0.0.1:8000/storage/image/products/' + item.gambar" class="product-image"
                      alt="Product Image">
                  </div>
                </div>
                <div class="col-12 col-sm-6">
                  <form v-on:submit.prevent="VarAppStore.addDataToCart(dataInputOrder)">
                    <!-- <form v-on:submit.prevent="addData"> -->
                    <h3 class="my-3">{{ item.nama_produk }}</h3>
                    <p>{{ item.deskripsi }}</p>
                    <hr>
                    <h4>Rp. {{ item.harga }}</h4>
                    <FormInputBase labelText="Jumlah Pesan" v-model="dataInputOrder.jumlah_sub_total"
                      :errorMessage="VarAppStore.errorInput?.jumlah_sub_total" inputType="number" />
                    <FormInputTextArea labelText="Keterangan" v-model="dataInputOrder.keterangan"
                      :errorMessage="VarAppStore.errorInput?.keterangan" rowsLength="3" />
                    <ButtonGreen textButton="Pesan" buttonType="submit" class="mr-1" />
                    <ButtonBlue textButton="Kembali" @click="backToMenu" buttonType="button" />
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
import FormInputBase from '../components/form/FormInputBase.vue';
import FormInputTextArea from '../components/form/FormInputTextArea.vue';

import { ref, reactive, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import ContentHeader from '../components/ContentHeader.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue'
import Cookies from "js-cookie";
let displayAll = ref(true);
let displayDetails = ref(false);
// const props = defineProps(['displayAll','displayDetails']);

const VarAppStore = UseAppStore();
const dataAllMenu = ref([]);
const dataDetailMenu = ref([]);
// const errorMessageValue = ref({});

const headers = {
  Authorization: `Bearer ${Cookies.get('token')}`,
};

const dataInputOrder = reactive({
  kode_produk: '',
  nama_produk: '',
  jumlah_sub_total: '',
  keterangan: '',
  harga: ''
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
    dataInputOrder.nama_produk = response.data.data.nama_produk;
    dataInputOrder.harga = response.data.data.harga;
  } catch (error) {
  }
};

const addData = async () => {
  try {
    // console.log(dataInputOrder.kode_produk);
    // const checkExist = VarAppStore.cartData.value.filter(currentDataAdded => currentDataAdded.kode_produk === dataInputOrder.kode_produk)[0];
    // console.log(checkExist);
    // if(checkExist){
    //   console.log('data sudah ada')
    // }else{
    //   console.log('data baru ditambahkan')
    // }
  } catch (error) {

  }
};

const emptyForm = async () => {
  try {
    dataInputOrder.jumlah_sub_total = '';
    dataInputOrder.keterangan = '';
  } catch (error) {

  }
};

const emptyMessage = async () => {
  try {
    VarAppStore.errorInput.jumlah_sub_total = '';
    VarAppStore.errorInput.keterangan = '';
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

</script>
