<script setup lang="ts">
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
            <TopbarWidget />
            <HeroWidget class="mt-[96px]" />
            <ItemsWidget />
        </div>
    </div>
</template>
