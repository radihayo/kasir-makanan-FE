<template>
  <ContentHeader TextContentHeader="Daftar Makanan" />
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12" v-show="displayAll">
          <div class="card">
            <!-- <cropper
	:src="img"
  class="cropper"
	:stencil-props="{
		handlers: {},
		movable: false,
		resizable: false,
		aspectRatio: 1,
	}"
	:resize-image="{
		adjustStencil: false
	}"
	image-restriction="stencil"
/> -->
            <div class="card-header">
              <ButtonPlus @click="formData()" />
            </div>
            <!-- <vue-good-table :line-numbers="true" :columns="columnsFood" :rows="dataAllFood" :pagination-options="{ enabled: true }"
              :search-options="{ enabled: true }">
              <template #table-row="tableAllFood">
                <span v-if="tableAllFood.column.field == 'aksi'">
                  <ButtonBlue TextButton="Edit" @click="formData2(tableAllFood.row.id)" class="mr-1 mb-1"/>
                  <ButtonRed TextButton="Delete" @click="deleteDataFood(tableAllFood.row.id)" class="mb-1"/>
                </span>
                <span v-else-if="tableAllFood.column.field == 'tersedia'">
                  <span v-if="tableAllFood.row.tersedia == '0'">
                    Tersedia
                  </span>
                  <span v-else>
                    Tidak Tersedia
                  </span>
                </span>
                <span v-else>
                  {{ tableAllFood.formattedRow[tableAllFood.column.field] }}
                </span>
              </template>
            </vue-good-table> -->
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
                <div class="form-group">
                  <label for="kode">Kode</label>
                  <input type="text" v-model="dataInputFood.kode_produk" class="form-control">
                </div>
                <div class="form-group">
                  <label for="nama">Nama</label>
                  <input type="text" v-model="dataInputFood.nama_produk" class="form-control">
                </div>
                <div class="form-group">
                  <label for="deskripsi">Deskripsi</label>
                  <textarea type="text" v-model="dataInputFood.deskripsi" class="form-control"></textarea>
                </div>
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
                  <input type="file" @change="uploadImage" class="form-control" ref="file">
                  <!-- <div class="input-group">
                    <div class="custom-file">
                      <input type="file" @change="uploadImage" class="custom-file-input">
                      <label class="custom-file-label" for="gambar">Choose file</label>
                    </div>
                    <div class="input-group-append">
                      <span class="input-group-text">Upload</span>
                    </div>
                  </div> -->
                </div>
                <div class="form-group">
                  <label for="harga">Harga</label>
                  <input type="text" v-model="dataInputFood.harga" class="form-control">
                </div>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                <ButtonGreen TextButton="Tambah" v-show="buttonAdd" @click="addDataFood" class="mr-1" />
                <ButtonGreen TextButton="Ubah" v-show="!buttonAdd" @click="updateDataFood" class="mr-1" />
                <ButtonBlue TextButton="Kembali" @click="backToMenu" />
              </div>
            </form>
          </div>
        </div>

      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
    <ModalWindow v-show="displayModal" TextModal="Upload Foto" @saveData="saveCroppedImage" @modal-close="closeModal">
      <template #content>
        <div class="modal-body">
          <cropper ref="cropper" :src="inputImage" class="cropper" :stencil-props="{
          handlers: {},
          movable: false,
          resizable: false,
          aspectRatio: 1,
          }"
          :resize-image="{
          adjustStencil: false
          }" 
          image-restriction="stencil"/>
        </div>
      </template>
      <!-- <template #footer>
        <button type="button" class="btn btn-primary" @click="saveCroppedImage">Simpan</button>
      </template> -->
    </ModalWindow>
  </section>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { UseAppStore } from '../stores/appStore.js';
import ContentHeader from '../components/ContentHeader.vue';
import Table from '../components/Table.vue';
import ButtonPlus from '../components/button/ButtonPlus.vue';
import ButtonGreen from '../components/button/ButtonGreen.vue';
import ButtonBlue from '../components/button/ButtonBlue.vue';
import ButtonGrey from '../components/button/ButtonGrey.vue';

import ModalWindow from '../components/Modal.vue';

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const VarAppStore = UseAppStore();
const dataAllFood = ref([]);
const inputImage = ref('');
// const cropper = ref('');

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
    label: "Tersedia",
    field: "tersedia",
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
  tersedia: '1'
});

const fetchData = async () => {
  try {
    const response = await VarAppStore.getDataAllFood();
    dataAllFood.value = response.data.data;
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


const saveCroppedImage = async () => {
  try {
    // const result = cropper.value.getResult();
    const { canvas } = this.$refs.cropper.getResult();
    // const result = cropper.getResult();
    dataInputFood.file = canvas;

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

const showModal = async () => {
  try {
    displayModal.value = true;
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
      }
    };
    const response = await VarAppStore.storeDataFood(dataInputFood, config);

  } catch (error) {

  }
};

const updateDataFood = async () => {
  try {
    const response = await VarAppStore.updateDataFood(dataInputFood.id, dataInputFood)
  } catch (error) {

  }
};

const deleteDataFood = async (row) => {
  try {
    const response = await VarAppStore.destroyDataFood(row.id);
  } catch (error) {

  }
};

const backToMenu = async () => {
  try {
    displayAll.value = true;
    displayFormData.value = false;
    buttonAdd.value = true;
    buttonUpdate.value = false;
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
}
</style>