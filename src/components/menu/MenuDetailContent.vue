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
              <img src="../../assets/image/P-003.jpg" class="product-image" alt="Product Image">
              <!-- <img :src="'../../assets/image/'+item.kode_produk" class="product-image" alt="Product Image"> -->
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <form v-on:submit.prevent>
              <!-- <input type="hidden" v-model="dataInputOrder.kode_produk" :value="kiko"> -->
              <!-- <input type="hidden" :value="item.kode_produksi" @input="item.kode_produksi = $event.target.value"> -->
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
              <button type="submit" class="btn btn-primary" @click="orderMenu">Pesan</button>
            </form>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </section>
  <!-- <div v-for="item in dataKodeProductsOnly">
    {{ item.kode_produk }}
  </div> -->
  <!-- {{ dataKodeProductsOnly[0].kode_produk }} -->
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useMenuStore } from '../../stores/menuStore';
import { useTransactionStore } from '../../stores/transactionStore'

// const idData = $route.params.id;
const menu = useMenuStore();
const transaction = useTransactionStore();
const dataDetailMenu = ref([]);
const dataKodeProductsOnly = [];
// console.log(dataKodeProductsOnly[0].kode_produk);

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
    const temp_kode_product = {};

    const response = await menu.getDataDetailFood(idDataFood);
    dataDetailMenu.value = response.data;
    // console.log(dataInputOrder['kode_produk']);
    temp_kode_product.kode_produk = response.data.data.kode_produk;
    dataKodeProductsOnly.push(temp_kode_product);
    
    // dataInputOrder['kode_produk'].value.push(response.data.data.kode_produk);
  } catch (error) {
  }
};

const orderMenu =  async () => {
  try {
    // const response = await transaction.transactionDataStore(dataInputOrder);
    // return response;
    console.log(dataInputOrder);
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchData();
});

</script>