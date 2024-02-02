<template>
    <button type="button" @click="ActionButton" class="btn btn-primary">{{ TextButton }}</button>
</template>
<script>
export default {
  props: {
    TextButton: {
      type: String
    }
  },
  methods: {
    ActionButton() {
      this.$emit('click');
    }
  }
}
</script>