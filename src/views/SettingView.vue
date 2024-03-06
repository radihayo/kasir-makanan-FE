<template>
      <Navbar />
      <Sidebar />
      <div class="content-wrapper">
        <div class="content">
          <div class="container-fluid">
            <ContentHeader TextContentHeader="Pengaturan Akun" />
            <section class="content" v-show="displayDetails">
              <div class="container-fluid">
                <div class="row" v-for="item in dataUserLogin">
                  <div class="col-md-3">
                    <!-- Profile Image -->
                    <div class="card card-primary card-outline">
                      <div class="card-body box-profile">
                        <div class="text-center">
                          <img class="profile-user-img img-fluid img-circle"
                            src="../assets/adminlte/dist/img/user4-128x128.jpg" alt="User profile picture">
                        </div>
                        <h3 class="profile-username text-center">{{ item.nama }}</h3>
                        <p class="text-muted text-center">{{ levelUserLogin }}</p>
                        <!-- <a href="#" class="btn btn-primary btn-block"><b>Edit Data</b></a> -->
                        <ButtonBlue textButton="Edit Data" class="btn-block" @click="formDataEdit(item.id)" />
                      </div>
                      <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
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
                        <p class="text-muted" v-if="item.jenis_kelamin == 0">Laki - Laki</p>
                        <p class="text-muted" v-else-if="item.jenis_kelamin == 1">Perempuan</p>
                        <!-- <p class="text-muted">{{ item.jenis_kelamin }}</p> -->
                        <hr>
                        <strong><i class="fas fa-birthday-cake mr-1"></i>Tempat Tanggal Lahir</strong>
                        <p class="text-muted">
                          <span class="tag tag-danger">{{ item.tempat_lahir }}, </span>
                          <span class="tag tag-success">{{ moment(item.tanggal_lahir).format('DD/MM/YYYY') }}</span>
                        </p>
                        <hr>
                        <strong><i class="fas fa-praying-hands mr-1"></i>Agama</strong>
                        <p class="text-muted" v-if="item.agama == 0">Islam</p>
                        <p class="text-muted" v-else-if="item.agama == 1">Kristen</p>
                        <p class="text-muted" v-else-if="item.agama == 2">Hindu</p>
                        <p class="text-muted" v-else-if="item.agama == 3">Buddha</p>
                        <p class="text-muted" v-else-if="item.agama == 4">Konghucu</p>
                        <!-- <p class="text-muted">{{ item.agama }}</p> -->
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

            <!-- form -->
            <div class="col-md-12" v-show="displayFormData">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Edit Data Pegawai</h3>
                </div>
                <form @submit.prevent>
                  <div class="card-body">
                    <FormInputBase labelText="Nama Pegawai" v-model="dataLoginUser.nama"
                      :errorMessage="errorMessageValue?.nama" inputType="text" />
                    <div class="row">
                      <div class="col-sm-6">
                        <FormInputBase labelText="Email" v-model="dataLoginUser.email"
                          :error-message="errorMessageValue?.email" inputType="text" />
                      </div>
                      <div class="col-sm-6">
                        <FormInputDropDown labelText="Jenis Kelamin" v-model="dataLoginUser.jenis_kelamin"
                          :options="listJenisKelamin" :errorMessage="errorMessageValue?.jenis_kelamin" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <FormInputBase labelText="Tempat Lahir" v-model="dataLoginUser.tempat_lahir"
                          :errorMessage="errorMessageValue?.tempat_lahir" inputType="text" />
                      </div>
                      <div class="col-sm-6">
                        <FormInputBase labelText="Tanggal Lahir" v-model="dataLoginUser.tanggal_lahir"
                          :errorMessage="errorMessageValue.tanggal_lahir" inputType="date" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <FormInputDropDown labelText="Agama" v-model="dataLoginUser.agama" :options="listAgama"
                          :errorMessage="errorMessageValue?.agama" />
                      </div>
                      <div class="col-sm-6">
                        <FormInputBase labelText="Nomor Telepon" v-model="dataLoginUser.no_telp"
                          :errorMessage="errorMessageValue?.no_telp" inputType="number" />
                      </div>
                    </div>
                    <FormInputBase labelText="Alamat" v-model="dataLoginUser.alamat"
                      :errorMessage="errorMessageValue?.alamat" inputType="text" />
                  </div>
                  <div class="card-footer">
                    <ButtonGreen textButton="Ubah" @click="updateDataEmployee" class="mr-1" />
                    <ButtonBlue textButton="Kembali" @click="backToDetail" />
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
</template>
<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
import ContentHeader from '../components/ContentHeader.vue';
import { UseAppStore } from '../stores/appStore.js';
import { ref, reactive, onMounted } from 'vue';
import moment from 'moment';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import FormInputBase from '../components/form/FormInputBase.vue';
import FormInputDropDown from '../components/form/FormInputDropDown.vue';

