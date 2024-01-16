<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Task</h4>
            <button type="button" class="close" @click="closePopup">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSaveChanges">
              <div class="form-group">
                <label for="editTitle">Title:</label>
                <input type="text" v-model="editedTask.title" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editDescription">Description:</label>
                <textarea v-model="editedTask.description" class="form-control" required></textarea>
              </div>
              <div class="form-group">
                <label for="editDueDate">Due Date:</label>
                <input type="date" v-model="editedTask.dueDate" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="editTaskCategory">Category:</label>
                <select v-model="editedTask.taskCategory" class="form-control" required>
                  <option value="POS">POS</option>
                  <option value="DBI">DBI</option>
                  <option value="MATHE">MATHE</option>
                  <option value="NSCS">NSCS</option>
                  <option value="DEUTSCH">DEUTSCH</option>
                  <option value="NAWI">NAWI</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editTaskPriority">Priority:</label>
                <select v-model="editedTask.taskPriority" class="form-control" required>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      editedTask: Object,
      updateTask: Function,
      closePopup: Function,
    },
    methods: {
      handleSaveChanges() {
        this.updateTask(this.editedTask); // Emit the update-task event
        this.closePopup(); // Close the popup after saving changes
      },
    },
  };
  </script>
  
  <style scoped>
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
  