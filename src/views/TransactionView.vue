<template>
  <Navbar />
  <Sidebar />
  <div class="content-wrapper">
    <div class="content">
      <div class="container-fluid">
        <ContentHeader TextContentHeader="Daftar Transaksi" />
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card" v-show="displayAll">
                  <Table :columns="columnsTransaction" :rows="dataAllTransaction" :onDetailRow="detailTransaction" />
                </div>
                <div class="card card-primary" v-show="displayDetail">
                  <div class="card-header">
                    <h3 class="card-title">Detail Transaksi</h3>
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
                          </tr>
                        </thead>
                        <tbody v-for="(item, index) in dataDetailTransaction">
                          <tr>
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.product_data.nama_produk }}</td>
                            <td>{{ item.keterangan }}</td>
                            <td>{{ item.jumlah_sub_total }}</td>
                            <td>Rp {{ item.product_data.harga }}</td>
                            <td>Rp {{ (item.jumlah_sub_total * item.product_data.harga).toFixed(2) }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <li class="list-group-item" style="font-size: 20px;">
                        <b>Total Bayar</b>
                        <b class="float-right">Rp {{ dataDetailOnlyTotal }}</b>
                      </li>
                    </div>
                  </div>
                  <div class="card-footer">
                    <ButtonGreen textButton="Kembali" @click="backToMenu"/>
                  </div>
                </div>
                <!-- </div> -->
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
import { ref, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import ContentHeader from '../components/ContentHeader.vue';
import Table from '../components/Table.vue';
import Cookies from "js-cookie";
import ButtonGreen from '../components/button/ButtonGreen.vue';

const VarAppStore = UseAppStore();
const dataAllTransaction = ref([]);
const dataDetailTransaction = ref([]);
const dataDetailOnlyTotal = ref('');
const displayAll = ref(true);
const displayDetail = ref(false);

const columnsTransaction = ref([
  {
    label: "Pegawai Melayani",
    field: "pegawai_melayani",
  },
  {
    label: "Tanggal Transaksi",
    field: "tanggal_transaksi",
  },
  {
    label: "Waktu Transaksi",
    field: "waktu_transaksi",
  },
  {
    label: "Total",
    field: "total",
  },
  {
    label: "Aksi",
    field: "detail",
  }
]);
const headers = {
  Authorization: `Bearer ${Cookies.get('token')}`,
};
const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataAllTransaction({ headers });
    dataAllTransaction.value = response.data.data
  } catch (error) {
  }
};

const detailTransaction = async (row) => {
  try {
    displayDetail.value = true;
    displayAll.value = false;
    const response = await VarAppStore.getDataDetailTransaction(row.id, { headers });
    dataDetailTransaction.value = response.data.data.transaction_data;
    dataDetailOnlyTotal.value = response.data.data.total
  } catch (error) {

  }
};

const backToMenu = async () => {
  try {
    displayAll.value = true;
    displayDetail.value = false;
  } catch (error) {
    
  }
}

onMounted(async () => {
  await fetchData();
});
</script>