/**
* NavBar, site navigation.
*/
<script lang="ts">
export default {
  methods: {
    handleLogout() {
      localStorage.removeItem('accessToken')
      this.$router.push('/')
    }
  }
}
</script>

<template>
    <div>
      <a href="http://localhost:5173/">Home</a>
      <a href="http://localhost:5173/auth/login">Login</a>
      <a href="http://localhost:5173/auth/register">Register</a>
      <a href="http://localhost:5173/library/books">Booklist</a>
      <a href="http://localhost:5173/admin/users">Profile</a>
      
      <button @click="handleLogout">Logout</button>
    </div>
  </template>
<style scoped>
div {
  background-color: rgb(166, 197, 247);
  height: 2rem;
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
}

a {
  font-size: 1rem;
  background-color: aliceblue;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: black;
}
</style>
