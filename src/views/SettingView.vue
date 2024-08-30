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
                        :src="'http://127.0.0.1:8000/storage/image/profile/'+item.foto" alt="User profile picture">
                    </div>
                    <h3 class="profile-username text-center mt-3 mb-3">{{ item.nama }}</h3>
                    <ButtonBlue textButton="Ubah Password" @click="formDataPassword"
                      buttonType="button" class="btn-block" />
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
                    <p class="text-muted" v-if="item.jenis_kelamin == 0">Laki - Laki</p>
                    <p class="text-muted" v-else-if="item.jenis_kelamin == 1">Perempuan</p>
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
        <div class="col-md-12" v-show="displayFormPassword">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Edit Password</h3>
            </div>
            <form @submit.prevent="changePasswordEmployee">
              <div class="card-body">
                <FormInputBase labelText="Password Lama" v-model="dataPasswordUserLogin.old_password"
                  :errorMessage="errorMessageValue?.old_password" inputType="password" />
                <FormInputBase labelText="Password Baru" v-model="dataPasswordUserLogin.new_password"
                  :errorMessage="errorMessageValue?.new_password" inputType="password" />
                <FormInputBase labelText="Re-Type Password Baru" v-model="dataPasswordUserLogin.re_new_password"
                  :errorMessage="errorMessageValue?.re_new_password" inputType="password" />
              </div>
              <div class="card-footer">
                <ButtonGreen textButton="Ubah" typeButton="submit" class="mr-1" />
                <ButtonBlue textButton="Kembali" @click="backToDetail" buttonType="button" />
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
import Cookies from "js-cookie";
const VarAppStore = UseAppStore();
const dataUserLogin = ref([]);
const errorMessageValue = ref({});
const headers = {
  Authorization: `Bearer ${Cookies.get('token')}`,
};

const displayFormPassword = ref(false);
const displayDetails = ref(true);
const idEmployee = localStorage.getItem('userLoginIdEmployee');
const idUser = localStorage.getItem('userLoginIdUser');

const dataPasswordUserLogin = reactive({
  old_password: '',
  new_password: '',
  re_new_password: ''
});

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataDetailEmployee(idEmployee, { headers })
    dataUserLogin.value = response.data;
  } catch (error) {

  }
};

const emptyMessage = async () => {
  try {
    errorMessageValue.value = '';
  } catch (error) {

  }
};

const formDataPassword = async () => {
  try {
    displayFormPassword.value = true;
    displayDetails.value = false;
  } catch (error) {

  }
};

const changePasswordEmployee = async () => {
  try {
    const response = await VarAppStore.changePasswordEmployee(idUser, dataPasswordUserLogin, { headers });
    if (response.status == 200) {
      fetchData();
      displayFormPassword.value = false;
      displayDetails.value = true;
      Swal.fire({
        title: "Password Berhasil Diubah",
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
    displayFormPassword.value = false;
    emptyMessage();
  } catch (error) {

  }
};

onMounted(async () => {
  await fetchData();
});
</script>