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
        <ContentHeader TextContentHeader="Daftar Makanan" />
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12" v-show="displayAll">
                <div class="card">
                  <div class="card-header">
                    <ButtonPlus @click="formData()" buttonType="button" />
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
                      <label class="custom-file-upload">
                        <input type="file" @change="uploadImage" ref="file" accept="image/*" />
                        <i class="fas fa-camera"></i>
                      </label>
                      <div class="text-center">

                        <div class="container mb-3">
                          <img v-if="inputImage == ''" :src="'http://127.0.0.1:8000/storage/image/products/default.jpg'"
                            alt="Avatar"  style="width:100%;border: 3px solid #555;border-radius: 5%;">
                          <img v-else :src="inputImage" alt="Avatar" style="width:100%;border: 3px solid #555;border-radius: 5%;">
                        </div>

                      </div>                
                      <FormInputBase labelText="Kode" v-model="dataInputFood.kode_produk"
                        :errorMessage="errorMessageValue?.kode_produk" inputType="text" />
                      <FormInputBase labelText="Nama" v-model="dataInputFood.nama_produk"
                        :errorMessage="errorMessageValue?.nama_produk" inputType="text" />
                      <FormInputTextArea labelText="Deskripsi" v-model="dataInputFood.deskripsi"
                        :errorMessage="errorMessageValue?.deskripsi" rowsLength="2" />
                      <FormInputBase labelText="Harga" v-model="dataInputFood.harga"
                        :errorMessage="errorMessageValue?.harga" inputType="number" />
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                      <div v-show="buttonAdd">
                        <ButtonGreen textButton="Tambah" @click="addDataFood" buttonType="button" class="mr-1" />
                        <ButtonBlue textButton="Kembali" @click="backToMenuFromAdd" buttonType="button" />
                      </div>
                      <div v-show="buttonUpdate">
                        <ButtonGreen textButton="Ubah" @click="updateDataFood" buttonType="button" class="mr-1" />
                        <ButtonBlue textButton="Kembali" @click="backToMenuFromEdit" buttonType="button" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
            <!-- /.row -->
          </div><!-- /.container-fluid -->

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
import Cookies from "js-cookie";

const VarAppStore = UseAppStore();
const dataAllFood = ref([]);
const errorMessageValue = ref({});
const inputImage = ref('');
const headers = {
  Authorization: `Bearer ${Cookies.get('token')}`
};
const config = {
    headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('token')}`
    }
};
let displayAll = ref(true);
let displayFormData = ref(false);
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
  const getImage = "http://127.0.0.1:8000/storage/image/products/" + row.gambar;
  inputImage.value = getImage;
};

const uploadImage = async (e) => {
    try {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            inputImage.value = e.target.result;
        };
        reader.readAsDataURL(image);
        dataInputFood.file = image;
    } catch (error) {

    }
};

const addDataFood = async () => {
  try {
    const response = await VarAppStore.storeDataFood(dataInputFood, config);
    if (response.status == 201) {
      fetchData();
      backToMenuFromAdd();
      emptyForm();
      emptyImage();
      emptyMessage();
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
    console.clear();
  }
};

const updateDataFood = async () => {
  try {
    const response = await VarAppStore.updateDataFood(dataInputFood.id, dataInputFood, config);
    if (response.status == 200) {
      fetchData();
      backToMenuFromEdit();
      emptyForm();
      emptyMessage();
      emptyImage();
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

const emptyImage = async () => {
    try {
        inputImage.value = '';
    } catch (error) {

    }
}

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
    emptyImage();
  } catch (error) {

  }
};

onMounted(async () => {
  await fetchData();
});
</script>
