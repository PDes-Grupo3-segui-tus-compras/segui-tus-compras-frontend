<script setup>
import { updatePassword } from '@/service/userService';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';

const toast = useToast();
const props = defineProps({
    visible: Boolean,
});
const emit = defineEmits(['update:visible', 'submit']);

const modelVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
});

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const currentPasswordTouched = ref(false);
const newPasswordTouched = ref(false);
const confirmNewPasswordTouched = ref(false);
const submitted = ref(false);
const errors = ref({
    currentPassword: [],
    newPassword: [],
    confirmNewPassword: []
});

async function handlePasswordChange() {
    try {
        const response = await updatePassword({
            current_password: currentPassword.value,
            new_password: newPassword.value,
            new_password_confirmation: confirmNewPassword.value
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully!', life: 3000 });
        emit('update:visible', false);
        resetForm();
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value.currentPassword.push('The old password is incorrect');
        }
        toast.add({ severity: 'error', summary: 'Failure', detail: 'Something went wrong try again later', life: 3000 });
    }
}

function validatePassword() {
    errors.value.currentPassword = [];
    errors.value.newPassword = [];
    errors.value.confirmNewPassword = [];

    if (!currentPassword.value) {
        errors.value.currentPassword.push('Current password is required');
    }

    if (!newPassword.value) {
        errors.value.newPassword.push('Please type your new password');
    }

    if (!confirmNewPassword.value) {
        errors.value.confirmNewPassword.push('Please confirm new password');
    }

    if (newPassword.value.length < 6) {
        errors.value.newPassword.push('Password must be at least 6 characters');
    }
    

    if (newPassword.value !== confirmNewPassword.value) {
        errors.value.confirmNewPassword.push('Passwords do not match');
    }

    return errors.value.newPassword.length === 0 && errors.value.confirmNewPassword.length === 0&& errors.value.currentPassword.length === 0;
}

function save() {
    submitted.value = true;

    if (!validatePassword()) {
        return;
    }
    handlePasswordChange()
}

function resetForm() {
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
    currentPasswordTouched.value = false;
    newPasswordTouched.value = false;
    confirmNewPasswordTouched.value = false;
    submitted.value = false;
    errors.value = {
        currentPassword: [],
        newPassword: [],
        confirmNewPassword: []
    };
}

function isAnyFieldEmpty(){
    return currentPassword.value == "" || newPassword.value == "" || confirmNewPassword.value == "";
}

</script>

<template>
    <Dialog v-model:visible="modelVisible" :style="{ width: '450px' }" header="Change Password" modal @hide="resetForm">
        <div class="flex flex-col gap-6">
            <div>
                <label class="block font-bold mb-3">Old Password</label>
                <Password v-model="currentPassword" placeholder="Old password" :errors="errors.currentPassword" :toggleMask="true" class="mb-2" :feedback="false" @blur="currentPasswordTouched = true" />
                <p v-if="errors.currentPassword.length && currentPasswordTouched" class="text-red-500 text-sm">{{ errors.currentPassword.join(', ') }}</p>
            </div>

            <div>
                <label class="block font-bold mb-3">New Password</label>
                <Password v-model="newPassword" placeholder="New password" :errors="errors.newPassword" :toggleMask="true" class="mb-2" :feedback="false" @blur="newPasswordTouched = true" />
                <p v-if="errors.newPassword.length && newPasswordTouched" class="text-red-500 text-sm">{{ errors.newPassword.join(', ') }}</p>
            </div>

            <div>
                <label class="block font-bold mb-3">Confirm Password</label>
                <Password v-model="confirmNewPassword" placeholder="Confirm password" :errors="errors.confirmNewPassword" :toggleMask="true" class="mb-2" :feedback="false" @blur="confirmNewPasswordTouched = true" />
                <p v-if="errors.confirmNewPassword.length && confirmNewPasswordTouched" class="text-red-500 text-sm">{{ errors.confirmNewPassword.join(', ') }}</p>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="modelVisible = false" />
            <Button label="Save" icon="pi pi-check" @click="save" :disabled="isAnyFieldEmpty()" />
        </template>
    </Dialog>
</template>