<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <button type="button" class="btn btn-tool" id="btn_add_barang">
                <i class="fas fa-plus"></i>
              </button>
            </div>

            <!-- /.card-header -->
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th style="width: 10px">No</th>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Gambar</th>
                    <th>Harga</th>
                    <th>Tersedia</th>
                    <th style="width: 200px">Aksi</th>
                  </tr>
                </thead>
                <tbody v-for="(item,index) in dataAllFood.data">
                  <tr>
                    <td>{{ index+1 }}</td>
                    <td>{{ item.kode_produk }}</td>
                    <td>{{ item.nama_produk }}</td>
                    <td>{{ item.gambar }}</td>
                    <td>{{ item.harga }}</td>
                    <td>{{ item.tersedia }}</td>
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
import { useMenuStore } from '../../stores/menuStore.js';

const food = useMenuStore();
const dataAllFood = ref([]);

const fetchData = async () => {
  try {
    const response = await food.getDataAllFood();
    dataAllFood.value = response.data
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchData();
});
</script>