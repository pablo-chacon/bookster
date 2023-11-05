/**
* Login view.
*/

<script lang="ts">
import { defineComponent } from 'vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import NavBarItem from '@/components/NavBarItem.vue'
import { isAdmin } from '@/utils/isAdmin'
import { login } from '../service/AuthService'

export default defineComponent({
  name: 'LoginView',
  components: {
    InputFieldItem,
    NavBarItem
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      // Check inputField value.
      if (this.username.trim() === '' || this.password.trim() === '') {
        console.error('Username and password are required')
        return // Guardian class at code start/end.
      }
      
      try {
        //Login func.
        const accessToken = await login(this.username, this.password)
        // localStorage token
        localStorage.setItem('accessToken', accessToken)

        // Role based redirection.
        if (isAdmin()) {
          this.$router.push('/admin/books')
          console.log('Admin user logged in')
        } else {
          this.$router.push('/library/books')
          console.log('Guest user logged in')
        }
        console.log('Authentication successful')
      } catch (error: any) {
        console.error('Authentication error:', error.message)
      }
    },
    proceedAsGuest() {
      this.$router.push('/guest/books')
    }
  }
})
</script>
<template>
  <div>
    <nav>
      <NavBarItem />
    </nav>
    <div class="form">
      <form class="login-form" @submit.prevent="handleLogin">
        <h1>Login</h1>
        <div class="input-form">
            <div class="field-arround-input">
                <InputFieldItem class="input-field" v-model:value="username" type="text" placeholder="Username..." />
                <InputFieldItem class="input-field" v-model:value="password" type="password" placeholder="Password..." />
            </div>
            <p>Sign up <a href="http://127.0.0.1:9000/auth/register"></a></p>
        </div>
        <button class="form-btn" id="login-btn" type="submit">Login</button>
        <button class="form-btn" id="proceed-as-guest-btn" @click="proceedAsGuest">
          Proceed as guest.
        </button>
      </form>
    </div>
  </div>
</template>
<style>

#login-btn {
  margin-top: 1rem;

}
.form-btn {
 padding: 0.5rem;
 width: 50%;
  margin-top: 1rem;
  background-color: rgb(144, 145, 146);
  border-radius: 0.2rem;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10rem;
  background-color: rgb(197, 243, 222);
  width: 360px;
  padding: 1rem;
  border-radius: 0.3rem;
}
.input-form{
    width: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

}
input{
    width: 80%;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.2rem;
    border: solid 1.5px rgba(0, 0, 0, 0.551);
}
.field-arround-input{
    width:90%;
}
p{
    font-size: 18px;
}

</style>
