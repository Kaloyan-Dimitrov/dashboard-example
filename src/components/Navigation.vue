<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="this.$store.state.currentUser == null">
          <b-nav-item href="#" v-b-modal.modal-login>Login</b-nav-item>
          <b-nav-item href="#" v-b-modal.modal-register>Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <!-- <b-button
            variant="success"
            class="mr-4"
            @click="$emit('saveDashboard')"
          >Save dashboard layout</b-button>-->
          <b-nav-item href="#">Hello, {{this.$store.state.currentUser.email}}</b-nav-item>
          <b-nav-item href="#" @click="SignOut()">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <RegisterModal></RegisterModal>
    <LoginModal></LoginModal>
  </div>
</template>

<script>
import RegisterModal from "./Register.vue";
import LoginModal from "./Login.vue";
import { auth, currentUser } from "../firebaseConfig";
export default {
  name: "navigation",
  data() {
    return {
      currentUser
    };
  },
  components: {
    RegisterModal,
    LoginModal
  },
  methods: {
    async SignOut() {
      const result = await this.$bvModal.msgBoxConfirm(
        "Are you sure you want to sign out.",
        {
          title: "Sign out",
          size: "bg",
          buttonSize: "bg",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        }
      );
      if (result) {
        await auth.signOut();
        this.$store.commit("signout");
        this.$bvToast.toast(`Successfully signed out of your profile`, {
          title: "Successfull Signout",
          autoHideDelay: 5000
        });
      }
    }
  }
};
</script>

<style scoped>
</style>