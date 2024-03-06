<template>
  <Navbar />
  <Sidebar />
  <div class="content-wrapper">
    <div class="content">
      <div class="container-fluid">
        <ContentHeader TextContentHeader="Daftar Makanan" />
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12" v-show="displayAll">
                <div class="card">
                  <div class="card-header">
                    <ButtonPlus @click="formData()" />
                  </div>
                  <Table :columns="columnsFood" :rows="dataAllFood" :onEditRow="editRow" :onDeleteRow="deleteDataFood" />
                </div>
                <!-- /.card -->
              </div>
              <!-- /.col -->
              <div class="col-md-12" v-show="displayFormData">
                <!-- general form elements -->
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title" v-show="buttonAdd">Tambah Data Makanan</h3>
                    <h3 class="card-title" v-show="!buttonAdd">Edit Data Makanan</h3>
                  </div>
                  <!-- form start -->
                  <form @submit.prevent>
                    <div class="card-body">
                      <FormInputBase labelText="Kode" v-model="dataInputFood.kode_produk"
                        :errorMessage="errorMessageValue?.kode_produk" inputType="number" />
                      <FormInputBase labelText="Nama" v-model="dataInputFood.nama_produk"
                        :errorMessage="errorMessageValue?.nama_produk" inputType="text" />
                      <FormInputTextArea labelText="Deskripsi" v-model="dataInputFood.deskripsi"
                        :errorMessage="errorMessageValue?.deskripsi" rowsLength="2" />
                      <div class="form-group">
                        <label for="gambar">Gambar</label>
                        <!-- <button @click="showModal">Add Image</button> -->
                        <!-- <div class="input-group">
                    <div class="custom-file">
                      <input type="file" @change="uploadImage" class="custom-file-input">
                      <label class="custom-file-label" for="gambar">Choose file</label>
                    </div>
                    <div class="input-group-append">
                      <button class="input-group-text" data-toggle="modal" data-target="#modal-default">Upload</button>

                    </div>
                  </div> -->
                        <!-- <button @click="showModal">Upload</button> -->
                        <input type="file" @change="uploadImageNotEdit" class="form-control" ref="file">
                        <!-- <div class="input-group">
                    <div class="custom-file">
                      <input type="file" @change="uploadImage" class="custom-file-input">
                      <label class="custom-file-label" for="gambar">Choose file</label>
                    </div>
                    <div class="input-group-append">
                      <span class="input-group-text">Upload</span>
                    </div>
                  </div> -->
                        <span style="color: red; font-size: 12px;" v-if="errorMessageValue?.file">{{
                          errorMessageValue.file[0] }}</span>
                      </div>
                      <FormInputBase labelText="Harga" v-model="dataInputFood.harga"
                        :errorMessage="errorMessageValue?.harga" inputType="number" />
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                      <div v-show="buttonAdd">
                        <ButtonGreen textButton="Tambah" @click="addDataFood" class="mr-1" />
                        <ButtonBlue textButton="Kembali" @click="backToMenuFromAdd" />
                      </div>
                      <div v-show="buttonUpdate">
                        <ButtonGreen textButton="Ubah" @click="updateDataFood" class="mr-1" />
                        <ButtonBlue textButton="Kembali" @click="backToMenuFromEdit" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
            <!-- /.row -->
          </div><!-- /.container-fluid -->

          <ModalWindow v-show="displayModal" textModal="Upload Foto" @modal-close="closeModal">
            <template #content>
              <div class="modal-body">
                <cropper ref="cropper" :src="inputImage" class="cropper" :stencil-props="{
                  handlers: {},
                  movable: false,
                  resizable: false,
                  aspectRatio: 1,
                }" :resize-image="{
  adjustStencil: false
}" image-restriction="stencil" />
              </div>
            </template>
            <template #footer>
              <button type="button" class="btn btn-primary" @click="saveCroppedImage">Simpan</button>
            </template>
          </ModalWindow>
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
import ContentHeader from '../components/ContentHeader.vue';
import Table from '../components/Table.vue';
import ButtonPlus from '../components/button/ButtonPlus.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import FormInputBase from '../components/form/FormInputBase.vue';
import FormInputTextArea from '../components/form/FormInputTextArea.vue';

