// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

//da ne bismo app rerender svaki put po promjeni nego jednom
//dodajemo prom koja ce sluziti za provjeru
let app = null

//wait for firebase auth to init before creating the app
//login logout register
firebase.auth().onAuthStateChanged(() => {
  /* u ovom trenutku se aplikacija renderuje */

  if (!app) {   //init app if not already created
    app = new Vue({
          el: '#app',
          router,
          components: { App },
          template: '<App/>'
        })
  }

})


