<script setup>
import UserProductOpinion from '@/components/UserProductOpinion.vue';
import { computed, ref } from 'vue';
import { publishOpinion } from '@/service/opinionService';
import { isCurrentUser } from '@/service/localStorageService';
import { getProductDataToSend } from '@/service/productService';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    opinions: {
        type: Array,
        required: true
    },
    product: {
        type: Object,
        required: true
    }
});

const userHasAlreadyWritten = computed(() => opinions.value?.some((opinion) => isCurrentUser(opinion.user_name)));

const isButtonBlockedToOpinion = computed(() => userHasAlreadyWritten.value);

const isSearchingOpinions = ref(false);

const opinions = ref(props.opinions);

const product = props.product;

const showOpinionForm = ref(false);

const toast = useToast();

const deleteOpinion = (opinionId) => {
    opinions.value = opinions.value.filter((opinion) => opinion.id !== opinionId);
};

const isProcessingRequest = ref(false);

const opinionStructure = ref({
    opinion: '',
    rating: null
});

const formErrors = ref({
    opinion: null,
    rating: null
});

const resetFormErrors = () => {
    formErrors.value.opinion = null;
    formErrors.value.rating = null;
}

const resetOpinionForm = () => {
    opinionStructure.value.opinion = '';
    opinionStructure.value.rating = null;
    resetFormErrors();
};

function openOpinionBox() {
    resetOpinionForm();
    showOpinionForm.value = !showOpinionForm.value;
}

function cancelOpinion() {
    resetOpinionForm();
    showOpinionForm.value = false;
}



async function sendOpinion() {
    isProcessingRequest.value = true;

    const content = opinionStructure.value.opinion;
    const rating = opinionStructure.value.rating;
    if (content == null || content === "") {
        formErrors.value.opinion = 'An opinion is required';
    } else {
        formErrors.value.opinion = null;
    }
    if (rating == null) {
        formErrors.value.rating = 'You must select a rating';
    } else {
        formErrors.value.rating = null;
    }

    if (formErrors.value.opinion == null && formErrors.value.rating == null) {
        try {
            const publishedOpinion = await publishOpinion({ ...getProductDataToSend(product), content: opinionStructure.value.opinion, rating: opinionStructure.value.rating });
            opinions.value.push(publishedOpinion);
            isSearchingOpinions.value = true;
            showOpinionForm.value = false;
            resetOpinionForm();
        } catch (error) {
            if (error.response?.data?.errors?.catalog_product_id) {
                toast.add({ severity: 'error', summary: 'Fail', detail: 'You already gave an opinion in this product', life: 3000 });
            }
            console.log(error.errors.catalog_product_id);
        } finally {
            isSearchingOpinions.value = false;
            isProcessingRequest.value = false;
        }
    }
    isProcessingRequest.value = false;
}
</script>

<template>
    <Toast />
    <div class="card m-auto md:col-7 p-4 max-w-[90rem]">
        <div class="flex justify-between align-items-center">
            <h3 class="m-0 p-0">Opinions</h3>
            <Button :disabled="isButtonBlockedToOpinion" icon="pi pi-comment" label="Give Opinion" @click="openOpinionBox" data-cy="opinion" />
        </div>
        <form v-if="showOpinionForm" class="my-4 card p-4" @submit.prevent="sendOpinion">
            <div class="shaking-input flex align-items-center gap-2 ml-3">
                <p class="m-0 p-0 text-500">Rating</p>
                <Rating v-model="opinionStructure.rating" :cancel="false" class="m-0 p-0" data-cy="opinion-rating"/>
            </div>

            <Textarea v-model="opinionStructure.opinion" class="w-full mt-3 p-2" rows="4" data-cy="opinion-input" />
            <div class="error-container">
                <small v-if="formErrors.opinion != null" class="text-red-500 text-sm mt-1" data-cy="opinion-error">{{ formErrors.opinion + ' ' }}</small>
                <small v-if="formErrors.rating != null" class="text-red-500 text-sm mt-1" data-cy="rating-error">{{ formErrors.rating + ' ' }}</small>
            </div>

            <div class="flex justify-content-end gap-2 mt-3">
                <Button class="cancel-button p-2" label="Cancel" @click="cancelOpinion"></Button>
                <Button :loading="false" class="p-2" label="Send Opinion" type="submit" data-cy="send-opinion"></Button>
            </div>
        </form>

        <div v-if="opinions.length === 0 && !showOpinionForm">
            <div class="card mt-5">
                <p class="w-fit m-auto text-300 font-italic">There are no opinions yet</p>
                <p class="w-fit m-auto text-300 font-italic">Be the first to leave one!</p>
            </div>
        </div>

        <div v-if="!isSearchingOpinions && opinions.length !== 0">
            <UserProductOpinion v-for="opinion in opinions" :key="opinion.id" :opinion="opinion" :deleteOpinionFn="(opinionId) => deleteOpinion(opinionId)" />
        </div>
    </div>
</template>

<style scoped>
.cancel-button {
    width: 100px;
    background-color: rgba(255, 255, 255, 0.87);
    border: none;
    color: #9b2a3a;
    transition:
        background-color 0.3s,
        color 0.3s;
}

.cancel-button:hover {
    background-color: rgba(255, 255, 255, 1) !important;
    color: #ff0000 !important;
}

.p-inputtext {
    background-color: #565656;
    outline: none !important;
    border: none !important;
    border-radius: 0;
}
</style>
