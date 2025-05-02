<script setup>
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import { getProductById } from '@/service/mercadoLibreService';
import { purchaseProduct } from '@/service/productService';
import 'primeicons/primeicons.css';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');

const toast = useToast();
const confirmPopup = useConfirm();

onMounted(async () => {
    const productId = route.params.id
    try {
        isLoading.value = true;
        product.value = await getProductById({product_id: productId});
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
    try{const response = await purchaseProduct(
        {
        catalog_product_id: product.catalog_product_id,
        name: product.name,
        image: product.pictures[0].url,
        short_description: product.short_description,
        quantity: 1,
        price: product.price
        });
        toast.add({ severity: 'info', summary: 'Success', detail: 'Product succesfully purchased', life: 3000 })
    ;}
    catch (error) {
        if (error.response && error.response.status === 400) {
            backendErrorMessage.value = 'Algo paso';
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
            handlePurchase()
        },
        reject: () => {
        }
    });
}
</script>

<template>
    <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
        <TopbarWidget />
    </div>
    <div v-if="!isLoading">
        <div class="min-h-screen bg-surface-ground text-color flex justify-center items-start py-10 px-4">
            <div class="card border-1 surface-border border-round-xl w-full max-w-[90rem] grid grid-cols-1 md:grid-cols-2 gap-6">
                <h1 class="block md:hidden text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                    {{ product.name }}
                </h1>
                <div class="card">
                    <Galleria :value="product.pictures" :responsiveOptions="galleriaResponsiveOptions" :numVisible="5" containerStyle="max-width: 640px" class="mt-2rem">
                        <template #item="slotProps">
                            <div style="width: 100%; height: 400px; display: flex; align-items: center; justify-content: center">
                                <img :src="slotProps.item.url" style="max-width: 100%; max-height: 100%; object-fit: contain; padding-top: 10px;"
                                />
                            </div>
                        </template>
                        <template #thumbnail="slotProps">
                            <img :src="slotProps.item.url" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px" />
                        </template>
                    </Galleria>
                </div>
                <div class="flex flex-col gap-4 px-4">
                    <h1 class="hidden md:block text-3xl md:text-4xl font-semibold pl-2 pt-[2rem]">
                        {{ product.name }}
                    </h1>
                    <div class="text-4xl md:text-5xl font-bold text-green-700 flex items-center gap-2">
                        <i class="pi pi-tag"></i>
                        {{product.price}}
                    </div>
                    <div
                        v-if="product.short_description"
                        class="mt-2 text-gray-700 dark:text-gray-300 text-base max-h-[7.5rem] overflow-y-auto pr-2"
                        style="line-height: 1.5rem;"
                    >
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
                    <div class="flex flex-col gap-3 items-center">
                        <ConfirmPopup></ConfirmPopup>
                        <Button label="⚡ Buy Now" class="h-[2.5rem] w-[17rem] text-base md:text-lg" @click="confirm($event)" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
