<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th style="width: 10px">No</th>
                    <th>Kode</th>
                    <th>Jumlah</th>
                    <th>Tanggal Transaksi</th>
                    <th>Waktu Transaksi</th>
                    <th>Pegawai Melayani</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                    <th style="width: 200px">Aksi</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in dataAllTransaction.data">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.kode_produk }}</td>
                    <td>{{ item.jumlah }}</td>
                    <td>{{ item.tanggal_transaksi }}</td>
                    <td>{{ item.waktu_transaksi }}</td>
                    <td>{{ item.pegawai_melayani }}</td>
                    <td>{{ item.keterangan }}</td>
                    <td>{{ item.status }}</td>
                    <td><button>Edit</button><button>Delete</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
            <div class="card-footer clearfix">
              <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
              </ul>
            </div>
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useTransactionStore } from '../../stores/transactionStore.js';

const transaction = useTransactionStore();
const dataAllTransaction = ref([]);

const fetchData = async () => {
  try {
    const response = await transaction.getDataAllTransaction();
    dataAllTransaction.value = response.data
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchData();
});
</script>