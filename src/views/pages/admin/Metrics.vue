<script setup>
import { ref } from 'vue';
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';

const layout = ref('list');
/* Data for dev process only (MOCK) */
const product = { image: 'https://sublitextil.com.ar/wp-content/uploads/2019/01/Remera-sublimar-hombre-.jpg', name: 'Remera', price: 50.5, rating: 5, category: 'Ropa' };
const resultsTop5 = [product, product, product, product, product];
</script>

<template>
    <FloatingConfigurator />
    <div class="fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-md">
        <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
            <TopbarWidget />
        </div>
    </div>
    <div class="flex flex-col">
        <div class="card">
            <div class="font-semibold text-xl">Top 5 Products</div>
            <DataView :value="resultsTop5" :layout="layout">
                <template #list="slotProps">
                    <div class="flex flex-col">
                        <div v-for="(item, index) in slotProps.items" :key="index">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                                <div class="md:w-40 relative">
                                    <img class="block xl:block mx-auto rounded w-full" :src="item.image" :alt="item.name" />
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                            <div
                                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                            >
                                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <span class="text-xl font-semibold">$ {{ item.price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template #grid="slotProps">
                    <div class="grid grid-cols-12 gap-4">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 lg:col-span-4 p-2">
                            <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                <div class="bg-surface-50 flex justify-center rounded p-4">
                                    <div class="relative mx-auto">
                                        <img class="rounded w-full" :src="item.image" :alt="item.name" style="max-width: 300px" />
                                    </div>
                                </div>
                                <div class="pt-6">
                                    <div class="flex flex-row justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                            <div
                                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                            >
                                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-6 mt-6">
                                        <span class="text-2xl font-semibold">$ {{ item.price }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>
