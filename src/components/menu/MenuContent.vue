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

        <div class="row">
          <div class="col-sm-4" v-for="item in dataAllMenu.data">
            <div class="position-relative shadow">
              <img src="../../assets/adminlte/dist/img/photo1.png" alt="Photo 1" class="img-fluid">

              <div class="card-body">
                <p class="card-text">{{ item.nama_produk }}</p>
                <p class="card-text">{{ item.harga }}</p>
                <!-- <RouterLink :to="{name:'menudetail',params:{ id:dataAllMenu.id }}" type="button" class="btn btn-success">Pesan</RouterLink> -->
                <RouterLink :to="'/menu/'+item.id" type="button" class="btn btn-success">Pesan</RouterLink>
              </div>

            </div>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->

  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useMenuStore } from '../../stores/menuStore.js';

const menu = useMenuStore();
const dataAllMenu = ref([]);

const fetchData = async () => {
  try {
    const response = await menu.getDataAllFood();
    dataAllMenu.value = response.data
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchData();
});
</script>