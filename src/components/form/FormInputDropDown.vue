<template>
  <div class="form-group">
    <label>{{ labelText }}</label>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="form-control">
    <!-- <select v-model="selectedOption" @input="event => { $emit('input', event.target.value) }" class="form-control"> -->
      <option v-for="(option, name) in options" :value="name">{{ option }}</option>
    </select>
    <div v-if="errorMessage != null">
      <span style="color: red; font-size: 12px;" :v-if=errorMessage>{{
                String(errorMessage)}}</span>
    </div>

    <!-- <div class="form-group">
            <label for="kode">Jenis Kelamin</label>
            <select v-model="dataInputEmployee.jenis_kelamin" class="form-control" name="jenis_kelamin_edit"
                id="jenis_kelamin_edit">
                <option value="">--Pilih--</option>
                <option value="0">Laki - Laki</option>
                <option value="1">Perempuan</option>
            </select>
            <span style="color: red; font-size: 12px;" v-if="errorMessage?.jenis_kelamin">{{
                errorMessage.jenis_kelamin[0] }}</span>
        </div> -->
  </div>
</template>
<script setup>
const props = defineProps(['labelText','modelValue','options','errorMessage']);
</script>
<!-- <script>
export default {
  props: {
    labelText: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [String,Number],
      default:''
    }
  },
  data() {
    return {
      selectedOption: null
    }
  },
  mounted() {
    this.selectedOption = this.value
  },

  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  }
};
</script> -->