<template>
    <button :type="buttonType" class="btn btn-primary">{{ textButton }}</button>
</template>
<script setup>
const props = defineProps(['textButton','buttonType']);
</script>