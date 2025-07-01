<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { editOpinion, deleteOpinion } from '@/service/opinionService';
import { computed, ref } from 'vue';
import { isAdmin, isCurrentUser } from '@/service/localStorageService';
import { fetchUserProfileById } from '@/service/userService';
import UserProfileDialog from '@/components/UserProfileDialog.vue';

const props = defineProps({
    opinion: {
        type: Object,
        required: true
    },
    deleteOpinionFn: {
        type: Function,
        required: true
    }
});

const isEditing = ref(false);
const profile = ref({});
const opinion = ref(props.opinion);
const shouldShowProfileDialog = ref(false);
const confirm = useConfirm();
const toast = useToast();

const editOpinionForm = () => {
    isEditing.value = !isEditing.value;
    opinionStructure.value = { opinion: opinion.value.content, rating: opinion.value.rating };
};

const canDeleteAOpinion = () => isAdmin() || isCurrentUser(opinion.value.user_id);

const canEditAOpinion = () => isCurrentUser(opinion.value.user_id);

const confirmDialog = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: '¿Are you sure you want to delete this opinion?',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Yes. Delete',
        rejectLabel: 'No',
        accept: async () => {
            try {
                await deleteOpinion(opinion.value.id);
                props.deleteOpinionFn(opinion.value.id);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Opinion successfully deleted', life: 3000 });
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Fail', detail: 'An error occurred while deleting the opinion', life: 3000 });
            }
        }
    });
};

const submitted = ref(false);
const isProcessingRequest = ref(false);

const opinionStructure = ref({
    opinion: '',
    rating: null
});

const resetOpinionForm = () => {
    opinionStructure.value.opinion = '';
    opinionStructure.value.rating = null;
};

function cancelOpinion() {
    resetOpinionForm();
    isEditing.value = false;
}

const backendErrors = ref({});

const defaultErrors = {
    content: [],
    rating: []
};

const errors = computed(() => {
    if (backendErrors.value && Object.keys(backendErrors.value).length > 0) {
        return { ...defaultErrors, ...backendErrors.value };
    } else {
        return {
            content: !opinionStructure.value.opinion ? ['You must add a comment'] : [],
            rating: !opinionStructure.value.rating ? ['Rating is required'] : []
        };
    }
});

async function handleEdit() {
    isProcessingRequest.value = true;
    submitted.value = true;

    if (!Object.values(errors.value).some((errArray) => errArray.length > 0)) {
        try {
            opinion.value = await editOpinion(opinion.value.id, { content: opinionStructure.value.opinion, rating: opinionStructure.value.rating });
            isEditing.value = false;
            resetOpinionForm();
            toast.add({ severity: 'success', summary: 'Success', detail: 'Opinion has been successfully edited', life: 3000 });
        } catch (error) {
            if (error.response && error.response.data.error) {
                backendErrors.value = {
                    ...defaultErrors,
                    ...(error.response?.data?.error || {})
                };
            }
            toast.add({ severity: 'error', summary: 'Fail', detail: 'Opinion could not be edited', life: 3000 });
        } finally {
            isProcessingRequest.value = false;
        }
    }
    isProcessingRequest.value = false;
}

async function openProfile(userId) {
    profile.value = await fetchUserProfileById(userId);
    shouldShowProfileDialog.value = true;
}
</script>

<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <hr class="my-3" />
    <div v-if="!isEditing" class="px-3 py-2">
        <div class="opinion-header flex justify-between items-start mb-2 gap-3">
            <div class="flex items-center gap-2">
                <Avatar :label="opinion.user_name.charAt(0)" size="small" shape="circle" />
                <div class="flex flex-col">
                    <h5 class="font-medium cursor-pointer text-primary m-0" @click="openProfile(opinion.user_id)">{{ opinion.user_name }}</h5>
                    <div class="flex flex-row gap-2 small text-500">
                        <span>{{ new Date(opinion.created_at).toLocaleString() }}</span>
                        <template v-if="opinion.created_at !== opinion.updated_at">
                            <span>|</span>
                            <span>Last edited: {{ new Date(opinion.updated_at).toLocaleString() }}</span>
                        </template>
                    </div>
                </div>
            </div>

            <div class="flex gap-2 ml-auto">
                <Button v-if="canEditAOpinion()" v-tooltip="'Edit Opinion'" icon="pi pi-pencil" rounded severity="danger" text @click="editOpinionForm" data-cy="edit-opinion" />
                <Button v-if="canDeleteAOpinion()" v-tooltip="'Delete Opinion'" icon="pi pi-times" rounded severity="danger" text @click="confirmDialog($event)" data-cy="delete-opinion" />
            </div>
        </div>
        <p class="opinion-content text-700" data-cy="opinion-content">
            {{ opinion.content }}
        </p>
    </div>
    <div>
        <form v-if="isEditing" class="my-4 card p-4">
            <div class="shaking-input flex align-items-center gap-2 ml-3">
                <p class="m-0 p-0 text-500">Rating</p>
                <Rating v-model="opinionStructure.rating" :cancel="false" :class="{ 'p-invalid': submitted && errors.rating.length > 0 }" class="m-0 p-0" />
            </div>

            <Textarea v-model="opinionStructure.opinion" class="w-full mt-3 p-2" rows="4" data-cy="edit-opinion-field" />
            <div class="error-container">
                <small v-for="(error, index) of errors.rating" :key="index" class="text-red-500 text-sm mt-1">{{ error + ' ' }}</small>
                <small v-for="(error, index) of errors.content" :key="index" class="text-red-500 text-sm mt-1">{{ error + ' ' }}</small>
            </div>

            <div class="flex justify-content-end gap-2 mt-3">
                <Button class="cancel-button p-2" label="Cancel" @click="cancelOpinion"></Button>
                <Button :loading="false" class="p-2" label="Send opinion" type="button" @click="handleEdit" data-cy="edit-opinion-button"></Button>
            </div>
        </form>
    </div>
    <UserProfileDialog v-model:visible="shouldShowProfileDialog" :editable="isCurrentUser(profile.id)" :user="profile" />
</template>

<style scoped></style>
