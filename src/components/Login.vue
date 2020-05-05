<template>
  <b-modal
    id="modal-login"
    ref="modal"
    title="Login"
    @show="resetForm"
    @hidden="resetForm"
    @ok="handleOk"
  >
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="email-input-group" label="Email" label-for="email-input">
        <b-form-input
          id="email-input"
          name="email-input"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          aria-describedby="email-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="email-live-feedback"
        >This is a required field and must be a valid email.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="password-input-group" label="Password" label-for="password-input">
        <b-form-input
          id="password-input"
          name="password-input"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          aria-describedby="password-live-feedback"
          type="password"
        ></b-form-input>

        <b-form-invalid-feedback
          id="password-live-feedback"
        >This is a required field and must be at least 6 characters.</b-form-invalid-feedback>
      </b-form-group>

      <!-- <b-button type="submit" variant="primary">Submit</b-button>
      <b-button class="ml-2" @click="resetForm()">Reset</b-button>-->
    </b-form>
  </b-modal>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
const fb = require("../firebaseConfig.js");

export default {
  name: "LoginModal",
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    async login() {
      try {
        const user = await fb.auth.signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        );
        console.log("Successfully logged-in user", user);
        this.$store.commit("login", user.user);
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    handleOk(bvModalEvt) {
      console.log("Handling ok");
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.onSubmit();
    },
    async onSubmit() {
      console.log("Handling submit");
      // Prevent modal from closing
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        console.log("There are errors!");
        return;
      }
      console.log(this.form);
      await this.login();
      this.$bvToast.toast(
        `Successfully logged in with email: ${this.form.email}`,
        {
          title: "Successfull Login",
          autoHideDelay: 5000
        }
      );

      this.$nextTick(() => {
        this.$bvModal.hide("modal-login");
      });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        password: null,
        email: null
      };

      this.$nextTick(() => {
        this.$bvModal.hide("modal-login");
        this.$v.$reset();
      });
    }
  }
};
</script>

<style>
</style>