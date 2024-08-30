<template>
    <vue-good-table :line-numbers="true" :columns="columns" :rows="rows" :pagination-options="{ enabled: true }"
        :search-options="{ enabled: true }">
        <template #table-row="{ column, row }">
            <div v-if="column.field === 'aksi'">
                <ButtonBlue @click="handleAction('edit', row)" textButton="Edit" buttonType="button" class="mr-1 mb-1" />
                <ButtonRed @click="handleAction('delete', row)" textButton="Delete" buttonType="button" class="mb-1" />
            </div>
            <div v-else-if="column.field === 'detail'">
                <ButtonBlue @click="handleAction('detail', row)" textButton="Detail" buttonType="button" />
            </div>
            <div v-else-if="column.field === 'gambar'">
                <img :src="'http://127.0.0.1:8000/storage/image/products/' + row.gambar" 
                style="border: 1px solid #555;border-radius: 5%; width: 50%; margin-left: 25%;" alt="product-image" class="img-fluid">
            </div>
            <div v-else>
                {{ row[column.field] }}
            </div>
        </template>
    </vue-good-table>
</template>
<script setup>
import ButtonBlue from './button/ButtonBlue.vue';
import ButtonRed from './button/ButtonRed.vue';

const { columns, rows, onEditRow, onDeleteRow, onDetailRow } = defineProps(['columns', 'rows', 'onEditRow', 'onDeleteRow', 'onDetailRow']);

const handleAction = (action, row) => {
    if (action === 'edit' && onEditRow) {
        onEditRow(row);
    } else if (action === 'delete' && onDeleteRow) {
        onDeleteRow(row);
    } else if (action === 'detail' && onDetailRow) {
        onDetailRow(row);
    }
};
</script>