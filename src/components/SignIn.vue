<template>
  <div>
    <h2 v-if="signedIn">Signed in as: {{ credentials.userName }}</h2>
    <h2 v-else>Sign In</h2>

    <form v-if="!signedIn" @submit.prevent="signIn" class="form">
      <div class="form-group">
        <label for="userName">Username:</label>
        <input type="text" v-model="credentials.userName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="pw">Password:</label>
        <input type="password" v-model="credentials.pw" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>

    <div v-if="signedIn" class="task-section">
      <h3>Add Task</h3>
      <form @submit.prevent="addTask" class="form">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" v-model="newTask.title" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="newTask.description" class="form-control" required></textarea>
        </div>
        <div class="form-group">
          <label for="dueDate">Due Date:</label>
          <input type="date" v-model="newTask.dueDate" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="taskCategory">Category:</label>
          <select v-model="newTask.taskCategory" class="form-control" required>
            <option value="POS">POS</option>
            <option value="DBI">DBI</option>
            <option value="MATHE">MATHE</option>
            <option value="NSCS">NSCS</option>
            <option value="DEUTSCH">DEUTSCH</option>
            <option value="NAWI">NAWI</option>
          </select>
        </div>
        <div class="form-group">
          <label for="taskPriority">Priority:</label>
          <select v-model="newTask.taskPriority" class="form-control" required>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Add Task</button>
      </form>

      <h3>All Tasks</h3>
      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <strong>{{ task.title }}</strong>
          <p>{{ task.description }}</p>
          <p>Due Date: {{ task.dueDate }}</p>
          <p>Category: {{ task.taskCategory }}</p>
          <p>Priority: {{ task.taskPriority }}</p>
          <button @click="editTask(task)" class="btn btn-warning">Edit Task</button>
          <button @click="deleteTask(task.id)" class="btn btn-danger">Delete Task</button>
        </li>
      </ul>

      <div v-if="editTaskModal">
        <div class="modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Task</h4>
              </div>
              <div class="modal-body">
                <!-- Pass necessary props to the EditTaskPopup component -->
                <edit-task-popup
                  :is-visible="editTaskModal"
                  :edited-task="editedTask"
                  :update-task="updateTask"
                  :close-popup="closeEditTaskModal"
                ></edit-task-popup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';
import EditTaskPopup from './EditTaskPopup.vue';

export default {
  components: {
    EditTaskPopup,
  },
  data() {
    return {
      credentials: {
        userName: '',
        pw: '',
      },
      signedIn: false,
      newTask: {
        title: '',
        description: '',
        dueDate: '',
        taskCategory: '',
        taskPriority: '',
      },
      userId: null,
      tasks: [],
      editTaskModal: false,
      editedTask: {
        id: null,
        title: '',
        description: '',
        dueDate: '',
        taskCategory: '',
        taskPriority: '',
      },
    };
  },
  methods: {
    signIn() {
      axios.post("/users/signin", this.credentials)
        .then(response => {
          console.log("Sign-in successful:", response.data);
          this.signedIn = true;
          this.userId = response.data.id;
          this.fetchTasks(); // Fetch tasks when the user signs in
        })
        .catch(error => {
          console.error("Error signing in:", error);
        });
    },
    addTask() {
      const taskData = {
        ...this.newTask,
        userId: this.userId, // Set the userId to the currently signed-in user
      };

      axios.post("/tasks", taskData)
        .then(response => {
          console.log("Task added successfully:", response.data);
          this.newTask = {
            title: '',
            description: '',
            dueDate: '',
            taskCategory: '',
            taskPriority: '',
          };
          this.fetchTasks(); // Fetch tasks after adding a new task
        })
        .catch(error => {
          console.error("Error adding task:", error);
        });
    },
    deleteTask(taskId) {
      axios.delete(`/tasks/${taskId}`)
        .then(response => {
          console.log("Task deleted successfully:", response.data);
          this.fetchTasks(); // Refresh the task list after deletion
        })
        .catch(error => {
          console.error("Error deleting task:", error);
        });
    },
    editTask(task) {
      this.editedTask = { ...task };
      this.editTaskModal = true;
    },
    closeEditTaskModal() {
      this.editTaskModal = false;
    },
    updateTask(updatedTaskData) {
      axios.put(`/tasks/${updatedTaskData.id}`, updatedTaskData)
        .then(response => {
          console.log("Task updated successfully:", response.data);
          this.editTaskModal = false;
          this.fetchTasks(); // Refresh the task list after updating
        })
        .catch(error => {
          console.error("Error updating task:", error);
          console.log("Request details:", error.config);
        });
    },
    fetchTasks() {
      axios.get('/tasks')
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 400px;
  margin: auto;
}

.task-section {
  margin-top: 20px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Add your component-specific styles here */
</style>
