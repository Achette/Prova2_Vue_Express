<template>
  <div class="container">
    <div>
      <div class="back-button-container">
        <button class="back-button" @click="goBack">
          <font-awesome-icon
            class="icon-button"
            @click="editUser(item)"
            icon="arrow-left-long"
          />
          Voltar
        </button>
      </div>

      <div class="form-container">
        <form @submit.prevent="submitForm" class="user-form">
          <input placeholder="Nome" type="text" v-model="formData.name" />
          <input placeholder="Email" type="email" v-model="formData.email" />
          <input
            placeholder="Senha"
            type="password"
            v-model="formData.password"
          />
          <button type="submit">{{ formTitle }}</button>
        </form>
      </div>
    </div>
    <p style="margin-left: 0">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      formData: {
        id: null,
        name: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    // Verificar se existe um ID de usuário na rota
    if (this.$route.params.id) {
      this.loadUser(this.$route.params.id);
    }
  },
  methods: {
    loadUser(id) {
      axios
        .get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          const user = response.data;
          this.formData.id = user.id;
          this.formData.name = user.name;
          this.formData.email = user.email;
          this.formData.password = user.password;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      if (this.formData.id) {
        this.updateUser();
      } else {
        this.registerUser();
      }
    },
    registerUser() {
      axios
        .post("http://localhost:3000/users", this.formData)
        .then((response) => {
          this.message = response.data.msg;
          if (
            response.status === 200 &&
            response.data.msg !== "Usuario ja cadastrado."
          ) {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
          this.message = error.message;
        });
    },
    updateUser() {
      axios
        .put(`http://localhost:3000/users/${this.formData.id}`, this.formData)
        .then((response) => {
          this.message = response.data.msg;
          if (response.status === 200) {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
          this.message = error.message;
        });
    },
    goBack() {
      this.$router.push("/");
    },
  },
  computed: {
    formTitle() {
      return this.formData.id ? "EDITAR" : "REGISTRAR";
    },
  },
};
</script>

<style>
.container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.back-button-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-left: 0px;
}

.back-button {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  color: #333;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 10px;
}

.back-button:hover {
  background-color: #e6e6e6;
}

.back-button .icon-button {
  margin-right: 5px;
}

.icon-button {
  display: inline-block;
  cursor: pointer;
  margin: 0px 5px 0px 5px;
}

.form-container {
  width: 450px;
  margin-bottom: 10px;
}

.user-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

.user-form input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.user-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.user-form button:hover {
  background-color: #0056b3;
}
</style>
