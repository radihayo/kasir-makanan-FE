<template>
    <button :type="buttonType" class="btn btn-danger">{{ textButton }}</button>
</template>
<script setup>
const props = defineProps(['textButton','buttonType']);
</script>