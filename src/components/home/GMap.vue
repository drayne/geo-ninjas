<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import db from '@/firebase/init'
    export default {
        name: "GMap",
        data() {
            return {
                lat: 53,
                lng: -2
            }
        },
        methods: {
            renderMap() {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: this.lat, lng: this.lng},
                    zoom: 6,
                    maxZoom: 15,
                    minZoom: 3,
                    streetViewControl: false
                })

                db.collection('users').get().then(users => {
                    users.forEach((doc) => {
                        let data = doc.data()
                        if (data.geolocation) {
                            let marker = new google.maps.Marker({
                                position: {
                                    lat: data.geolocation.lat,
                                    lng: data.geolocation.lng
                                }, map //postavi marker na mapu
                            })
                            //add click event to marker
                            marker.addListener('click', () => {
                                // console.log(doc.id);//slug
                                this.$router.push({name: 'ViewProfile', params: { id: doc.id }})
                            })
                        }
                    })
                })
            }
        },
        mounted() {
            //get current user
            // console.log(firebase.auth().currentUser);
            let user = firebase.auth().currentUser
            //get user geolocation
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    this.lat = position.coords.latitude
                    this.lng = position.coords.longitude

                    //find the user record and then update geocoords
                    db.collection('users').where('user_id', '==', user.uid).get()
                        .then(snapshot => {
                            snapshot.forEach((doc) => { //moramo loop jer dobijamo kolekciju iako ocekujemo jednog
                                // console.log(doc.id); //slug
                                db.collection('users').doc(doc.id).update({
                                    geolocation: {
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                    }
                                })
                            })
                        })
                        .then(() => {
                            this.renderMap()
                        })
                }, (err) => {
                    console.log(err);
                    this.renderMap()
                }, {maximumAge : 6000, timeout: 3000})
            } else {
                //location not found -  default values
                this.renderMap()
            }

            // console.log(firebase.auth().currentUser)
            // setTimeout(() => {
            //     console.log(firebase.auth().currentUser);
            // }, 2000)

        }
    }
</script>

<style scoped>
 .google-map{
     width: 100%;
     height: 100%;
     margin: 0 auto;
     background: #fff;
     position: absolute;
     top: 0;
     left: 0;
     z-index: -1;
 }
</style>