<script setup>
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import ProductOpinionsCard from '@/components/ProductOpinionsCard.vue';
import { getProductById } from '@/service/mercadoLibreService';
import { favouriteProduct, getProductDataToSend, purchaseProduct } from '@/service/productService';
import 'primeicons/primeicons.css';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');
const awaitingResponse = ref(false);

const toast = useToast();
const confirmPopup = useConfirm();
const quantity = ref(1);

onMounted(async () => {
    const productId = route.params.id;
    try {
        isLoading.value = true;
        product.value = await getProductById({ product_id: productId });
    } catch (error) {
        console.error(error);
        errorMessage.value = 'Error loading product.';
        //TODO: Llevarlo a la pagina de error 404
    } finally {
        isLoading.value = false;
    }
});

const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 4
    },
    {
        breakpoint: '960px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);

const handlePurchase = async () => {
    try {
        await purchaseProduct({
            catalog_product_id: product.value.catalog_product_id,
            name: product.value.name,
            image: product.value.pictures[0].url,
            short_description: product.value.short_description,
            quantity: quantity.value,
            price: product.value.price,
            is_favourite: product.value.is_favourite
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Product succesfully purchased', life: 3000 });
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 422) {
            toast.add({ severity: 'error', summary: 'Failure', detail: 'Something went wrong try again later', life: 3000 });
        }
    }
};

function confirm(event) {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Buy'
        },
        accept: () => {
            handlePurchase();
        },
        reject: () => {}
    });
};


const favourite = async (event) => {
    awaitingResponse.value = true;
    try {
        let response = await favouriteProduct(getProductDataToSend(product.value));
        product.value.is_favourite = ! product.value.is_favourite;
        toast.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
        awaitingResponse.value = false;
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Failure', detail: 'Something went wrong try again later', life: 3000 });
        awaitingResponse.value = false;
    }
}
</script>

<template>
    <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
        <TopbarWidget />
    </div>
    <div v-if="!isLoading">
        <div class="bg-surface-ground text-color flex justify-center items-start py-10 px-4">
            <div class="card border-1 surface-border border-round-xl w-full max-w-[90rem] grid grid-cols-1 md:grid-cols-2 gap-6">
                <h1 class="block md:hidden text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                    {{ product.name }}
                </h1>
                <div class="card">
                    <Galleria :value="product.pictures" :responsiveOptions="galleriaResponsiveOptions" :numVisible="5" containerStyle="max-width: 640px" class="mt-2rem">
                        <template #item="slotProps">
                            <div style="width: 100%; height: 400px; display: flex; align-items: center; justify-content: center">
                                <img :src="slotProps.item.url" style="max-width: 100%; max-height: 100%; object-fit: contain; padding-top: 10px" />
                            </div>
                        </template>
                        <template #thumbnail="slotProps">
                            <img :src="slotProps.item.url" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px" />
                        </template>
                    </Galleria>
                </div>
                <div class="flex flex-col gap-4 px-4">
                    <div class="flex flex-row items-center">
                        <h1 class="hidden md:block text-3xl md:text-4xl font-semibold pl-2 pt-[2rem]">
                            {{ product.name }}
                        </h1>
                        <Button type="button" :icon="product?.is_favourite ? 'pi pi-heart-fill' : 'pi pi-heart'" outlined :loading="awaitingResponse" @click="favourite($event)" style="min-height: 30px;min-width: 30px;max-height: 30px;max-width: 30px;"></Button>
                    </div>
                    <div class="text-4xl md:text-5xl font-bold text-green-700 flex items-center gap-2">
                        <i class="pi pi-tag"></i>
                        {{ product.price }}
                    </div>
                    <div v-if="product.short_description" class="mt-2 text-gray-700 dark:text-gray-300 text-base max-h-[7.5rem] overflow-y-auto pr-2" style="line-height: 1.5rem">
                        <p class="whitespace-pre-line">
                            {{ product.short_description }}
                        </p>
                    </div>
                    <div v-if="product.main_features?.length" class="mt-4">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="pi pi-info-circle text-green-600 dark:text-green-400"></i>
                            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Detalles del producto</h2>
                        </div>
                        <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                            <li v-for="(feature, index) in product.main_features" :key="index">
                                {{ feature.text }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6 md:gap-10">
                        <div class="flex items-center gap-2">
                            <label for="qty" class="text-base font-medium">Quantity:</label>
                            <InputNumber
                                :inputStyle="{ maxWidth: '40px' }"
                                v-model="quantity"
                                inputId="qty"
                                showButtons
                                buttonLayout="horizontal"
                                :min="1"
                                :max="99"
                                decrementButtonClass="p-button-secondary"
                                incrementButtonClass="p-button-secondary"
                            />
                        </div>
                        <div class="flex flex-col gap-3 items-center">
                            <ConfirmPopup></ConfirmPopup>
                            <Button label="⚡ Buy Now" class="h-[2.5rem] w-full md:w-[17rem] text-base md:text-lg" @click="confirm($event)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ProductOpinionsCard v-if="!isLoading" :opinions="product.opinions ? product.opinions : []" :product="product" />
        <div style="height: 10px"></div>
    </div>
</template>
