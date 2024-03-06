<template>
    <button type="button" @click="actionButton" class="btn btn-success">{{ textButton }}</button>
</template>
<script setup>
// import { defineEmits } from 'vue';
const props = defineProps(['textButton']);
const emit = defineEmits(['actionButton']);

// const actionButton = () => {
//   emit('click');
// };
</script>
<!-- <script>
export default {
  props: {
    textButton: {
      type: String
    }
  },
  methods: {
    actionButton() {
      this.$emit('click');
    }
  }
}
</script> -->