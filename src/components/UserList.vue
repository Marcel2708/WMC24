<template>
  <div>
    <h2>User List</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(user.id)" class="btn btn-warning">Edit</button>
              <button @click="deleteUser(user.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="fetchUsers" class="btn btn-secondary mt-3">Fetch Users</button>

    <!-- Edit User Modal -->
    <div v-if="editUserModal">
      <div class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit User</h4>
            </div>
            <div class="modal-body">
              <!-- Pass necessary props to the EditUserPopup component -->
              <edit-user-popup
                :is-visible="editUserModal"
                :edited-user="editedUser"
                :update-user="updateUser"
                :close-popup="closeEditUserModal"
                :save-changes="saveChanges"
              ></edit-user-popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';
import EditUserPopup from './EditUserPopup.vue';

export default {
  components: {
    EditUserPopup,
  },
  data() {
    return {
      userList: [],
      editUserModal: false,
      editedUser: {
        id: null,
        userName: '',
        pw: '',
        email: '',
      },
    };
  },
  methods: {
    fetchUsers() {
      axios.get("/users")
        .then(response => {
          this.userList = response.data;
          console.log("Users fetched successfully:", this.userList);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          this.handleRequestError(error);
        });
    },
    deleteUser(userId) {
      axios.delete(`/users/${userId}`)
        .then(response => {
          console.log("User deleted successfully:", response.data);
          this.fetchUsers(); // Refresh the user list after deletion
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          this.handleRequestError(error);
        });
    },
    editUser(userId) {
      axios.get(`/users/${userId}`)
        .then(response => {
          this.editedUser = { ...response.data };
          this.editUserModal = true;
        })
        .catch(error => {
          console.error("Error fetching user details:", error);
          this.handleRequestError(error);
        });
    },
    updateUser() {
      axios.put(`/users/${this.editedUser.id}`, this.editedUser)
        .then(response => {
          console.log("User updated successfully:", response.data);
          this.editUserModal = false;
          this.fetchUsers(); // Refresh the user list after updating
        })
        .catch(error => {
          console.error("Error updating user:", error);
          this.handleRequestError(error);
        });
    },
    closeEditUserModal() {
      this.editUserModal = false;
    },
    saveChanges(updatedUserData) {
      axios.put(`/users/${updatedUserData.id}`, updatedUserData)
        .then(response => {
          console.log("User updated successfully:", response.data);
          this.editUserModal = false;
          this.fetchUsers(); // Refresh the user list after updating
        })
        .catch(error => {
          console.error("Error updating user:", error);
          this.handleRequestError(error);
        });
    },
    handleRequestError(error) {
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
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.table {
  margin-top: 20px;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-dialog {
  position: relative;
  padding: 20px;
  width: 50%;
}

.modal-content {
  background-color: #fefefe;
  border: 1px solid #888;
  width: 100%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
  text-decoration: none;
}
</style>
