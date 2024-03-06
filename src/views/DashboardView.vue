<template>
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                halaman dashboard
            </div>
        </div>
    </div>
    <Footer />
</template>
<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue'
// import { RouterView } from 'vue-router';

// export default {
//     components: {
//         Navbar,
//         Sidebar,
//         Footer
//     }
// }
</script>
<!-- <style>
.router-link-exact-active {
    font-weight: bold;
}
</style> -->