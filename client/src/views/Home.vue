<template>
  <div class="container">
    <div class="header">
      <h2>USUARIOS</h2>
      <router-link style="margin: 0 -200px 0 100px;padding: 5px;border-radius:10px" to="/register">REGISTRAR</router-link>
    </div>

    <table v-if="users.length > 0" class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td style="text-align: center">
            <font-awesome-icon
              class="icon-button"
              @click="editUser(item)"
              icon="edit"
            />
            <font-awesome-icon
              class="icon-button"
              @click="deleteUser(item)"
              icon="trash"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="no-users">
      <span>Nenhum usuário cadastrado.</span>
    </div>

    <p v-if="users.length > 0" style="margin-top: 5px">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      users: [],
    };
  },
  created() {
    this.listUser();
  },
  methods: {
    listUser() {
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(user) {
      axios
        .delete(`http://localhost:3000/users/${user.id}`)
        .then((response) => {
          this.message = response.data;
          if (response.status === 200) {
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              this.users.splice(index, 1);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editUser(item) {
      this.$router.push(`/register/${item.id}`);
    },
  },
};
</script>

<style scoped>
.container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-table {
  width: 450px;
  border-collapse: separate;
  border-spacing: 5px;
  border-collapse: collapse;
}

td,
th {
  padding: 5px;
  border: 1px solid #a09f9f;
}

.icon-button {
  display: inline-block;
  cursor: pointer;
  margin: 0px 5px 0px 5px;
}

.delete-button {
  color: red;
}

.no-users {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
}

.header {
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
