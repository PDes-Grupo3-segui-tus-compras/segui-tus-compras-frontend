<script setup>
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import router from '@/router';
import { fetchUserFavourites, fetchUserPurchases } from '@/service/userService';
import 'primeicons/primeicons.css';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoading = ref(true);
let productList = ref([]);
const type = route.meta.dataType;
const fetchedUserId = route.meta.fetchedUserId;

onMounted(async () => {
    try {
        if (type == 'favourites'){
            productList = await fetchUserFavourites(fetchedUserId);
        }else if (type == 'purchases') {
            productList = await fetchUserPurchases(fetchedUserId);
        }else {
            console.error('Type error')
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false;
    }
});

function goToProduct(productId) {
    router.push(`/products/${productId}`);
}

</script>

<template>
    <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
        <TopbarWidget />
    </div>
    <div v-if="!isLoading">
        <div class="max-w-screen-xl mx-auto flex flex-col">
            <div class="card">
                <div class="font-semibold text-xl" v-if="productList.length > 0 && type === 'favourites'">Favourites:</div>
                <div class="font-semibold text-xl" v-if="productList.length > 0 && type === 'purchases'">Purchases:</div>
                <DataView :value="productList" layout="grid" v-if="productList.length > 0">
                    <template #grid="slotProps">
                        <div class="grid grid-cols-12 gap-4">
                            <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 p-2">
                                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                    <Splitter class="mb-8 w-full" style="height: 300px;">
                                        <SplitterPanel :size="35" :minSize="10">
                                            <div class="h-full flex flex-col items-center justify-center p-4">
                                                <div class="relative w-full h-80 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                                                    <img v-if="item.image" :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain" />
                                                    <div v-else class="flex items-center justify-center w-full h-full text-gray-500 text-sm">No image available</div>
                                                </div>
                                                <div class="flex flex-col justify-between flex-grow mt-6 w-full">
                                                    <div class="mb-6">
                                                        <div class="text-lg font-medium leading-snug h-[3.5rem] overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical">
                                                            {{ item.name }}  
                                                            <i :class="item.is_favourite ? 'pi pi-heart-fill' : 'pi pi-heart'" class="text-pink-500" style="color: #00C58E; width: 30px; height: 30px;"></i>
                                                        </div>
                                                    </div>
                                                    <Button label="Details" class="h-[2.5rem] w-[10rem] text-base self-center" @click="goToProduct(item.catalog_product_id)" />
                                                </div>
                                            </div>
                                        </SplitterPanel>
                                        <SplitterPanel :size="65">
                                            <div className="h-full flex items-center justify-center p-4">
                                                <div class="flex flex-col justify-between flex-grow mt-6">
                                                    <div class="mb-6">
                                                        Price: {{ item.price }}
                                                    </div>
                                                    <div>Description: </div>
                                                    <div class="mb-6 pt-2" style="max-height: 100px; overflow:auto ">
                                                        {{ item.short_description || "No description provided"}}
                                                    </div>
                                                    <i v-if="type === 'purchases'">
                                                        <div class="mb-6">
                                                            Purchased on:  {{ new Date(item.purchase_date).toUTCString() }}
                                                        </div>
                                                        <div class="mb-6">
                                                            Quantity: {{ item.quantity }}
                                                        </div>
                                                        <div class="mb-6">
                                                            Total: {{ item.quantity * item.price }}
                                                        </div>
                                                    </i>  
                                                </div>  
                                            </div>  
                                        </SplitterPanel>
                                    </Splitter>
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
    <div v-if="isLoading">
        Loading {{ type }} TODO MEJORAR
    </div>
</template>
