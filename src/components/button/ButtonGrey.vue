<template>
     <button type="button" @click="ActionButton" class="btn btn-secondary">{{ TextButton }}</button>
</template>
<script setup>
const props = defineProps(['TextButton']);
const emit = defineEmits(['actionButton']);
</script>