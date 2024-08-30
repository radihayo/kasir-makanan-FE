<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <RouterLink class="nav-link" aria-current="page" to="/">Home</RouterLink>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <RouterLink class="nav-link" to="/about">About</RouterLink>
            </li>
        </ul>
        <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li v-if="levelUser=='user'" class="nav-item d-none d-sm-inline-block" style="margin-right: -10px;">
                <RouterLink class="nav-link" to="/orderlist"><i class="fas fa-shopping-cart"></i><span v-if="VarAppStore.totalData != 0 " class="badge badge-danger navbar-badge">{{ VarAppStore.totalData }}</span></RouterLink>
            </li>
            
            <!-- <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="badge badge-danger navbar-badge">{{ VarAppStore.totalData }}</span>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span class="dropdown-item dropdown-header">{{ VarAppStore.totalData }} Item</span>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-envelope mr-2"></i> 4 new messages
                        <span class="float-right text-muted text-sm">3 mins</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-users mr-2"></i> 8 friend requests
                        <span class="float-right text-muted text-sm">12 hours</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-file mr-2"></i> 3 new reports
                        <span class="float-right text-muted text-sm">2 days</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
            </li> -->

            <li class="nav-item dropdown">
                <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    class="nav-link dropdown-toggle"><i class="fas fa-user"></i></a>
                <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <li>
                        <RouterLink class="dropdown-item" to="/setting" v-if="levelUser=='user'">Pengaturan Akun</RouterLink>
                    </li>
                    <li>
                        <button type="submit" @click="logoutUser" class="dropdown-item">Logout</button>
                    </li>
                </div>
            </li>
        </ul>
    </nav>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { UseAppStore } from '../stores/appStore.js';
import Cookies from "js-cookie";

const levelUser = localStorage.getItem('userLoginLevel');
const VarAppStore = UseAppStore();
const router = useRouter();
const headers = {
    Authorization: `Bearer ${Cookies.get('token') }`,
};

const logoutUser = async () => {
    try {
        const response = await VarAppStore.logout({ headers });
        // localStorage.removeItem('token');
        Cookies.remove('token');
        localStorage.removeItem('userLoginIdUser');
        localStorage.removeItem('userLoginIdEmployee');
        localStorage.removeItem('userLoginName');
        localStorage.removeItem('userLoginPhoto');
        localStorage.removeItem('userLoginLevel');
        router.push('/login');
    } catch (error) {

    }
};


</script>