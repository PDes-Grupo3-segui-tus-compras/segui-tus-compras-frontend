<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import TopbarWidget from '@/components/landing/TopbarWidget.vue';

const metricsImage = 'https://cdn2.iconfinder.com/data/icons/analytics-28/100/analytics_metrics_report_chart_graph_pie-512.png';
const usersImage = 'https://cdn3.iconfinder.com/data/icons/yuai-user-interface-vol-5/100/yuai-5-20-256.png';
</script>

<template>
    <FloatingConfigurator />
    <div class="fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-md">
        <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
            <TopbarWidget />
        </div>
    </div>

    <div class="flex items-center justify-center min-h-screen px-4 pt-20 lg:pt-0">
        <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex flex-col h-full items-center justify-between rounded-[56px] p-[0.3rem]"
                 style="background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="flex flex-col justify-between items-center bg-surface-0 dark:bg-surface-900 h-full px-6 sm:px-10 py-10 rounded-[53px]">
                    <img :src="usersImage" alt="Users" class="mb-8  object-contain w-[400px]"
                         style="filter: invert(33%) sepia(77%) saturate(454%) hue-rotate(153deg) brightness(97%) contrast(85%)" />
                    <Button as="router-link" label="Go to Users" to="/admin/users" />
                </div>
            </div>
            <div class="flex flex-col h-full items-center justify-between rounded-[56px] p-[0.3rem]"
                 style="background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="flex flex-col justify-between items-center bg-surface-0 dark:bg-surface-900 h-full px-6 sm:px-10 py-10 rounded-[53px]">
                    <img :src="metricsImage" alt="Metrics" class="mb-8  object-contain w-[400px]"
                         style="filter: invert(33%) sepia(77%) saturate(454%) hue-rotate(153deg) brightness(97%) contrast(85%)" />
                    <Button as="router-link" label="Go to Metrics" to="/admin/metrics" />
                </div>
            </div>
        </div>
    </div>
</template>