<template>
    <button type="button" @click="ActionButton" class="btn btn-danger">{{ textButton }}</button>
</template>
<script setup>
const props = defineProps(['textButton']);
const emit = defineEmits(['actionButton']);
</script>