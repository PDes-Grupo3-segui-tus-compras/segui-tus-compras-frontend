<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { fetchUsers } from '@/service/userService';
import router from '@/router';

const userFilter = ref(null);
const userTypes = reactive(['user', 'admin']);
const loading = ref(true);

const users = ref([]);

onBeforeMount(() => {
    initUserFilter();
});

onMounted(async () => {
    try {
        users.value = await fetchUsers();
    } catch (error) {
        console.error(error);
        await router.push(`/auth/access`);
    } finally {
        loading.value = false;
    }
});

function initUserFilter() {
    userFilter.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        user_type: { value: null, matchMode: FilterMatchMode.IN },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
}

function goToPurchases(user) {
    router.push({
        path: `/users/${user.id}/purchases`,
        query: { userName: user.name }
    });
}

function goToFavourites(user) {
    router.push({
        path: `/users/${user.id}/favourites`,
        query: { userName: user.name }
    });
}
</script>

<template>
    <FloatingConfigurator />
    <div class="fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-md">
        <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
            <TopbarWidget />
        </div>
    </div>
    <div class="pt-32 px-6 lg:px-20">
        <div class="card">
            <div class="font-semibold text-xl mb-4">Users</div>
            <DataTable
                :value="users"
                :paginator="true"
                :rows="10"
                :loading="loading"
                dataKey="id"
                :rowHover="true"
                v-model:filters="userFilter"
                filterDisplay="menu"
                :filters="userFilter"
                :globalFilterFields="['name', 'email', 'user_type']"
                showGridlines
            >
                <template #header>
                    <div class="flex justify-between">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Keyword Search" />
                        </IconField>
                    </div>
                </template>
                <template #empty>
                    <div class="text-center text-gray-500 py-8" v-if="!loading">
                        <i class="pi pi-user-times text-2xl mb-2"></i><br />
                        No users found.
                    </div>
                </template>
                <template #loading>
                    <div class="flex justify-center items-center py-10">
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" animationDuration=".5s" />
                        Loading
                    </div>
                </template>
                <Column field="name" header="Name" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex items-center gap-3">
                            <Avatar v-if="data.image" :image="data.image" size="large" shape="circle"></Avatar>
                            <Avatar v-else :label="data.name.charAt(0)" size="large" shape="circle"></Avatar>
                            <span>{{ data.name }}</span>
                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                    </template>
                </Column>
                <Column header="Email" filterField="email" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                    <template #body="{ data }">
                        <div class="flex items-center gap-2">
                            <span>{{ data.email }}</span>
                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" placeholder="Search by email" />
                    </template>
                </Column>
                <Column header="Type" filterField="user_type" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }">
                    <template #body="{ data }">
                        {{ data.user_type }}
                    </template>
                    <template #filter="{ filterModel }">
                        <MultiSelect v-model="filterModel.value" :options="userTypes" placeholder="Any">
                            <template #option="slotProps">
                                <div class="flex items-center gap-2">
                                    <span>{{ slotProps.option }}</span>
                                </div>
                            </template>
                        </MultiSelect>
                    </template>
                </Column>
                <Column header="Actions" style="min-width: 10rem; text-align: center">
                    <template #body="{ data }">
                        <div class="flex justify-center gap-2">
                            <Button icon="pi pi-shopping-cart" class="custom-action-btn" rounded aria-label="View Purchases" @click="goToPurchases(data)" v-tooltip="'Go to purchases'" />
                            <Button icon="pi pi-heart-fill" class="custom-action-btn" rounded aria-label="View Favourites" @click="goToFavourites(data)" v-tooltip="'Go to favourites'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