import ModalWindow from '../components/Modal.vue';

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const VarAppStore = UseAppStore();
const dataAllFood = ref([]);
const inputImage = ref('');
const errorMessageValue = ref({});
// const cropper = ref();
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`
};

let displayAll = ref(true);
let displayFormData = ref(false);
let displayModal = ref(false);
let buttonAdd = ref(true);
let buttonUpdate = ref(false);

const columnsFood = ref([
  {
    label: "Kode",
    field: "kode_produk",
  },
  {
    label: "Nama",
    field: "nama_produk",
  },
  {
    label: "Deskripsi",
    field: "deskripsi",
  },
  {
    label: "Gambar",
    field: "gambar",
  },
  {
    label: "Harga",
    field: "harga",
  },
  {
    label: "Aksi",
    field: "aksi",
  }
]);

const dataInputFood = reactive({
  kode_produk: '',
  nama_produk: '',
  deskripsi: '',
  file: '',
  harga: '',
});

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataAllFood({ headers });
    dataAllFood.value = response.data.data;
  } catch (error) {
  }
};

const emptyForm = async () => {
  try {
    dataInputFood.kode_produk = '',
      dataInputFood.nama_produk = '',
      dataInputFood.deskripsi = '',
      dataInputFood.file = '',
      dataInputFood.harga = ''
  } catch (error) {

  }
};

const emptyMessage = async () => {
  try {
    errorMessageValue.value = '';
  } catch (error) {

  }
};

const formData = async () => {
  try {
    displayAll.value = false;
    displayFormData.value = true;
  } catch (error) {
  }
};

const editRow = (row) => {
  Object.assign(dataInputFood, {
    ...row,
    id: row.id,
  });
  displayAll.value = false;
  displayFormData.value = true;
  buttonAdd.value = false;
  buttonUpdate.value = true;
};

const uploadImage = async (e) => {
  try {
    displayModal.value = true;
    // tampil.value = true;
    // const image = e.target.files[0];
    // inputImage.value = image;
    // Imgurl = URL.createObjectURL(file);
    // dataInputFood.file = images;
    const image = e.target.files;
    const reader = new FileReader();
    reader.onload = (e) => {
      inputImage.value = e.target.result;
    };
    reader.readAsDataURL(image[0]);
  } catch (error) {

  }
};

const uploadImageNotEdit = async (e) => {
  try {
    const image = e.target.files[0];
    dataInputFood.file = image;
  } catch (error) {

  }
};

const saveCroppedImage = async () => {
  try {
    console.log(cropper);
    const canvas = cropper.value.getResult();
    // const { canvas } = this.$refs.cropper.getResult();
    // const canvas = refs.cropper.getResult();
    // dataInputFood.file = canvas;

    console.log(dataInputFood);

    // let arr = inputImage.value.split(","),
    // mime = arr[0].match(/:(.*?):/)[1],
    // bstr = atob(arr[1]),
    // n = bstr.length,
    // u8arr = new Uint8Array(n);
    // while (n--){
    //   u8arr[n] = bstr.charCodeAt(n);
    // }
    // let file = new File([u8arr],"coba.png",{type:mime});
    // emit("isEmit",file);
    // console.log(file);
  } catch (error) {

  }
};

const closeModal = async () => {
  try {
    displayModal.value = false;
  } catch (error) {
  }
};

const addDataFood = async () => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await VarAppStore.storeDataFood(dataInputFood, config);
    if (response.status == 201) {
      emptyForm();
      backToMenuFromAdd();
      fetchData();
      Swal.fire({
        title: "Data " + response.data.data.nama_produk + " Berhasil Ditambahkan",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Data " + response.data.data.nama_produk + " Gagal Ditambahkan",
        icon: "error"
      });
    }
  } catch (error) {
    errorMessageValue.value = error.response.data.errors;
    // console.clear();
  }
};

const updateDataFood = async () => {
  try {
    const response = await VarAppStore.updateDataFood(dataInputFood.id, dataInputFood, { headers });
    if (response.status == 200) {
      emptyForm();
      backToMenuFromEdit();
      fetchData();
      Swal.fire({
        title: "Data " + response.data.data.nama_produk + " Berhasil Diubah",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Data " + response.data.data.nama_produk + " Gagal Ditambahkan",
        icon: "error"
      });
    }
  } catch (error) {
    errorMessageValue.value = error.response.data.errors;
    console.clear();
  }
};

const deleteDataFood = async (row) => {
  try {
    // const response = await VarAppStore.destroyDataFood(row.id);
    await Swal.fire({
      title: "Hapus Data " + row.nama_produk + " ?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Data " + row.nama_produk + " Berhasil Dihapus",
          icon: "success"
        }), VarAppStore.destroyDataFood(row.id, { headers }).then(response =>
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
    buttonAdd.value = true;
    buttonUpdate.value = false;
    emptyMessage();
  } catch (error) {

  }
};

const backToMenuFromEdit = async () => {
  try {
    displayAll.value = true;
    displayFormData.value = false;
    buttonAdd.value = true;
    buttonUpdate.value = false;
    emptyMessage();
    emptyForm();
  } catch (error) {

  }
};

onMounted(async () => {
  await fetchData();
});
</script>
<style scoped>
.cropper {
  height: 300px;
  width: 300px;
  background: #DDD;
  margin: auto;
}</style>