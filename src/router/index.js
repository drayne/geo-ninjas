import Vue from 'vue'
import Router from 'vue-router'
import GMap from "../components/home/GMap";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import firebase from 'firebase'
import ViewProfile from "../components/profile/ViewProfile";

Vue.use(Router)

// export default new Router({
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'GMap',
            component: GMap,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/profile/:id',
            name: 'ViewProfile',
            component: ViewProfile,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    //check if route requires auth
    if (to.matched.some(rec => rec.meta.requiresAuth)) { //true ako je meta.requiresAuth true
        //check auth state of user
        let user = firebase.auth().currentUser
        if (user) {
            //user is signed in, proceed to route
            next()
        } else {
            //no user signed in, redirect to login
            next({ name: 'Login'})
        }
    } else { //route doesn't require login
        next()
    }
})

export default router
