<template>
  <body class="hold-transition login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <h1><b>Admin</b>LTE</h1>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form @submit.prevent="loginUser">
            <div class="row mb-3">
              <div class="input-group">
                <input type="text" class="form-control" v-model="username" placeholder="Username">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <span style="color: red; font-size: 12px;" v-if="errorMessage?.username">{{
                errorMessage.username[0] }}</span>
            </div>
            <div class="row mb-3">
              <div class="input-group">
                <input type="password" class="form-control" v-model="password" placeholder="Password">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <span style="color: red; font-size: 12px;" v-if="errorMessage?.password">{{
                errorMessage.password[0] }}</span>
            </div>
            <div class="row mb-3">
              <div class="input-group">
                <!-- <button type="submit" @click="loginUser" class="btn btn-primary btn-block">Log In</button> -->
                <ButtonBlue textButton="Log In" buttonType="submit" class="btn-block"/>
              </div>
            </div>
          </form>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.login-box -->
  </body>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { UseAppStore } from '../stores/appStore.js';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import Cookies from "js-cookie";

const VarAppStore = UseAppStore();
const router = useRouter();
const username = ref('');
const password = ref('');
// const dataUserLogin = ref();
const dataInputLogin = reactive({
  username: '',
  password: ''
});

const errorMessage = ref({});

const loginUser = async () => {
  try {
    const response = await VarAppStore.login({ username: username.value, password: password.value });
    // dataUserLogin.value = {
    //   id:response.data.user.employee_data.id,
    //   nama:response.data.user.employee_data.nama,
    //   email:response.data.user.employee_data.email,
    //   alamat:response.data.user.employee_data.alamat,
    //   jenis_kelamin:response.data.user.employee_data.jenis_kelamin,
    //   tempat_lahir:response.data.user.employee_data.tempat_lahir,
    //   tanggal_lahir:response.data.user.employee_data.tanggal_lahir,
    //   agama:response.data.user.employee_data.agama,
    //   no_telp:response.data.user.employee_data.no_telp,
    //   lavel:response.data.user.role_data.role
    // };
    // localStorage.setItem('token', response.data.access_token);
    Cookies.set('token', response.data.access_token, { expires: 1 });
    localStorage.setItem('userLoginIdUser', response.data.user.id);
    localStorage.setItem('userLoginIdEmployee', response.data.user.employee_data.id);
    localStorage.setItem('userLoginName', response.data.user.employee_data.nama);
    localStorage.setItem('userLoginPhoto', response.data.user.employee_data.foto);
    localStorage.setItem('userLoginLevel', response.data.user.role_data.role);
    // localStorage.setItem('data_user_login', JSON.stringify(dataUserLogin));
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = error.response.data.errors;
    // console.clear();
  }
};
</script>