<template>
  <div>
    <h2>Add User</h2>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="userName">Username:</label>
        <input type="text" v-model="user.userName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="pw">Password:</label>
        <input type="password" v-model="user.pw" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      user: {
        userName: "",
        pw: "",
        email: "",
      },
    };
  },
  methods: {
    addUser() {
      axios.post("/users", this.user)
        .then(response => {
          console.log("User added successfully:", response.data);
          // Optionally, reset the form or perform other actions
          this.user = {
            userName: "",
            pw: "",
            email: "",
          };
        })
        .catch(error => {
          console.error("Error adding user:", error);
          if (error.response) {
            // The request was made, but the server responded with an error status
            alert(`Error: ${error.response.status} - ${error.response.data.message}`);
          } else if (error.request) {
            // The request was made but no response was received
            alert("Error: No response from the server. Please check your internet connection.");
          } else {
            // Something happened in setting up the request that triggered an error
            alert("Error: Unable to make the request. Please try again later.");
          }
        });
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
