<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row" v-for="item in dataDetailEmployee">
                <div class="col-md-3">
                    <!-- Profile Image -->
                    <div class="card card-primary card-outline">
                        <div class="card-body box-profile">
                            <div class="text-center">
                                <img class="profile-user-img img-fluid img-circle"
                                    src="../../assets/adminlte/dist/img/user4-128x128.jpg" alt="User profile picture">
                            </div>
                            <h3 class="profile-username text-center">{{ item.nama }}</h3>
                            <p class="text-muted text-center">Admin</p>
                            <a href="#" class="btn btn-primary btn-block"><b>Edit Data</b></a>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Info Lengkap</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <strong><i class="fas fa-envelope mr-1"></i>Email</strong>
                            <p class="text-muted">
                                {{ item.email }}
                            </p>
                            <hr>
                            <strong><i class="fas fa-venus-mars mr-1"></i>Jenis Kelamin</strong>
                            <p class="text-muted" v-if="item.jenis_kelamin==0">Laki - Laki</p>
                            <p class="text-muted" v-else-if="item.jenis_kelamin==1">Perempuan</p>
                            <hr>    
                            <strong><i class="fas fa-birthday-cake mr-1"></i>Tempat Tanggal Lahir</strong>
                            <p class="text-muted">
                                <span class="tag tag-danger">{{ item.tempat_lahir }}, </span>
                                <span class="tag tag-success">{{ item.tanggal_lahir }}</span>
                            </p>
                            <hr>
                            <strong><i class="fas fa-praying-hands mr-1"></i>Agama</strong>
                            <p class="text-muted" v-if="item.agama==0">Islam</p>
                            <p class="text-muted" v-else-if="item.agama==1">Kristen</p>
                            <p class="text-muted" v-else-if="item.agama==2">Hindu</p>
                            <p class="text-muted" v-else-if="item.agama==3">Buddha</p>
                            <p class="text-muted" v-else-if="item.agama==4">Konghucu</p>
                            <hr>
                            <strong><i class="fas fa-phone-square-alt mr-1"></i>Nomor Telepon</strong>
                            <p class="text-muted">{{ item.no_telp }}</p>
                            <hr>
                            <strong><i class="fas fa-map-marker-alt mr-1"></i>Alamat</strong>
                            <p class="text-muted">{{ item.alamat }}</p>
                        </div>
                        <!-- /.card-body -->
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
import { UseAppStore } from '../../stores/appStore.ts';

const VarAppStore = UseAppStore();
const dataDetailEmployee = ref([]);
const url = window.location.href;
const idData = url.split("/").slice(-1)[0];

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataDetailEmployee(idData);
    dataDetailEmployee.value = response.data
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchData();
});
</script>