<template>
  <ContentHeader TextContentHeader="Menu Makanan"/>
  <section class="content">
    <!-- Default box -->
    <div class="card card-solid" v-show="displayAll">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-4" v-for="item in dataAllMenu.data">
            <div class="position-relative shadow">
              <!-- <img src="../assets/image/P-003.jpg" alt="Photo 1" class="img-fluid"> -->
              <img :src="'http://127.0.0.1:8000/storage/image/'+item.gambar" alt="Photo 1" class="img-fluid">

              <div class="card-body">
                <p class="card-text">{{ item.nama_produk }}</p>
                <p class="card-text">Rp {{ item.harga }}</p>
                <!-- <RouterLink :to="{name:'menudetail',params:{ id:dataAllMenu.id }}" type="button" class="btn btn-success">Pesan</RouterLink> -->
                <!-- <RouterLink :to="'/menu/' + item.id" type="button" class="btn btn-success">Pesan</RouterLink> -->
                <ButtonGreen TextButton="Pesan" @click="selectFood(item.id)"/>
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
              <img :src="'http://127.0.0.1:8000/storage/image/'+item.gambar" class="product-image" alt="Product Image">
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <form v-on:submit.prevent>
              <!-- <input type="text" :value="dataInputOrder.kode_produk"> -->
              <Suspense>
                <!-- <template #default> -->
                  <h3 class="my-3">{{ item.nama_produk }}</h3>
                <!-- </template> -->
                <template #fallback>
                  <Skeleton/>
                </template>
              </Suspense>
 
               
              <p>{{ item.deskripsi  }}</p>
              <hr>
              <h4>Rp. {{ item.harga }}</h4>
              <div class="form-group">
                <label for="jumlah">Jumlah Pesan</label>
                <input type="text" class="form-control" v-model="dataInputOrder.jumlah">
              </div>
              <div class="form-group">
                <label>Keterangan</label>
                <textarea class="form-control" rows="3" v-model="dataInputOrder.keterangan"></textarea>
              </div>
              <!-- <button type="submit" class="btn btn-primary" @click="orderMenu">Pesan</button> -->
              <ButtonGreen TextButton="Pesan" @click="orderFood" class="mr-1"/>
              <ButtonBlue TextButton="Kembali" @click="backToMenu"/>              
            </form>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
  </section>
</template>
<script setup>
import { Skeleton } from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css";
import { SkeletonComponent } from "@syncfusion/ej2-vue-notifications";

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

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const dataInputOrder = reactive({
  kode_produk:'',
  jumlah:'',
  tanggal_transaksi:date,
  waktu_transaksi:time,
  pegawai_melayani:'Hanif',
  keterangan:'',
  status:'0'
});

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataAllFood();
    dataAllMenu.value = response.data
  } catch (error) {
  }
};

const selectFood = async (idFood) => {
  try {
    displayAll.value = false;
    displayDetails.value = true;
    const response = await VarAppStore.getDataDetailFood(idFood);
    dataDetailMenu.value = response.data;
    dataInputOrder.kode_produk = response.data.data.kode_produk;
  } catch (error) {
  }
};

const orderFood =  async () => {
  try {
    const response = await VarAppStore.storeDataTransaction(dataInputOrder);
  } catch (error) {
  }
};

const backToMenu = async () => {
  try {
    displayAll.value = true;
    displayDetails.value = false;
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