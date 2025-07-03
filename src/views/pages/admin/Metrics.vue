<script setup>
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import UserProfileDialog from '@/components/UserProfileDialog.vue';
import router from '@/router';
import { fetchMetrics } from '@/service/adminService';
import { stringToColor } from '@/service/colorService';
import { fetchUserProfileById } from '@/service/userService';
import { computed, onMounted, ref } from 'vue';

const menu = ref(null);
const layout = ref('list');
const metricUsers = ref([]);
const isLoading = ref(true);
const metricFavourites = ref([]);
const metricProduct = ref([]);
const metricType = ref('top5Users');
const profile = ref({});
const shouldShowProfileDialog = ref(false);

const overlayMenuItems = ref([
    {
        label: 'Top 5 Users',
        icon: 'pi pi-fw pi-user',
        command: () => metricType.value = 'top5Users'
    },
    {
        label: 'Top 5 Favourited Product',
        icon: 'pi pi-heart-fill',
        command: () => metricType.value = 'top5Favourites'
    },
    {
        label: 'Top 5 Purchases',
        icon: 'pi pi-fw pi-shopping-cart',
        command: () => metricType.value = 'top5Purchases'
    },
    {
        separator: true
    }
]);

function toggleMenu(event) {
    menu.value.toggle(event);
}

async function fetchData() {
    isLoading.value = true;
    try {
        let metrics = await fetchMetrics();
        metricUsers.value = metrics.top_five_users;
        metricProduct.value = metrics.top_five_purchased;
        metricFavourites.value = metrics.top_five_favourites;
    } finally {
        isLoading.value = false;
    }
};

const resultsTop5 = computed(() => {
  switch (metricType.value) {
    case 'top5Users':
      return metricUsers.value;
    case 'top5Favourites':
      return metricFavourites.value;
    case 'top5Purchases':
      return metricProduct.value;
    default:
      return [];
  }
});

function goToProduct(productId) {
    router.push(`/products/${productId}`);
};

async function openProfile(userId) {
    profile.value = await fetchUserProfileById(userId);
    shouldShowProfileDialog.value = true;
}

onMounted(fetchData);

</script>

<template>
    <div class="fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-md">
        <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
            <TopbarWidget />
        </div>
    </div>
    <div class="pt-[5Rem]">
        <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[60vh]">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" animationDuration=".8s" />
            <span class="mt-4 text-color">Loading...</span>
        </div>
        <div v-if="!isLoading">
            <div class="flex flex-col pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" >
                <div class="card">
                    <div class="flex justify-between items-center">
                        <div class="font-semibold text-xl">
                            {{ metricType === 'top5Purchases' ? 'Top 5 Purchases' : metricType === 'top5Favourites' ? 'Top 5 Favourited Product' : 'Top 5 Users' }}
                        </div>
                        <div>
                            <Menu ref="menu" :model="overlayMenuItems" :popup="true" />
                            <Button
                                icon="pi pi-fw pi-bars"
                                @click="toggleMenu"
                                class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2"
                                style="padding: 0.75rem; width: 2rem; height: 2rem; margin-right: 14px;"
                            />
                        </div>
                    </div>
                    <DataView :value="resultsTop5" :layout="layout">
                        <template #list="slotProps">
                            <div class="flex flex-col">
                                <div v-for="(item, index) in slotProps.items" :key="index" class="flex items-center justify-between p-4 border-b" >
                                <!-- Image -->
                                <div class="w-20 flex-shrink-0">
                                    <div v-if="item.image" >
                                        <img :src="item.image" :alt="item.name" class="w-full rounded" />
                                    </div>
                                    <div v-else-if="metricType == 'top5Users'">
                                        <Avatar
                                            :label="item.name.charAt(0)"
                                            size="large"
                                            shape="circle"
                                            :style="{ backgroundColor: stringToColor(item.name), color: 'white' }"
                                            />
                                    </div>
                                    
                                </div>

                                <!-- Name & Count -->
                                <div class="flex flex-col flex-grow px-6">
                                    <span class="text-lg font-medium">{{ item.name }}</span>
                                    <span class="text-sm text-surface-500">
                                    {{ item.total }}
                                    {{ metricType === 'top5Purchases' ? ' times purchased' : metricType === 'top5Favourites' ? ' users favourited this' : ' purchases made' }}
                                    </span>
                                </div>

                                <!-- Details Icon -->
                                <Button v-if="metricType === 'top5Purchases' || metricType === 'top5Favourites'" icon="pi pi-eye" class="p-button-rounded p-button-sm bg-green-500 hover:bg-green-600 text-white border-none" @click="goToProduct(item.catalog_product_id)"
                                />
                                <Button v-else-if="metricType === 'top5Users'" icon="pi pi-eye" class="p-button-rounded p-button-sm bg-green-500 hover:bg-green-600 text-white border-none" @click="openProfile(item.id)"
                                />
                                
                                </div>
                            </div>
                            </template>
                    </DataView>
                </div>
            </div>
            <UserProfileDialog v-model:visible="shouldShowProfileDialog" :editable="false" :user="profile" />
        </div>
    </div>
</template>
