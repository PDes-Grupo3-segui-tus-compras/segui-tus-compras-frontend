<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BasicInput from '@/components/BasicInput.vue';

const router = useRouter();

// Attributes
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Error handling
const backendErrors = ref({});
const defaultErrors = {
    name: [],
    email: [],
    password: [],
    confirmPassword: []
};
const errors = computed(() => {
    if (backendErrors.value && Object.keys(backendErrors.value).length > 0) {
        return { ...defaultErrors, ...backendErrors.value };
    } else {
        return {
            name: !name.value ? ['Name is required'] : [],
            email: !email.value || !/\S+@\S+\.\S+/.test(email.value) ? ['Email is not valid'] : [],
            password: password.value.length < 6 ? ['Password must be at least 6 characters long'] : [],
            confirmPassword: password.value !== confirmPassword.value ? ['Passwords do not match'] : []
        };
    }
});
const passwordTouched = ref(false);
const confirmPasswordTouched = ref(false);

const handleRegister = async () => {
    backendErrors.value = {};
    if (Object.values(errors.value).some((errArray) => errArray.length > 0)) return;
    try {
        const response = await axios.post('http://localhost:8000/api/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value
        });
        localStorage.setItem('token', response.data.token);
        await router.push('/');
    } catch (error) {
        if (error.response && error.response.data.error) {
            backendErrors.value = {
                ...defaultErrors,
                ...(error.response?.data?.error || {})
            };
        }
    }
};

</script>

<template>
    <FloatingConfigurator style="display: flex; flex-direction: row-reverse; padding: 10px" />

    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">

                    <div class="text-center mb-8">
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Create your account</div>
                        <span class="text-muted-color font-medium">Fill your info to register</span>
                    </div>
                    <div>
                        <BasicInput v-model="name" label="Name" placeholder="Your name" :errors="errors.name" />
                        <BasicInput v-model="email" type="email" label="Email" placeholder="Email" :errors="errors.email" />
                        <label for="password" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mt-4 mb-2">Contraseña</label>
                        <Password id="password" v-model="password" placeholder="Password" :toggleMask="true" class="mb-2" fluid :feedback="false" @blur="passwordTouched = true"></Password>
                        <p v-if="errors.password.length && passwordTouched" class="text-red-500 text-sm">{{ errors.password.join(', ') }}</p>
                        <label for="confirmPassword" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mt-7 mb-2">Confirmar Contraseña</label>
                        <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirm password" :toggleMask="true" class="mb-2" fluid :feedback="false" @blur="confirmPasswordTouched = true"></Password>
                        <p v-if="errors.confirmPassword.length && confirmPasswordTouched" class="text-red-500 text-sm">{{ errors.confirmPassword.join(', ') }}</p>
                        <Button label="Register" class="w-full mt-5" @click="handleRegister"></Button>
                        <div class="mt-4 text-center">
                            <span class="text-muted-color">Already have an account?</span>
                            <router-link to="/auth/login" class="text-primary ml-2">Log in</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
