<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  
  <v-card width="auto">
      <div class="example">
        <cropper ref="cropper" class="example-cropper" :src="image" />
        <drop-zone
          v-model="image"
          :label="upload"
          :location="location"
          @uploaded="newImagesUploaded"
          class="pb-15"
        />
        <div class="button-wrapper">
          <span class="button" @click="cropImage">Crop image</span>
        </div>
      </div></v-card>
      <!-- <cropper
	class="cropper"
	:src="img"
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
</template>


<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  name: "vueImageCropperExample",
  components: {
    Cropper
  },
  props: {},
  data() {
    return {
      image:
        "https://images.pexels.com/photos/4218687/pexels-photo-4218687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    };
  },
  methods: {
    cropImage() {
      const result = this.$refs.cropper.getResult();
      console.log(result);
      const newTab = window.open();
      // for testing open the result in a new tab
      newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
        "image/jpeg"
      )}"></img>`;
    }
  }
};
</script>
<!-- <script setup>
import {ref} from 'vue';
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

// const cropper = ref();
const cropImage = async () => {
  try {
    // const result = cropper.value.getResult();
    const result = $refs.cropper.getResult();
    const newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
        "image/jpeg"
      )}"></img>`;
  } catch (error) {
    
  }
}
</script> -->

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.cropper {
	height: 300px;
	width: 300px;
	background: #DDD;
}
.example-cropper {
      border: solid 1px #eee;
      min-height: 300px;
      width: 100%;
      height: 85vh;
    }
    
    .button-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 17px;
    }
    
    .button {
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      background: #35b392;
      cursor: pointer;
      transition: background 0.5s;
      font-family: Open Sans, Arial;
      margin: 0 10px;
    }
    
    .button:hover {
      background: #38d890;
    }
    
    .button input {
      display: none;
    }
</style>
