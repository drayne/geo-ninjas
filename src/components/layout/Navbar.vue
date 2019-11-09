<template>
    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <router-link class="brand-logo left" :to="{name: 'GMap'}">GeoNinjas!</router-link>
                <ul class="right">
                    <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link> </li>
                    <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
                    <li v-if="user"><a>{{user.email}}</a></li>
                    <li v-if="user"><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "Navbar",
        data() {
            return {
                user: null
            }
        },
        methods: {
            logout() {
                firebase.auth().signOut().then(() => {
                    this.$router.push({name: 'Login'})
                })
            }
        },
        created() {
            // let user = firebase.auth().currentUser ne bi radilo, created() se okida jednom
            firebase.auth().onAuthStateChanged((user) => { //logged in, logged out
                if (user) {
                    this.user = user
                } else {
                    this.user = null
                }
            })
        }
    }
</script>

<style>
    .login{
        max-width: 400px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2.4em;
    }
    .login .field{
        margin-bottom: 16px;
    }
</style>