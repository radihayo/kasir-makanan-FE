<template>
    <button :type="buttonType" class="btn btn-success">{{ textButton }}</button>
</template>
<script setup>
// import { defineEmits } from 'vue';
const props = defineProps(['textButton','buttonType']);

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