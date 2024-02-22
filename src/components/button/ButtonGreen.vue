<template>
    <button type="button" @click="actionButton" class="btn btn-success">{{ TextButton }}</button>
</template>
<script setup>
// import { defineEmits } from 'vue';
const props = defineProps(['TextButton']);
const emit = defineEmits(['actionButton']);

// const actionButton = () => {
//   emit('click');
// };
</script>
<!-- <script>
export default {
  props: {
    TextButton: {
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