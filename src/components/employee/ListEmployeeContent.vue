<template>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Daftar Pegawai</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Daftar Pegawai</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
        <!-- Default box -->
        <div class="card card-solid">
            <div class="card-body pb-0">
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                        v-for="item in dataAllEmployee.data">
                        <div class="card bg-light d-flex flex-fill">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-7">
                                        <h2 class="lead"><b>{{ item.nama }}</b></h2>
                                        <ul class="ml-4 mb-0 fa-ul text-muted">
                                            <li class="small mb-1">
                                                <span class="fa-li">
                                                    <i class="fas fa-lg fa-envelope"></i>
                                                </span>
                                                {{ item.email }}
                                            </li>
                                            <li class="small mb-1">
                                                <span class="fa-li">
                                                    <i class="fas fa-lg fa-map-marker-alt"></i>
                                                </span>
                                                {{ item.alamat }}
                                            </li>
                                            <li class="small mb-1">
                                                <span class="fa-li">
                                                    <i class="fas fa-lg fa-phone"></i>
                                                </span>
                                                {{ item.no_telp }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-5 text-center">
                                        <img src="../../assets/adminlte/dist/img/user1-128x128.jpg" alt="user-avatar"
                                            class="img-circle img-fluid">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="text-right">
                                    <!-- <a href="#" class="btn btn-sm btn-primary">
                                        <i class="fas fa-user"></i> View Profile
                                    </a> -->
                                    <RouterLink :to="'/listemployee/'+item.id" class="btn btn-sm btn-primary">
                                        <i class="fas fa-user"></i> View Profile
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.card-body -->
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { UseAppStore } from '../../stores/appStore';

const VarAppStore = UseAppStore();
const dataAllEmployee = ref([]);

const fetchData = async () => {
    try {
        const response = await VarAppStore.getDataAllEmployee();
        dataAllEmployee.value = response.data;
    } catch (error) {

    }
};

onMounted(async () => {
    await fetchData();
});
</script>