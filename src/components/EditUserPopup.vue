<template>
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Edit User</h4>
        <button type="button" class="close" @click="closePopup">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSaveChanges">
          <div class="form-group">
            <label for="editUserName">Username:</label>
            <input type="text" v-model="editedUser.userName" class="form-control" required>
            <span v-if="!editedUser.userName" class="error">Username is required</span>
          </div>
          <div class="form-group">
            <label for="editEmail">Email:</label>
            <input type="email" v-model="editedUser.email" class="form-control" required>
            <span v-if="!editedUser.email" class="error">Email is required</span>
          </div>
          <div class="form-group">
            <label for="editPassword">Password:</label>
            <input type="password" v-model="editedUser.pw" class="form-control" required>
            <span v-if="!editedUser.pw" class="error">Password is required</span>
            <span v-if="editedUser.pw && editedUser.pw.length < 6" class="error">Password must be at least 6 characters</span>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      editedUser: Object,
      updateUser: Function,
      closePopup: Function,
      saveChanges: Function,
    },
    methods: {
      handleSaveChanges() {
        // Complex validation
        if (!this.editedUser.userName || !this.editedUser.email || !this.editedUser.pw || this.editedUser.pw.length < 6) {
          alert("Please fill in all the required fields. Password must be at least 6 characters.");
          return;
        }
  
        this.saveChanges(this.editedUser);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  .error {
    color: #dc3545;
    font-size: 12px;
    }
  .modal-content {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    width: 70%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  
  .modal-title {
    margin: 0;
  }
  
  .close {
    color: #aaa;
    font-size: 24px;
    cursor: pointer;
  }
  
  .close:hover {
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  