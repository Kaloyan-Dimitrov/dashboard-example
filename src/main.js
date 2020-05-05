import Vue from 'vue'
import App from './App.vue'
import {
  BootstrapVue,
  IconsPlugin
}
from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'

const fb = require('./firebaseConfig.js')

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentUser: null,
    layout: [{
        x: 0,
        y: 0,
        w: 2,
        h: 3,
        i: "0"
      },
      {
        x: 2,
        y: 0,
        w: 2,
        h: 4,
        i: "1"
      },
      {
        x: 4,
        y: 0,
        w: 2,
        h: 5,
        i: "2"
      },
      {
        x: 6,
        y: 0,
        w: 2,
        h: 3,
        i: "3"
      },
      {
        x: 8,
        y: 0,
        w: 2,
        h: 3,
        i: "4"
      },
      {
        x: 10,
        y: 0,
        w: 2,
        h: 3,
        i: "5"
      },
      {
        x: 0,
        y: 5,
        w: 2,
        h: 5,
        i: "6"
      },
      {
        x: 2,
        y: 5,
        w: 2,
        h: 5,
        i: "7"
      },
      {
        x: 4,
        y: 5,
        w: 2,
        h: 5,
        i: "8"
      },
      {
        x: 6,
        y: 3,
        w: 2,
        h: 4,
        i: "9"
      },
      {
        x: 8,
        y: 4,
        w: 2,
        h: 4,
        i: "10"
      },
      {
        x: 10,
        y: 4,
        w: 2,
        h: 4,
        i: "11"
      },
      {
        x: 0,
        y: 10,
        w: 2,
        h: 5,
        i: "12"
      },
      {
        x: 2,
        y: 10,
        w: 2,
        h: 5,
        i: "13"
      },
      {
        x: 4,
        y: 8,
        w: 2,
        h: 4,
        i: "14"
      },
      {
        x: 6,
        y: 8,
        w: 2,
        h: 4,
        i: "15"
      },
      {
        x: 8,
        y: 10,
        w: 2,
        h: 5,
        i: "16"
      },
      {
        x: 10,
        y: 4,
        w: 2,
        h: 3,
        i: "17"
      },
      {
        x: 0,
        y: 9,
        w: 2,
        h: 3,
        i: "18"
      },
      {
        x: 2,
        y: 6,
        w: 2,
        h: 3,
        i: "19"
      }
    ],
    defaultLayout: [{
        x: 0,
        y: 0,
        w: 2,
        h: 3,
        i: "0"
      },
      {
        x: 2,
        y: 0,
        w: 2,
        h: 4,
        i: "1"
      },
      {
        x: 4,
        y: 0,
        w: 2,
        h: 5,
        i: "2"
      },
      {
        x: 6,
        y: 0,
        w: 2,
        h: 3,
        i: "3"
      },
      {
        x: 8,
        y: 0,
        w: 2,
        h: 3,
        i: "4"
      },
      {
        x: 10,
        y: 0,
        w: 2,
        h: 3,
        i: "5"
      },
      {
        x: 0,
        y: 5,
        w: 2,
        h: 5,
        i: "6"
      },
      {
        x: 2,
        y: 5,
        w: 2,
        h: 5,
        i: "7"
      },
      {
        x: 4,
        y: 5,
        w: 2,
        h: 5,
        i: "8"
      },
      {
        x: 6,
        y: 3,
        w: 2,
        h: 4,
        i: "9"
      },
      {
        x: 8,
        y: 4,
        w: 2,
        h: 4,
        i: "10"
      },
      {
        x: 10,
        y: 4,
        w: 2,
        h: 4,
        i: "11"
      },
      {
        x: 0,
        y: 10,
        w: 2,
        h: 5,
        i: "12"
      },
      {
        x: 2,
        y: 10,
        w: 2,
        h: 5,
        i: "13"
      },
      {
        x: 4,
        y: 8,
        w: 2,
        h: 4,
        i: "14"
      },
      {
        x: 6,
        y: 8,
        w: 2,
        h: 4,
        i: "15"
      },
      {
        x: 8,
        y: 10,
        w: 2,
        h: 5,
        i: "16"
      },
      {
        x: 10,
        y: 4,
        w: 2,
        h: 3,
        i: "17"
      },
      {
        x: 0,
        y: 9,
        w: 2,
        h: 3,
        i: "18"
      },
      {
        x: 2,
        y: 6,
        w: 2,
        h: 3,
        i: "19"
      }
    ]
  },
  mutations: {
    async login(state, user) {
      state.currentUser = user;
      console.log(await (await fb.db.ref(`users/${state.currentUser.uid}/layout`).once('value')).val())
      state.layout = JSON.parse((await fb.db.ref(`users/${state.currentUser.uid}/layout`).once('value')).val());
    },
    signout(state) {
      state.currentUser = null;
    },
    async register(state, user) {
      fb.db.ref(`users/${user.uid}`).set({
        email: user.email,
        layout: state.defaultLayout
      })
    },
    layoutSave(state, layout) {
      state.layout = layout;
      fb.db.ref(`users/${state.currentUser.uid}`).update({
        layout: JSON.stringify(layout)
      })
    },
    changeToDefaultLayout(state) {
      state.layout = state.defaultLayout;
    }
  }
})


Vue.config.productionTip = false
let app
fb.auth.onAuthStateChanged(user => {
  console.log(user);
  if (user != null) {
    if (store.state.currentUser === null) store.commit('login', user);
  }
  if (user == null) {
    store.commit('changeToDefaultLayout')
  }
  if (!app) {
    app = new Vue({
      render: h => h(App),
      store
    }).$mount('#app')
  }
});