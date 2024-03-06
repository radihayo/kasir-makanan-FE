<template>
    <vue-good-table :line-numbers="true" :columns="columns" :rows="rows" :pagination-options="{ enabled: true }"
        :search-options="{ enabled: true }">
        <template #table-row="{ column, row }">
            <div v-if="column.field === 'aksi'">
                <ButtonBlue @click="handleAction('edit', row)" textButton="Edit" class="mr-1 mb-1"/>
                <ButtonRed @click="handleAction('delete', row)" textButton="Delete" class="mb-1"/>
            </div>
            <!-- <div v-else-if="column.field === 'tersedia'">
                <span v-if="row.tersedia == '1'">
                    Tersedia
                </span>
                <span v-else>
                    Tidak Tersedia
                </span>
            </div> -->
            <div v-else-if="column.field === 'gambar'">
                <img :src="'http://127.0.0.1:8000/storage/image/'+row.gambar" alt="Photo 1" class="img-fluid">
            </div>
            <!-- <div v-else-if="column.field === 'status'">
                <span v-if="row.status == '0'">
                    Proses
                </span>
                <span v-else-if="row.status == '1'">
                    Selesai
                </span>
                <span v-else>
                    Batal
                </span>
            </div> -->
            <div v-else>
                {{ row[column.field] }}
            </div>
        </template>
    </vue-good-table>
</template>
<script setup>
import ButtonBlue from './button/ButtonBlue.vue';
import ButtonRed from './button/ButtonRed.vue';

const { columns, rows, onEditRow, onDeleteRow} = defineProps(['columns', 'rows', 'onEditRow', 'onDeleteRow']);

const handleAction = (action, row) => {
    if (action === 'edit' && onEditRow) {
        onEditRow(row);
    } else if (action === 'delete' && onDeleteRow) {
        onDeleteRow(row);
    }
};
</script>