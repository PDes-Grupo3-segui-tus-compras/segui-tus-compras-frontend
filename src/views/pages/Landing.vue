<script setup lang="ts">
import FooterWidget from '@/components/landing/FooterWidget.vue';
import HeroWidget from '@/components/landing/HeroWidget.vue';
import ItemsWidget from '@/components/landing/ItemsWidget.vue';
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    const sectionId = route.query.scrollTo;
    if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="fixed top-0 left-0 w-full z-50 bg-surface-0 dark:bg-surface-900 shadow-md">
                <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between">
                    <TopbarWidget />
                </div>
            </div>
            <HeroWidget class="mt-[96px]" />
            <ItemsWidget />
            <FooterWidget />
        </div>
    </div>
</template>
