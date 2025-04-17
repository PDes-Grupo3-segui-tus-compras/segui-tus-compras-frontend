<script setup>
import { ref } from 'vue';
import 'primeicons/primeicons.css';
import TopbarWidget from '@/components/landing/TopbarWidget.vue';

const images = ref([
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4s.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5s.jpg',
        alt: 'Description for Image 5',
        title: 'Title 5'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6s.jpg',
        alt: 'Description for Image 6',
        title: 'Title 6'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 7',
        title: 'Title 7'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria8.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria8s.jpg',
        alt: 'Description for Image 8',
        title: 'Title 8'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria9.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria9s.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria10s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 10'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria11s.jpg',
        alt: 'Description for Image 11',
        title: 'Title 11'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria12.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria12s.jpg',
        alt: 'Description for Image 12',
        title: 'Title 12'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria13.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria13s.jpg',
        alt: 'Description for Image 13',
        title: 'Title 13'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria14.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria14s.jpg',
        alt: 'Description for Image 14',
        title: 'Title 14'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria15.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria15s.jpg',
        alt: 'Description for Image 15',
        title: 'Title 15'
    }
]);
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
</script>

<template>
    <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
        <TopbarWidget />
    </div>
    <div class="min-h-screen bg-surface-ground text-color flex justify-center items-start py-10 px-4">
        <div class="card border-1 surface-border border-round-xl w-full max-w-[90rem] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card">
                <Galleria :value="images" :responsiveOptions="galleriaResponsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
                    <template #item="slotProps">
                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
                    </template>
                </Galleria>
            </div>
            <div class="flex flex-col gap-4 px-4">
                <h1 class="text-3xl md:text-4xl font-semibold pl-2 pt-[2rem]">Caída de Leviatán, La. Expanse 9 - James S. A. Corey</h1>
                <div class="flex items-center text-base md:text-lg text-green-600 gap-2">
                    <i class="pi pi-check-circle text-green-500"></i>
                    Nuevo · +5 vendidos
                </div>
                <div class="text-4xl md:text-5xl font-bold text-green-700 flex items-center gap-2">
                    <i class="pi pi-tag"></i>
                    $32.740
                </div>
                <div class="text-base md:text-lg text-gray-600">en 6 cuotas de $7.254,64</div>
                <div class="text-sm md:text-base text-gray-500 flex items-center gap-2">
                    <i class="pi pi-barcode"></i>
                    ISBN: 09788418034744
                </div>

                <div class="mt-8 flex flex-col gap-3 items-center">
                    <Button label="⚡ Buy Now" class="h-[2.5rem] w-[17rem] text-base md:text-lg" />
                    <Button label="🛒 Add to Cart" severity="secondary" outlined class="h-[2.5rem] w-[17rem] text-base md:text-lg" />
                </div>
            </div>
        </div>
    </div>
</template>
