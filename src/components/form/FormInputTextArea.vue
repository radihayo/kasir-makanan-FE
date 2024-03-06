<template>
    <div class="form-group">
        <label>{{ labelText }}</label>
        <textarea class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
         :rows="rowsLength"></textarea>
         <div v-if="errorMessage != null">
      <span style="color: red; font-size: 12px;" :v-if=errorMessage>{{
        String(errorMessage) }}</span>
    </div>
    </div>
</template>
<script setup>
const props = defineProps(['labelText', 'modelValue', 'rowsLength', 'errorMessage']);
</script>