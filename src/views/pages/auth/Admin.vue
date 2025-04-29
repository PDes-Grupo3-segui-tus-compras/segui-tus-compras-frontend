<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { onBeforeMount, reactive, ref } from 'vue';
const layout = ref('list');
const userFilter = ref(null);
const userTypes = reactive(['User', 'Admin']);

/* Data for dev process only (MOCK) */
const metricsImage = "https://cdn2.iconfinder.com/data/icons/analytics-28/100/analytics_metrics_report_chart_graph_pie-512.png";
const usersImage = "https://cdn3.iconfinder.com/data/icons/yuai-user-interface-vol-5/100/yuai-5-20-256.png";
const producto = {image:"https://sublitextil.com.ar/wp-content/uploads/2019/01/Remera-sublimar-hombre-.jpg", name:"Remera", price: 50.50, rating: 5, category:"Ropa"}
const resultsTop5 = [producto, producto, producto, producto, producto]
const users = reactive([
    { name: 'Amy Elsner',       email: 'amy@gmail.com',      user_type: 'User'  },
    { name: 'Anna Fali',        email: 'anna@gmail.com',     user_type: 'User'  },
    { name: 'Asiya Javayant',   email: 'asiya@gmail.com',    user_type: 'Admin' },
    { name: 'Bernardo Dominic', email: 'bernardo@gmail.com', user_type: 'User'  },
    { name: 'Elwin Sharvill',   email: 'elwin@gmail.com',    user_type: 'User'  },
    { name: 'Ioni Bowcher',     email: 'ionig@gmail.com',    user_type: 'Admin' },
    { name: 'Ivan Magalhaes',   email: 'ivan@gmail.com',     user_type: 'User'  },
    { name: 'Onyama Limba',     email: 'onyama@gmail.com',   user_type: 'User'  },
    { name: 'Stephen Shaw',     email: 'stephen@gmail.com',  user_type: 'Admin' },
    { name: 'XuXue Feng',       email: 'xuxue@gmail.com',    user_type: 'User'  },
    { name: 'Stefano Peppei',   email: 'stefano@gmail.com',  user_type: 'Admin' },
    { name: 'Xe Lang',          email: 'xe@gmail.com',       user_type: 'User'  }, 
    { name: 'John Johnsoon',    email: 'john@gmail.com',     user_type: 'Admin' },
    { name: 'XuXu Fe',          email: 'xuxu@gmail.com',     user_type: 'User'  } 
]);

onBeforeMount(() => {
    initUserFilter();
});

function initUserFilter() {
    userFilter.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        user_type: { value: null, matchMode: FilterMatchMode.IN },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
}
</script>


<!-- This is the landing part! -->


<template>

    <FloatingConfigurator />
    <div class="fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-md">
        <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
            <TopbarWidget />
        </div>
    </div>
    
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                    <div class="gap-4 flex flex-col items-center">
                        <img :src="usersImage" alt="standByImage" class="mb-8" style="max-width: 300px; filter: invert(33%) sepia(77%) saturate(454%) hue-rotate(153deg) brightness(97%) contrast(85%);" />
                        <span class="text-muted-color mb-8">Users</span>
                        <div class="col-span-12 mt-8 text-center">
                            <Button as="router-link" label="Go to Users" to="/" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                    <div class="gap-4 flex flex-col items-center">
                        <img :src="metricsImage" alt="metricsImage" class="mb-8" style="max-width: 300px; filter: invert(33%) sepia(77%) saturate(454%) hue-rotate(153deg) brightness(97%) contrast(85%);" />
                        <span class="text-muted-color mb-8">Metrics</span>
                        <div class="col-span-12 mt-8 text-center">
                            <Button as="router-link" label="Go to Metrics" to="/" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- This is the Metric top 5part! -->


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
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{item.category}}</span>
                                            <div class="text-lg font-medium mt-2">{{item.name}}</div>
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
                                                <span class="text-surface-900 font-medium text-sm">{{item.rating}}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <span class="text-xl font-semibold">$ {{item.price}}</span>
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
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{item.category}}</span>
                                            <div class="text-lg font-medium mt-1">{{item.name}}</div>
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
                                                <span class="text-surface-900 font-medium text-sm">{{item.rating}}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-6 mt-6">
                                        <span class="text-2xl font-semibold">$ {{item.price}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
    </div>


    <!-- This is the users part! -->


    <div class="card">
        <div class="font-semibold text-xl mb-4">Users</div>
        <DataTable
            :value="users"
            :paginator="true"
            :rows="10"
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
                        <InputText  placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No users found. </template>
            <template #loading> Loading users data. Please wait. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    <Avatar v-if="data.image" :image="data.image" size="large" shape="circle"></Avatar>
                        <Avatar v-else :label="data.name.charAt(0)" size="large" shape="circle"></Avatar>
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel}">
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
                    {{ (data.user_type) }}
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
        </DataTable>
    </div>

</template>