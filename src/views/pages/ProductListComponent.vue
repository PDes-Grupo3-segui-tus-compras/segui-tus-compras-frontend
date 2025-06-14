<script setup>
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import router from '@/router';
import { fetchUserFavourites, fetchUserPurchases } from '@/service/userService';
import 'primeicons/primeicons.css';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['dataType', 'fetchedUserId', 'userName']);

const isLoading = ref(true);
const productList = ref([]);
const route = useRoute();

async function fetchData() {
    isLoading.value = true;
    try {
        if (props.dataType === 'favourites') {
            productList.value = await fetchUserFavourites(props.fetchedUserId);
        } else if (props.dataType === 'purchases') {
            productList.value = await fetchUserPurchases(props.fetchedUserId);
        } else {
            console.error('Unknown dataType:', props.dataType);
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            await router.push(`/auth/access`);
        }
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false;
    }
}
onMounted(fetchData);

watch(() => route.fullPath, fetchData);

function goToProduct(productId) {
    router.push(`/products/${productId}`);
}
</script>

<template>
    <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
        <TopbarWidget />
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[60vh]">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" animationDuration=".8s" />
        <span class="mt-4 text-color">Loading {{ props.dataType }}...</span>
    </div>

    <div v-else class="max-w-screen-xl mx-auto flex flex-col px-4">
        <div class="card">
            <h2 class="text-xl font-semibold text-color mb-4">{{ props.dataType === 'favourites' ? 'Favourites' : 'Purchases' }} from {{ props.userName }}</h2>

            <DataView :value="productList" layout="grid" dataKey="id">
                <template #grid="slotProps">
                    <div class="grid grid-cols-12 gap-4">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12">
                            <div class="p-4 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded">
                                <Splitter class="mb-4 w-full" style="height: 300px">
                                    <SplitterPanel :size="35" :minSize="10">
                                        <div class="h-full flex flex-col items-center justify-center p-3">
                                            <div class="relative w-full h-72 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                                                <img v-if="item.image" :src="item.image" :alt="item.name" class="max-w-full max-h-full object-contain" />
                                                <div v-else class="text-sm text-color-secondary text-center">No image available</div>
                                            </div>

                                            <div class="mt-4 w-full">
                                                <div class="text-lg font-semibold text-color mb-2" style="-webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box; overflow: hidden">
                                                    {{ item.name }}
                                                </div>
                                                <Button label="Details" class="w-full" @click="goToProduct(item.catalog_product_id)" />
                                            </div>
                                        </div>
                                    </SplitterPanel>

                                    <SplitterPanel :size="65">
                                        <div class="h-full p-4 text-color">
                                            <div class="mb-3"><strong>Price:</strong> {{ item.price }}</div>

                                            <div class="mb-3">
                                                <strong>Description:</strong>
                                                <div class="mt-1 text-sm overflow-auto" style="max-height: 100px">
                                                    {{ item.short_description || 'No description provided' }}
                                                </div>
                                            </div>

                                            <template v-if="props.dataType === 'purchases'">
                                                <div class="mb-2"><strong>Purchased on:</strong> {{ new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.purchase_date)) }}</div>
                                                <div class="mb-2"><strong>Quantity:</strong> {{ item.quantity }}</div>
                                                <div class="mb-2"><strong>Total:</strong> {{ item.quantity * item.price }}</div>
                                            </template>
                                        </div>
                                    </SplitterPanel>
                                </Splitter>
                            </div>
                        </div>
                    </div>
                </template>
                <template #empty>
                    <div class="text-center text-color-secondary py-10">
                        <i class="pi pi-info-circle text-2xl mb-3 block"></i>
                        No {{ props.dataType }} found for {{ props.userName }}.
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>
