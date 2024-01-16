<template>
  <div id="app" class="container">
    <div class="buttons">
      <router-link to="/users">
        <button>User Management</button>
      </router-link>
      <router-link to="/signin">
        <button>Sign In</button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 100% of the viewport height */
}

.container {
  max-width: 600px; /* Adjust as needed */
  margin: auto; /* Center the content horizontally */
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>

<script>
import SignIn from './components/SignIn.vue';
import AddUser from './components/AddUser.vue';
import UserList from './components/UserList.vue';

export default {
  components: {
    SignIn,
    AddUser,
    UserList,
  },
};
</script>

