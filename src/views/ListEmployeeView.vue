<style scoped>
input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

.container {
    position: relative;
    width: 20%;
}
</style>
<template>
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                <ContentHeader TextContentHeader="Daftar Pegawai" />
                <section class="content">
                    <!-- Default box -->
                    <div class="card card-solid" v-show="displayAll">
                        <div class="card-header">
                            <button @click="formDataAdd" type="button" class="btn btn-default">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <!-- Card -->
                        <div class="card-body pb-0">
                            <div class="row" v-if="dataAllEmployee.data != ''">
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
                                                    <img v-if="item.foto == 'default.jpg'"
                                                        :src="'http://127.0.0.1:8000/storage/image/profile/default.jpg'"
                                                        alt="user-avatar" class="img-circle img-fluid">
                                                    <img v-if="item.foto != 'default.jpg'"
                                                        :src="'http://127.0.0.1:8000/storage/image/profile/' + item.foto"
                                                        alt="user-avatar" class="img-circle img-fluid">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <div class="text-right">
                                                <div class="btn-group">
                                                    <button @click="deleteDataEmployee(item.id, item.nama)" type="button"
                                                        class="btn btn-sm btn-default">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                    <button @click="resetPasswordEmployee(item.id, item.nama)"
                                                        type="button" class="btn btn-sm btn-default">
                                                        <i class="fas fa-sync"></i>
                                                    </button>
                                                    <button @click="formDataEdit(item.id)" type="button"
                                                        class="btn btn-sm btn-default">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button @click="selectEmployee(item.id)" data-toggle="modal"
                                                        data-target="#modal-default" type="button"
                                                        class="btn btn-sm btn-default">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-else>
                                <div class="text-center">
                                    Tidak Ada Data
                                </div>                                
                            </div>
                        </div>
                    </div>

                    <!-- modal -->
                    <ModalWindow id="modal-default" class="modal fade" textModal="Detail Pegawai">
                        <template #content>
                            <div class="modal-body">
                                <div class="card-body box-profile" v-for="item in dataDetailEmployee">
                                    <div class="text-center">
                                        <img class="profile-user-img img-fluid img-circle"
                                            :src="'http://127.0.0.1:8000/storage/image/profile/' + item.foto"
                                            alt="User profile picture">
                                    </div>
                                    <h3 class="profile-username text-center">{{ item.nama }}</h3>
                                    <ul class="list-group list-group-unbordered mb-3">
                                        <li class="list-group-item">
                                            <b>Email</b> <a class="float-right">{{ item.email }}</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Jenis Kelamin</b>
                                            <a class="float-right" v-if="item.jenis_kelamin == 0">Laki - Laki</a>
                                            <a class="float-right" v-else-if="item.jenis_kelamin == 1">Perempuan</a>
                                            <a class="float-right" v-else>Tidak Diketahui</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Tempat, Tanggal Lahir</b> <a class="float-right">{{ item.tempat_lahir
                                            }}, {{ moment(item.tanggal_lahir).format('DD/MM/YYYY') }}</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Agama</b>
                                            <a class="float-right" v-if="item.agama == 0">Islam</a>
                                            <a class="float-right" v-else-if="item.agama == 1">Kristen</a>
                                            <a class="float-right" v-else-if="item.agama == 2">Hindu</a>
                                            <a class="float-right" v-else-if="item.agama == 3">Buddha</a>
                                            <a class="float-right" v-else-if="item.agama == 4">Konghucu</a>
                                            <a class="float-right" v-else>Tidak Diketahui</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Nomor Telepon</b> <a class="float-right">{{ item.no_telp }}</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Alamat</b> <a class="float-right">{{ item.alamat }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                    </ModalWindow>

                    <!-- Form -->
                    <div class="col-md-12" v-show="displayFormData">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title" v-show="displayButtonAdd">Tambah Data Pegawai</h3>
                                <h3 class="card-title" v-show="displayButtonEdit">Edit Data Pegawai</h3>
                            </div>
                            <form @submit.prevent>
                                <div class="card-body">
                                    <label class="custom-file-upload">
                                        <input type="file" @change="uploadPhoto" ref="file" accept="image/*" />
                                        <i class="fas fa-camera"></i>
                                    </label>
                                    <div class="text-center">
                                        <div class="container mb-3">
                                            <img v-if="inputPhoto == ''"
                                                :src="'http://127.0.0.1:8000/storage/image/profile/default.jpg'"
                                                alt="Avatar" class="img-circle"
                                                style="width:100%;border: 3px solid #555;border-radius: 50%;">
                                            <img v-else :src="inputPhoto" alt="Avatar" class="img-circle"
                                                style="width:100%;border: 3px solid #555;border-radius: 50%;">
                                        </div>
                                    </div>
                                    <FormInputBase labelText="Nama Pegawai" v-model="dataInputEmployee.nama"
                                        :errorMessage="errorMessageValue?.nama" inputType="text" />
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <FormInputBase labelText="Email" v-model="dataInputEmployee.email"
                                                :error-message="errorMessageValue?.email" inputType="text" />
                                        </div>
                                        <div class="col-sm-6">
                                            <FormInputDropDown labelText="Jenis Kelamin"
                                                v-model="dataInputEmployee.jenis_kelamin" :options="listJenisKelamin"
                                                :errorMessage="errorMessageValue?.jenis_kelamin" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <FormInputBase labelText="Tempat Lahir" v-model="dataInputEmployee.tempat_lahir"
                                                :errorMessage="errorMessageValue?.tempat_lahir" inputType="text" />
                                        </div>
                                        <div class="col-sm-6">
                                            <FormInputBase labelText="Tanggal Lahir"
                                                v-model="dataInputEmployee.tanggal_lahir"
                                                :errorMessage="errorMessageValue.tanggal_lahir" inputType="date" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <FormInputDropDown labelText="Agama" v-model="dataInputEmployee.agama"
                                                :options="listAgama" :errorMessage="errorMessageValue?.agama" />
                                        </div>
                                        <div class="col-sm-6">
                                            <FormInputBase labelText="Nomor Telepon" v-model="dataInputEmployee.no_telp"
                                                :errorMessage="errorMessageValue?.no_telp" inputType="number" />
                                        </div>
                                    </div>
                                    <FormInputBase labelText="Alamat" v-model="dataInputEmployee.alamat"
                                        :errorMessage="errorMessageValue?.alamat" inputType="text" />
                                </div>
                                <div class="card-footer">
                                    <div v-show="displayButtonAdd">
                                        <ButtonGreen textButton="Tambah" @click="addDataEmployee" buttonType="button"
                                            class="mr-1" />
                                        <ButtonBlue textButton="Kembali" @click="backToMenuFromAdd" buttonType="button" />
                                    </div>
                                    <div v-show="displayButtonEdit">
                                        <ButtonGreen textButton="Ubah" @click="updateDataEmployee" buttonType="button"
                                            class="mr-1" />
                                        <ButtonBlue textButton="Kembali" @click="backToMenuFromEdit" buttonType="button" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <Footer />
</template>
<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
import { ref, reactive, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import moment from 'moment';
import ContentHeader from '../components/ContentHeader.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import FormInputBase from '../components/form/FormInputBase.vue';
import FormInputDropDown from '../components/form/FormInputDropDown.vue';
import ModalWindow from '../components/Modal.vue';
import Cookies from "js-cookie";

const VarAppStore = UseAppStore();
const dataAllEmployee = ref([]);
const dataDetailEmployee = ref([]);
const errorMessageValue = ref({});
const inputPhoto = ref('');
const headers = {
    Authorization: `Bearer ${Cookies.get('token')}`,
};
const config = {
    headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('token')}`
    }
};

const displayAll = ref(true);
const displayFormData = ref(false);
const displayButtonAdd = ref(false);
const displayButtonEdit = ref(false);

const dataPasswordReset = reactive({
    password_reset: 'user'
});

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

const dataInputEmployee = reactive({
    nama: '',
    email: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    file: '',
    agama: '',
    no_telp: '',
    alamat: ''
});

const uploadPhoto = async (e) => {
    try {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            inputPhoto.value = e.target.result;
        };
        reader.readAsDataURL(image);
        dataInputEmployee.file = image;
    } catch (error) {

    }
};

const fetchData = async () => {
    try {
        const response = await VarAppStore.getDataAllEmployee({ headers });
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
        errorMessageValue.value = '';
    } catch (error) {

    }
};

const emptyPhoto = async () => {
    try {
        inputPhoto.value = '';
    } catch (error) {

    }
}

const selectEmployee = async (idData) => {
    try {
        const response = await VarAppStore.getDataDetailEmployee(idData, { headers });
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
    } catch (error) {

    }
};

const addDataEmployee = async () => {
    try {
        const response = await VarAppStore.storeDataEmployee(dataInputEmployee, config);
        if (response.status == 200) {
            fetchData();
            backToMenuFromAdd();
            Swal.fire({
                title: "Data " + response.data.data_employee.nama + " Berhasil Ditambahkan",
                icon: "success"
            });
            emptyForm();
            emptyMessage();
            emptyPhoto();
        } else {
            Swal.fire({
                title: "Data Gagal Ditambahkan",
                icon: "error"
            });
        }
    } catch (error) {
        errorMessageValue.value = error.response.data.errors;
        console.clear();
    }
};

const formDataEdit = async (idData) => {
    try {
        displayFormData.value = true;
        displayButtonEdit.value = true;
        displayButtonAdd.value = false;
        displayAll.value = false;

        const response = await VarAppStore.getDataDetailEmployee(idData, { headers });
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
        const getPhoto = "http://127.0.0.1:8000/storage/image/profile/" + response.data.data.foto;
        inputPhoto.value = getPhoto;
    } catch (error) {

    }
};

const updateDataEmployee = async () => {
    try {
        const response = await VarAppStore.updateDataEmployee(dataInputEmployee.id, dataInputEmployee, config);
        if (response.status == 200) {
            backToMenuFromEdit();
            fetchData();
            Swal.fire({
                title: "Data " + response.data.data.nama + " Berhasil Diubah",
                icon: "success"
            });
            emptyForm();
            emptyMessage();
            emptyPhoto();
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
                }), VarAppStore.destroyDataEmployee(idData, { headers }).then(response =>
                    fetchData()
                );
            }
        });
    } catch (error) {

    }
};

const resetPasswordEmployee = async (idData, namaData) => {
    try {
        await Swal.fire({
            title: "Reset Password " + namaData + " ?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Password " + namaData + " Berhasil Direset",
                    icon: "success"
                }), VarAppStore.resetPasswordEmployee(idData, dataPasswordReset,{ headers }).then(response =>
                    fetchData()
                );
            }
        });
    } catch (error) {
    }
};

const backToMenuFromAdd = async () => {
    try {
        displayAll.value = true;
        displayFormData.value = false;
        emptyMessage();
    } catch (error) {

    }
};

const backToMenuFromEdit = async () => {
    try {
        displayAll.value = true;
        displayFormData.value = false;
        emptyForm();
        emptyMessage();
        emptyPhoto();
    } catch (error) {

    }
};

onMounted(async () => {
    await fetchData();
});
</script>