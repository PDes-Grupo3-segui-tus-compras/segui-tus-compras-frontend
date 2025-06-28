<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    visible: Boolean,
});
const emit = defineEmits(['update:visible', 'submit']);

const modelVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
});

const oldPassword = ref('');
const password = ref('');
const confirmPassword = ref('');
const oldPasswordTouched = ref(false);
const passwordTouched = ref(false);
const confirmPasswordTouched = ref(false);
const submitted = ref(false);
const errors = ref({
    oldPassword: [],
    password: [],
    confirmPassword: []
});

function validatePassword() {
    errors.value.oldPassword = [];
    errors.value.password = [];
    errors.value.confirmPassword = [];

    if (password.value.length < 6) {
        errors.value.password.push('Password must be at least 6 characters.');
    }

    if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword.push('Passwords do not match.');
    }

    return errors.value.password.length === 0 && errors.value.confirmPassword.length === 0;
}

function save() {
    submitted.value = true;

    if (!validatePassword()) {
        errors.value.password.push('Old password do not match.');
        return;
    }
    emit('submit', {
        oldPassword: oldPassword.value,
        newPassword: password.value,
        new_password_confirmation: confirmPassword.value
    });
}

function resetForm() {
    oldPassword.value = '';
    password.value = '';
    confirmPassword.value = '';
    oldPasswordTouched.value = false;
    passwordTouched.value = false;
    confirmPasswordTouched.value = false;
    submitted.value = false;
    errors.value = {
        oldPassword: [],
        password: [],
        confirmPassword: []
    };
}

</script>

<template>
    <Dialog v-model:visible="modelVisible" :style="{ width: '450px' }" header="Change Password" modal @hide="resetForm">
        <div class="flex flex-col gap-6">
            <div>
                <label class="block font-bold mb-3">Old Password</label>
                <Password v-model="oldPassword" placeholder="oldPassword" :toggleMask="true" class="mb-2" :feedback="false" @blur="oldPasswordTouched = true" />
                <p v-if="errors.oldPassword.length && oldPasswordTouched" class="text-red-500 text-sm">{{ errors.oldPassword.join(', ') }}</p>
            </div>

            <div>
                <label class="block font-bold mb-3">New Password</label>
                <Password v-model="password" placeholder="New password" :toggleMask="true" class="mb-2" :feedback="false" @blur="passwordTouched = true" />
                <p v-if="errors.password.length && passwordTouched" class="text-red-500 text-sm">{{ errors.password.join(', ') }}</p>
            </div>

            <div>
                <label class="block font-bold mb-3">Confirm Password</label>
                <Password v-model="confirmPassword" placeholder="Confirm password" :toggleMask="true" class="mb-2" :feedback="false" @blur="confirmPasswordTouched = true" />
                <p v-if="errors.confirmPassword.length && confirmPasswordTouched" class="text-red-500 text-sm">{{ errors.confirmPassword.join(', ') }}</p>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="modelVisible = false" />
            <Button label="Save" icon="pi pi-check" @click="save" />
        </template>
    </Dialog>
</template>