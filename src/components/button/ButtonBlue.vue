<template>
    <button type="button" @click="ActionButton" class="btn btn-primary">{{ textButton }}</button>
</template>
<script>
export default {
  props: {
    textButton: {
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