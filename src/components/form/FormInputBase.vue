<template>
  <div class="form-group">
    <label>{{ labelText }}</label>
    <!-- <input :value="modelValue" @input="$emit('input',$event.target.value)" :type="inputType" class="form-control"> -->
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="inputType"
      class="form-control">
    <!-- <span style="color: red; font-size: 12px;" v-if="errorMessage?.no_telp">{{
            errorMessage.no_telp[0] }}</span> -->
    <div v-if="errorMessage != null">
      <span style="color: red; font-size: 12px;" :v-if=errorMessage>{{
        String(errorMessage) }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['labelText', 'modelValue', 'inputType', 'errorMessage']);
</script>
<!-- <script setup>
defineProps({
    labelText:{
        type:String,
        default:false
    }
})
</script> -->
<!-- <script>
export default {
  props: {
    labelText:{
      type:String,
      default: ''
    },
    modelValue: {
      type: [String,Number],
      default:''
    },
    
  },
};
</script> -->