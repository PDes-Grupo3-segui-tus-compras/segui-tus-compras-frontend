<script setup>
import { ref, onMounted } from 'vue';
import { fetchTheAnswerToEverything } from '@/service/oracleService';

const answer = ref(null);
const loading = ref(true);
const error = ref(null);
const showAnswer = ref(false);

onMounted(async () => {
    try {
        const res = await fetchTheAnswerToEverything();
        answer.value = res.data;
        await new Promise((resolve) => setTimeout(resolve, 2000));

        showAnswer.value = true;
    } catch (err) {
        error.value = err.message || 'Answer could not be obtained :(';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="meme-container">
        <h1 class="title">The answer to the ultimate question of life, the universe, and everything:</h1>

        <div class="answer">
            <span v-if="loading" class="thinking">Thinking...</span>
            <span v-else-if="error">Error: {{ error }}</span>
            <transition name="fade-zoom">
                <span v-if="showAnswer" class="animated-answer">{{ answer }}</span>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.meme-container {
    text-align: center;
    padding: 2rem;
    font-family: monospace;
    background: radial-gradient(circle, #1a1a1a, #000);
    color: #42f5b3;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

.answer {
    font-size: 5rem;
    font-weight: bold;
    margin: 1rem 0;
    min-height: 6rem;
}

.thinking {
    display: inline-block;
    animation: shake 0.4s infinite;
}

@keyframes shake {
    0% { transform: translate(0, 0); }
    25% { transform: translate(-2px, 2px); }
    50% { transform: translate(2px, -1px); }
    75% { transform: translate(-1px, -2px); }
    100% { transform: translate(1px, 1px); }
}

.animated-answer {
    display: inline-block;
}

.fade-zoom-enter-active {
    animation: fadeZoomIn 1.5s ease-out forwards;
}

@keyframes fadeZoomIn {
    0% {
        opacity: 0;
        transform: scale(0.2) rotate(180deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}
</style>
