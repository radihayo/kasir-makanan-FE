<template>
    <ContentHeader TextContentHeader="Daftar Pegawai" />
    <section class="content">

        <!-- Default box -->
        <div class="card card-solid" v-show="displayAll">
            <div class="card-header">
                <ButtonBlue @click="formDataAdd" TextButton="Tambah Data" />
            </div>

            <!-- Card -->
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
                                        <img src="../assets/adminlte/dist/img/user1-128x128.jpg" alt="user-avatar"
                                            class="img-circle img-fluid">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="text-right">
                                    <ButtonRed TextButton="Hapus" @click="deleteDataEmployee(item.id, item.nama)"
                                        class="mr-1" />
                                    <ButtonBlue TextButton="Lihat" @click="selectEmployee(item.id)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile -->
        <div class="container-fluid" v-show="displayDetails">
            <div class="row" v-for="item in dataDetailEmployee">
                <div class="col-md-3">
                    <div class="card card-primary card-outline">
                        <div class="card-body box-profile">
                            <div class="text-center">
                                <img class="profile-user-img img-fluid img-circle"
                                    src="../assets/adminlte/dist/img/user4-128x128.jpg" alt="User profile picture">
                            </div>
                            <h3 class="profile-username text-center">{{ item.nama }}</h3>
                            <p class="text-muted text-center">Admin</p>
                            <!-- <a href="#" class="btn btn-primary btn-block"><b>Edit Data</b></a> -->
                            <div class="row">
                                <div class="col-sm-6">
                                    <ButtonBlue TextButton="Edit Data" class="btn-block" @click="formDataEdit(item.id)" />
                                </div>
                                <div class="col-sm-6">
                                    <ButtonGreen TextButton="Kembali" class="btn-block" @click="backToAllData" />
                                </div>
                            </div>
                        </div>                        
                    </div>                   
                </div>
                <div class="col-md-9">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Info Lengkap</h3>
                        </div>
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
                                <span class="tag tag-success">{{ item.tanggal_lahir }}</span>
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
                    </div>
                </div>
            </div>
        </div>

        <!-- Form -->
        <div class="col-md-12" v-show="displayFormData">
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title" v-show="displayButtonAdd">Tambah Data Pegawai</h3>
                    <h3 class="card-title" v-show="displayButtonEdit">Edit Data Pegawai</h3>
                </div>
                <form @submit.prevent>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="kode">Nama Pegawai</label>
                            <input type="text" v-model="dataInputEmployee.nama" class="form-control">
                            <span style="color: red; font-size: 12px;" v-if="errorMessage?.nama">{{ errorMessage.nama[0]}}</span>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="kode">Email</label>
                                    <input type="text" v-model="dataInputEmployee.email" class="form-control">
                                    <span style="color: red; font-size: 12px;" v-if="errorMessage?.email">{{
                                        errorMessage.email[0] }}</span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="kode">Jenis Kelamin</label>
                                    <select v-model="dataInputEmployee.jenis_kelamin" class="form-control"
                                        name="jenis_kelamin_edit" id="jenis_kelamin_edit">
                                        <option value="">--Pilih--</option>
                                        <option value="0">Laki - Laki</option>
                                        <option value="1">Perempuan</option>
                                    </select>
                                    <span style="color: red; font-size: 12px;" v-if="errorMessage?.jenis_kelamin">{{
                                        errorMessage.jenis_kelamin[0] }}</span>
                                    <!-- <input type="text" v-model="dataInputEmploye.jenis_kelamin" class="form-control"> -->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="kode">Tempat Lahir</label>
                                    <input type="text" v-model="dataInputEmployee.tempat_lahir" class="form-control">
                                    <span style="color: red; font-size: 12px;" v-if="errorMessage?.tempat_lahir">{{
                                        errorMessage.tempat_lahir[0] }}</span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="kode">Tanggal Lahir</label>
                                    <input type="date" v-model="dataInputEmployee.tanggal_lahir" class="form-control">
                                    <span style="color: red; font-size: 12px;" v-if="errorMessage?.tanggal_lahir">{{
                                        errorMessage.tanggal_lahir[0] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="kode">Agama</label>
                                    <select v-model="dataInputEmployee.agama" class="form-control">
                                        <option value="">--Pilih--</option>
                                        <option value="0">Islam</option>
                                        <option value="1">Kristen</option>
                                        <option value="2">Hindu</option>
                                        <option value="3">Buddha</option>
                                        <option value="4">Konghucu</option>
                                    </select>
                                    <span style="color: red; font-size: 12px;" v-if="errorMessage?.agama">{{
                                        errorMessage.agama[0] }}</span>
                                    <!-- <input type="text" v-model="dataInputEmploye.agama" class="form-control"> -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="kode">Nomor Telepon</label>
                                    <input type="number" v-model="dataInputEmployee.no_telp" class="form-control">
                                    <span style="color: red; font-size: 12px;" v-if="errorMessage?.no_telp">{{
                                        errorMessage.no_telp[0] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="kode">Alamat</label>
                            <input type="text" v-model="dataInputEmployee.alamat" class="form-control">
                            <span style="color: red; font-size: 12px;" v-if="errorMessage?.alamat">{{ errorMessage.alamat[0]
                            }}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div v-show="displayButtonAdd">
                            <ButtonGreen TextButton="Tambah" @click="addDataEmployee" class="mr-1" />
                            <ButtonBlue TextButton="Kembali" @click="backToAllData" />
                        </div>
                        <div v-show="displayButtonEdit">
                            <ButtonGreen TextButton="Ubah" @click="updateDataEmployee" class="mr-1" />
                            <ButtonBlue TextButton="Kembali" @click="backToDetail" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </section>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore';
import ContentHeader from '../components/ContentHeader.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import ButtonRed from '../components/button/ButtonRed.vue';


const VarAppStore = UseAppStore();
const dataAllEmployee = ref([]);
const dataDetailEmployee = ref([]);
const errorMessage = ref({});

const displayAll = ref(true);
const displayDetails = ref(false);
const displayFormData = ref(false);
const displayButtonAdd = ref(false);
const displayButtonEdit = ref(false);

const dataInputEmployee = reactive({
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
        const response = await VarAppStore.getDataAllEmployee();
        dataAllEmployee.value = response.data;
    } catch (error) {

    }
};

const emptyForm = async () => {
    try {
        dataInputEmployee.nama = '';
        dataInputEmployee.email = '';
        dataInputEmployee.jenis_kelamin = '';
        dataInputEmployee.tempat_lahir = '';
        dataInputEmployee.tanggal_lahir = '';
        dataInputEmployee.agama = '';
        dataInputEmployee.no_telp = '';
        dataInputEmployee.alamat = '';
    } catch (error) {

    }
};

const emptyMessage = async () => {
    try {
        errorMessage.value = '';
    } catch (error) {

    }
};

const backToHomeAndRefreshData = async () => {
    try {
        displayAll.value = true;
        displayDetails.value = false;
        displayFormData.value = false;
        displayButtonAdd.value = false;
        displayButtonEdit.value = false;
    } catch (error) {

    }
};

const selectEmployee = async (idData) => {
    try {
        displayDetails.value = true;
        displayAll.value = false;
        displayFormData.value = false;
        displayButtonAdd.value = false;
        displayButtonEdit.value = false;

        const response = await VarAppStore.getDataDetailEmployee(idData);
        dataDetailEmployee.value = response.data;
    } catch (error) {

    }
};

const formDataAdd = async () => {
    try {
        displayFormData.value = true;
        displayButtonAdd.value = true;
        displayButtonEdit.value = false;
        displayAll.value = false;
        displayDetails.value = false;
    } catch (error) {

    }
};

const addDataEmployee = async () => {
    try {
        const response = await VarAppStore.storeDataEmployee(dataInputEmployee);
        if (response.status == 201) {
            backToHomeAndRefreshData();
            emptyForm();
            emptyMessage();
            fetchData();
            Swal.fire({
                title: "Data " + response.data.data.nama + " Berhasil Ditambahkan",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Data Gagal Ditambahkan",
                icon: "error"
            });
        }
    } catch (error) {
        errorMessage.value = error.response.data.errors;
        console.clear();
    }
};

const formDataEdit = async (idData) => {
    try {
        displayFormData.value = true;
        displayButtonEdit.value = true;
        displayButtonAdd.value = false;
        displayAll.value = false;
        displayDetails.value = false;

        const response = await VarAppStore.getDataDetailEmployee(idData);
        Object.assign(dataInputEmployee, {
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
        const response = await VarAppStore.updateDataEmployee(dataInputEmployee.id, dataInputEmployee);
        if (response.status == 200) {
            backToHomeAndRefreshData();
            emptyForm();
            emptyMessage();
            fetchData();
            Swal.fire({
                title: "Data " + response.data.data.nama + " Berhasil Diubah",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Data Gagal Diubah",
                icon: "error"
            });
        }
    } catch (error) {
        errorMessage.value = error.response.data.errors;
        console.clear();
    }
};

const deleteDataEmployee = async (idData, namaData) => {
    try {
        await Swal.fire({
            title: "Hapus Data " + namaData + " ?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Data " + namaData + " Berhasil Dihapus",
                    icon: "success"
                }),VarAppStore.destroyDataEmployee(idData).then(response =>
                    fetchData()
                );
            }
        });
    } catch (error) {

    }
};

const backToAllData = async () => {
    try {
        displayAll.value = true;
        displayDetails.value = false;
        displayFormData.value = false;
        emptyMessage();
    } catch (error) {

    }
};

const backToDetail = async () => {
    try {
        displayDetails.value = true;
        displayAll.value = false;
        displayFormData.value = false;
        emptyForm();
        emptyMessage();
    } catch (error) {

    }
}

onMounted(async () => {
    await fetchData();
});
</script>