<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a class="brand-link">
      <img src="../assets/adminlte/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>
    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img v-if="photoUser=='default.jpg'" :src="'http://127.0.0.1:8000/storage/image/profile/default.jpg'" class="img-circle elevation-2" alt="User Image">
          <img v-if="photoUser!='default.jpg'" :src="'http://127.0.0.1:8000/storage/image/profile/'+photoUser" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a class="d-block">{{ nameUser }}</a>
        </div>
      </div>
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/menu" v-if="levelUser=='user'">
              <i class="nav-icon fas fa-bars"></i>
              <p>
                Menu Makanan
              </p>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="levelUser=='admin'">
            <RouterLink class="nav-link" to="/listfood">
              <i class="nav-icon fas fa-utensils"></i>
              <p>
                Daftar Makanan
              </p>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="levelUser=='admin'">
            <RouterLink class="nav-link" to="/transaction">
              <i class="nav-icon fas fa-list-ol"></i>
              <p>
                Daftar Transaksi
              </p>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="levelUser=='admin'">
            <RouterLink class="nav-link" to="/listemployee">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Daftar Pegawai
              </p>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="levelUser=='user'">
            <RouterLink class="nav-link" to="/setting">
              <i class="nav-icon fas fa-user-alt"></i>
              <p>
                Pengaturan Akun
              </p>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script setup>
const nameUser = localStorage.getItem('userLoginName');
const levelUser = localStorage.getItem('userLoginLevel');
const photoUser = localStorage.getItem('userLoginPhoto');
</script>