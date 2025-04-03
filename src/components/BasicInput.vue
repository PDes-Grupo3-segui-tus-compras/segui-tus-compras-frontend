<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps({
    modelValue: String,
    label: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    errors: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue']);
const touched = ref(false);

const showError = computed(() => touched.value && props.errors.length);
</script>

<template>
    <div class="mb-4">
        <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
            {{ label }}
        </label>
        <InputText
          class="w-full md:w-[30rem]"
          :class="{ 'p-invalid': showError, 'mb-2': !showError }"
          :placeholder="placeholder"
          :value="modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          @blur="touched = true"
        />
        <p v-if="showError" class="text-red-500 text-sm mt-1">
            {{ errors.join(', ') }}
        </p>
    </div>
</template>
