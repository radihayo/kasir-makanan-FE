<template>
  <ContentHeader TextContentHeader="Daftar Transaksi" />
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <!-- <vue-good-table :line-numbers="true" :columns="columnsTransaction" :rows="dataAllTransaction"
              :pagination-options="{ enabled: true }" :search-options="{ enabled: true }">
              <template #table-row="tableAllTransaction">
                <span v-if="tableAllTransaction.column.field == 'aksi'">
                  <ButtonBlue TextButton="Edit" class="mr-1 mb-1" />
                  <ButtonRed TextButton="Delete" class="mb-1" />
                </span>
                <span>
                  {{ tableAllTransaction.formattedRow[tableAllTransaction.column.field] }}
                </span>
              </template>
            </vue-good-table> -->
            <Table :columns="columnsTransaction" :rows="dataAllTransaction" :onEditRow="editRow" :onDeleteRow="deleteRow"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import ContentHeader from '../components/ContentHeader.vue';
import Table from '../components/Table.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import ButtonRed from '../components/button/ButtonRed.vue';

const VarAppStore = UseAppStore();
const dataAllTransaction = ref([]);

const columnsTransaction = ref([
  {
    label: "Kode",
    field: "kode_produk",
  },
  {
    label: "Jumlah",
    field: "jumlah",
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
    label: "Pegawai Melayani",
    field: "pegawai_melayani",
  },
  {
    label: "Keterangan",
    field: "keterangan",
  },
  {
    label: "Status",
    field: "status",
  },
  {
    label: "Aksi",
    field: "aksi",
  }
]);

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataAllTransaction();
    dataAllTransaction.value = response.data.data
  } catch (error) {
  }
};

const editRow = async () => {

};

const deleteRow = async () => {

};

onMounted(async () => {
  await fetchData();
});
</script>