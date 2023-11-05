/**
* Admin view, user management.
*/



<script lang="ts">
import { defineComponent } from 'vue'
import NavBarItem from '@/components/NavBarItem.vue'
import {
  getUsers,
  promoteUser as promoteUserRequest,
  deleteUser as deleteUserRequest
} from '@/service/AdminService'
import ConfirmationModal from '../components/ProccedModal.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAdmin } from '@/utils/isAdmin'
import type { User } from '@/model/user'

export default defineComponent({
  components: {
    NavBarItem,
    ConfirmationModal
  },
  setup() {
    const router = useRouter()

    const users = ref<User[]>([])
    const showModal = ref(false)
    const modalTitle = ref('')
    const modalMessage = ref('')
    const userForAction = ref<User | null>(null)
    const errorMessage = ref('')
    const successMessage = ref('')

    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        users.value = response.users
      } catch (error) {
        errorMessage.value = 'Retrieve Users Error: ' + error
      }
    }

    const countPurchases = (purchases?: User['purchases']): number => {
      if (!purchases || purchases.length === 0) {
        return 0
      }
      return purchases.length
    }

    const promoteUser = async (username: string) => {
      try {
        successMessage.value = `Promoting user: ${username}`
        await promoteUserRequest(username)
        successMessage.value = `User ${username} promoted successfully`

        await fetchUsers()
      } catch (error) {
        ;(errorMessage.value = `Promotion Error ${username}:`), error
      }
    }

    const deleteUser = async (username: string) => {
      try {
        successMessage.value = `Deleting user: ${username}`
        await deleteUserRequest(username)
        successMessage.value = `User ${username} deleted.`

        await fetchUsers()
      } catch (error) {
        errorMessage.value = `Deletion Error ${username}: ${error}`
      }
    }

    const showPromoteModal = (user: User): void => {
      userForAction.value = user
      modalTitle.value = `Promote "${user.username}"`
      modalMessage.value = `Confirm promotion: "${user.username}"?`
      showModal.value = true
    }

    const showDeleteModal = (user: User): void => {
      userForAction.value = user
      modalTitle.value = `Delete "${user.username}"`
      modalMessage.value = `Confirm Deletion "${user.username}"?`
      showModal.value = true
    }

    const handleProceed = (): void => {
      if (modalTitle.value.startsWith('Promote')) {
        if (userForAction.value) {
          promoteUser(userForAction.value.username)
        }
      } else if (modalTitle.value.startsWith('Delete')) {
        if (userForAction.value) {
          deleteUser(userForAction.value.username)
        }
      }

      showModal.value = false
      userForAction.value = null
    }

    const handleCancel = (): void => {
      showModal.value = false
      userForAction.value = null
    }
    onMounted(() => {
      if (!isAdmin()) {
        router.push('/library/books')
        console.log('Redirect to users page.')
      } else {
        fetchUsers()
      }
    })

    return {
      users,
      isAdmin,
      promoteUser,
      deleteUser,
      countPurchases,
      showModal,
      modalTitle,
      modalMessage,
      showPromoteModal,
      showDeleteModal,
      handleProceed,
      handleCancel,
      errorMessage,
      successMessage
    }
  }
})
</script>

<template>
  <div>
    <NavBarItem></NavBarItem>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Purchases</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ countPurchases(user.purchases) }}</td>
            <td>
              <button v-if="user.role === 'USER'" @click="showPromoteModal(user)">Promote</button>
              <button @click="showDeleteModal(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <ConfirmationModal
        v-if="showModal"
        :modalTitle="modalTitle"
        :modalMessage="modalMessage"
        @proceed="handleProceed"
        @cancel="handleCancel"
      ></ConfirmationModal>
    </div>
  </div>
</template>

<style scoped>
.content{
  display: flex;
  justify-content: center;
  margin-top:10rem;
}
</style>
