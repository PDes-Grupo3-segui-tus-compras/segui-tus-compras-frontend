<script setup>
import ChangePasswordDialog from '@/components/ChangePasswordDialog.vue';
import { computed, ref } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    }
});
const modelVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val)
});

const emit = defineEmits(['update:visible']);

const showChangePasswordDialog = ref(false);

function newChangePasswordDialog() {
    showChangePasswordDialog.value = true;
}

const profileDialogWidth = () => {
    if (window?.innerWidth <= 767) {
        return '90%';
    }
    if (window?.innerWidth <= 1300) {
        return '40%';
    }
    return '20%';
};
</script>

<template>
    <Dialog v-model:visible="modelVisible" :style="{ width: profileDialogWidth() }" header="Profile" modal>
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2 text-lg font-semibold text-surface-900 dark:text-surface-100">
                <i class="pi pi-user"></i>
                {{ user.name }} • <span class="capitalize">{{ user.user_type }}</span>
            </div>

            <div class="flex items-center gap-2 text-base text-surface-700 dark:text-surface-300">
                <i class="pi pi-envelope"></i>
                {{ user.email }}
            </div>

            <div class="flex items-center gap-2 text-base text-surface-700 dark:text-surface-300">
                <i class="pi pi-calendar"></i>
                Joined on {{ user.created_at.split(' ')[0] }}
            </div>

            <div class="bg-surface-100 dark:bg-surface-800 p-3 rounded-md shadow-sm">
                <div class="flex items-center gap-2 text-surface-800 dark:text-surface-100">
                    <i class="pi pi-shopping-cart text-blue-400"></i>
                    <span>
                        {{ user.purchases_count > 0 ? `${user.purchases_count} purchases made` : 'No purchases yet' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2 text-surface-800 dark:text-surface-100">
                    <i class="pi pi-star text-yellow-400"></i>
                    <span>
                        {{ user.favourites_count > 0 ? `${user.favourites_count} products favourited` : 'No favourites yet' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2 text-surface-800 dark:text-surface-100">
                    <i class="pi pi-comment text-green-400"></i>
                    <span>
                        {{ user.opinions_count > 0 ? `${user.opinions_count} opinions submitted` : 'No opinions yet' }}
                    </span>
                </div>
            </div>
        </div>

        <template #footer>
            <Button v-if="editable" label="Change Password" icon="pi pi-cog" class="p-button-success p-button-rounded" @click="newChangePasswordDialog" />
        </template>
    </Dialog>

    <ChangePasswordDialog v-model:visible="showChangePasswordDialog" />
</template>

<style scoped>
::v-deep(.p-dialog-header) {
    font-size: 1.3rem;
    font-weight: bold;
}

.p-button-success {
    transition: transform 0.2s ease;
}
.p-button-success:hover {
    transform: scale(1.05);
}
</style>