const VarAppStore = UseAppStore();
const dataUserLogin = ref([]);
const levelUserLogin = localStorage.getItem('userLoginLevel');
const errorMessageValue = ref({});
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const displayFormData = ref(false);
const displayDetails = ref(true);

const listJenisKelamin = reactive({
  0: 'Laki - Laki',
  1: 'Perempuan'
});

const listAgama = reactive({
  0: 'Islam',
  1: 'Kristen',
  2: 'Hindu',
  3: 'Buddha',
  4: 'Konghucu'
});

const dataLoginUser = reactive({
  nama: '',
  email: '',
  jenis_kelamin: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  agama: '',
  no_telp: '',
  alamat: ''
});

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataDetailEmployee(localStorage.getItem('userLoginId'), { headers })
    dataUserLogin.value = response.data;
  } catch (error) {

  }
};

const emptyForm = async () => {
  try {
    dataLoginUser.nama = '';
    dataLoginUser.email = '';
    dataLoginUser.jenis_kelamin = '';
    dataLoginUser.tempat_lahir = '';
    dataLoginUser.tanggal_lahir = '';
    dataLoginUser.agama = '';
    dataLoginUser.no_telp = '';
    dataLoginUser.alamat = '';
  } catch (error) {

  }
};

const emptyMessage = async () => {
  try {
    errorMessageValue.value = '';
  } catch (error) {

  }
};

const formDataEdit = async (idData) => {
  try {
    displayFormData.value = true;
    displayDetails.value = false;
    const response = await VarAppStore.getDataDetailEmployee(idData, { headers });
    Object.assign(dataLoginUser, {
      id: response.data.data.id,
      nama: response.data.data.nama,
      email: response.data.data.email,
      jenis_kelamin: response.data.data.jenis_kelamin,
      tempat_lahir: response.data.data.tempat_lahir,
      tanggal_lahir: response.data.data.tanggal_lahir,
      agama: response.data.data.agama,
      no_telp: response.data.data.no_telp,
      alamat: response.data.data.alamat
    });
  } catch (error) {

  }
};

const updateDataEmployee = async () => {
  try {
    const response = await VarAppStore.updateDataEmployee(dataLoginUser.id, dataLoginUser, { headers });
    if (response.status == 200) {
      fetchData();
      displayFormData.value = false;
      displayDetails.value = true;
      Swal.fire({
        title: "Data " + response.data.data.nama + " Berhasil Diubah",
        icon: "success"
      });
      emptyForm();
      emptyMessage();
    } else {
      Swal.fire({
        title: "Data Gagal Diubah",
        icon: "error"
      });
    }
  } catch (error) {
    errorMessageValue.value = error.response.data.errors;
    console.clear();
  }
};

const backToDetail = async () => {
  try {
    displayDetails.value = true;
    displayFormData.value = false;
    emptyForm();
    emptyMessage();
  } catch (error) {

  }
};

onMounted(async () => {
  await fetchData();
});
</script>