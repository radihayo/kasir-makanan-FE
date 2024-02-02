<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Menu Makanan</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Menu Makanan</li>
          </ol>
        </div>
      </div>
    </div><!-- /.container-fluid -->
  </section>
  <section class="content">
    <!-- Default box -->
    <div class="card card-solid">
      <div class="card-body">
        <div class="row" v-for="item in dataDetailMenu">
          <div class="col-12 col-sm-6">
            <div class="col-12">
              <!-- <img :src="require('@/assets/image/'+item.kode_produksi)" class="product-image" alt="Product Image"> -->
              <img src="../../assets/image/P-003.jpg" class="product-image" alt="Product Image">
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <form v-on:submit.prevent>
              <h3 class="my-3">{{ item.nama_produk }}</h3>
              <p>{{ item.deskripsi }}</p>
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
            </form>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </section>

</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { UseAppStore } from '../../stores/appStore';

const VarAppStore = UseAppStore();
// const idData = $route.params.id;
const dataDetailMenu = ref([]);

const url = window.location.href;
const idDataFood = url.split("/").slice(-1)[0];

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
    const response = await VarAppStore.getDataDetailFood(idDataFood);
    dataDetailMenu.value = response.data;
    dataInputOrder.value.kode_produk = response.data.data.kode_produk;
  } catch (error) {
  }
};

const orderMenu =  async () => {
  try {
    const response = await VarAppStore.storeDataTransaction(dataInputOrder);
    // return response;
    // console.log(dataInputOrder);
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchData();
});

</script>