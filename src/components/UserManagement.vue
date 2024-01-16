<template>
    <div>
      <AddUser />
      <UserList />
    </div>
  </template>
  
  <script>
  import AddUser from './AddUser.vue';
  import UserList from './UserList.vue';
  
  export default {
    components: {
      AddUser,
      UserList,
    },
  };
  </script>
  
  