<script setup>
import ChangePasswordDialog from '@/components/ChangePasswordDialog.vue';
import { updatePassword } from '@/service/userService';
import { computed, onBeforeMount, ref } from 'vue';



onBeforeMount(async () => {
  /*if (props.userId != null && props.userId !== "") {
    const response = await fetchUserProfile(props.userId)
    profile.value = response;
  }*/
})

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  user:{
    type: Object,
    required: true,
  },
    editable: {
    type: Boolean,
    required: true
  },
});
const modelVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
});

const emit = defineEmits(['update:visible']);

const showChangePasswordDialog = ref(false);

async function handlePasswordChange({ oldPassword, newPassword , new_password_confirmation}) {
    console.log('Send to backend:', { oldPassword, newPassword });
    try {
        const response = await updatePassword({
            current_password: oldPassword,
            new_password: newPassword,
            new_password_confirmation: new_password_confirmation
        });
        showChangePasswordDialog.value = false;
    } catch (error) {
        if (error.response && error.response.data.error) {
            backendErrors.value = {
                ...defaultErrors,
                ...(error.response?.data?.error || {})
            };
        }
    }
}

function newChangePasswordDialog(){
    showChangePasswordDialog.value = true;

}

const profileDialogWidth = () => {
  if (window?.innerWidth <= 767) {
    return '90%'
  }
  if (window?.innerWidth <= 1300) {
    return '40%'
  }
  return '20%'
}

</script>


<template>
    <Dialog 
        v-model:visible="modelVisible"
        :style="{ width: profileDialogWidth() }"
        header="Profile"
        modal>
        <div class="flex flex-col gap-6">
            <div>
                <label for="name" class="block font-bold mb-3">{{user.name}} is an {{user.user_type}} </label>
            </div>
            <div>
                <label for="email" class="block font-bold mb-3">{{user.email}} </label>
            </div>
            <div>
                <label for="registerOn" class="block font-bold mb-3">{{user.created_at}} </label>
            </div>
            <div>
                <label v-if="user.purchases_count > 0" for="purchases_count" class="block font-bold mb-3">{{user.name}} has made {{user.purchases_count}} purchases</label>
                <label v-if="!user.purchases_count > 0" for="name" class="block font-bold mb-3">{{user.name}} has not made any purchases. Time to buy!</label>
            </div>
            <div>
                <label v-if="user.favourites_count > 0" for="favourites_count" class="block font-bold mb-3">{{user.name}} has favourited {{user.favourites_count}} products</label>
                <label v-if="!user.favourites_count > 0" for="name" class="block font-bold mb-3">{{user.name}} has not favourited any products. Time to favourite!</label>
            </div>
            <div>
                <label v-if="user.opinions_count > 0" for="opinions_count" class="block font-bold mb-3">{{user.name}} has opinated on {{user.opinions_count}} products</label>
                <label v-if="!user.opinions_count > 0" for="opinions_count" class="block font-bold mb-3">{{user.name}} has not opinated on any products. Time to opinate!</label>
            </div>
        </div>

        <template #footer>
            <Button label="Change Password" icon="pi pi-cog" @click="newChangePasswordDialog" />
        </template>
    </Dialog>
    <ChangePasswordDialog
    v-model:visible="showChangePasswordDialog"
    @submit="handlePasswordChange"
    />
</template>

<style scoped>

.favorite-game-title {
  font-size: 1.1rem;
  color: #bdc0c4;
  font-weight: 500;
}

.available-avatar {
  width: 9rem;
  height: 9rem;
  margin: 0.5rem;
  border-radius: 50%;
  padding: 0.5rem;
  transition-duration: 0.5s;
}
</style>