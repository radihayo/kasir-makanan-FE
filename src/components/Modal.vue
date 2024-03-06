<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="modal-mask">
    <div class="modal-dialog" ref="target">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ textModal }}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <slot name="content">
        </slot>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['textModal']);
</script>
