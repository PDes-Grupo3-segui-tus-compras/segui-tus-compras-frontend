<script setup>
import { searchProducts } from '@/service/mercadoLibreService';
import { ref } from 'vue';
import router from '@/router';

const searchText = ref('');
const productList = ref([]);
const backendErrorMessage = ref('');
const noProductsFound = ref(false);

const handleSearch = async () => {
    backendErrorMessage.value = '';
    isLoading.value = true;
    noProductsFound.value = false;
    productList.value = [];
    try {
        productList.value = await searchProducts({ q: searchText.value });
    } catch (error) {
        if (error.response) {
            backendErrorMessage.value = 'Something went wrong searching for products, try again later';
        }
    } finally {
        isLoading.value = false;
        noProductsFound.value = productList.value.length === 0;
    }
};

function goToProduct(productId) {
    router.push(`/products/${productId}`);
}

const isLoading = ref(false);
</script>
<template>
    <div id="items-for-sale" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="col-span-12 text-center mt-20 mb-6">
            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Items for sale</div>
            <div class="grid grid-cols-12">
                <InputGroup class="col-start-3 col-span-8 mt-20 mb-6 text-center">
                    <Button :disabled="!searchText.trim()" label="Search" @click="handleSearch" />
                    <InputText type="text" v-model="searchText" placeholder="Keyword" />
                </InputGroup>
                <p v-if="backendErrorMessage" class="col-start-3 col-span-8 text-red-500 text-sm">{{ backendErrorMessage }}</p>
                <p v-if="noProductsFound" class="col-start-3 col-span-8 text-gray-500 text-lg">No items found!</p>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="card">
                <div class="font-semibold text-xl" v-if="productList.length > 0">Items:</div>
                <DataView :value="productList" layout="grid" v-if="productList.length > 0">
                    <template #grid="slotProps">
                        <div class="grid grid-cols-12 gap-4">
                            <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 p-2">
                                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                    <div class="relative mx-auto w-3/4 h-80 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                                        <img v-if="item.image" :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain" />
                                        <div v-else class="flex items-center justify-center w-full h-full text-gray-500 text-sm">No image available</div>
                                    </div>
                                    <div class="flex flex-col justify-between flex-grow mt-6">
                                        <div class="mb-6">
                                            <div class="text-lg font-medium leading-snug h-[3.5rem] overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical">
                                                {{ item.name }}
                                            </div>
                                        </div>
                                        <Button label="Details" class="h-[2.5rem] w-[10rem] text-base self-center" @click="goToProduct(item.id)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
                <div v-if="isLoading" class="grid grid-cols-12 gap-4">
                    <div v-for="n in 10" :key="n" class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 p-2">
                        <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                            <Skeleton width="100%" height="20rem" class="rounded" />
                            <div class="flex flex-col justify-between flex-grow mt-6">
                                <div class="mb-6">
                                    <Skeleton width="80%" height="1.25rem" class="mb-2" />
                                    <Skeleton width="60%" height="1rem" />
                                </div>
                                <Skeleton width="10rem" height="2.5rem" class="self-center rounded" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
