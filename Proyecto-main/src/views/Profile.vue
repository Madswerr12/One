<!-- Aqui esta pagina perfil-->
<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Configuracion de Cuenta</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>{{ role }}</span>
        </div>
        <div class="input">
          <label for="firstName">Primer Nombre:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Segundo Nombre:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Correo:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Guardar Cambios</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import firebase from "firebase/app";
import "firebase/firestore"; //
export default {
  name: "Profile",
  components: {
    Modal,
    adminIcon,
  },
  data() {
    return {
      modalMessage: "Changes were saved!",
      modalActive: null,
      role: "", 
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateUserSettings");
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },

    async fetchUserRole() {
      const user = firebase.auth().currentUser;
      if (user) {
        try {
          // Suponiendo que el campo `role` está dentro de un subdocumento de `users/{userId}/role`
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          
          // Asume que `role` es un campo directo dentro del documento de usuario
          const userRole = userDoc.data().role;

          if (userRole) {
            this.role = userRole; // Aquí se asigna el valor del rol
          } else {
            console.warn("No se encontró el rol del usuario.");
            this.role = "user"; // Valor por defecto
          }

        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
          this.role = "user"; // Asigna 'user' si hay algún error
        }
      }
    },
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },
    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit("changeUsername", payload);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
   
  },
  mounted() {
    this.fetchUserRole(); // Llamar a la función al montar el componente
  },
};
</script>
<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
