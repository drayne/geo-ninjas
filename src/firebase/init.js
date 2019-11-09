import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "equi-geo-ninjas.firebaseapp.com",
    databaseURL: "https://equi-geo-ninjas.firebaseio.com",
    projectId: "equi-geo-ninjas",
    storageBucket: "equi-geo-ninjas.appspot.com",
    messagingSenderId: "485560300688",
    appId: "1:485560300688:web:fa96fe69e1073f29b4d415"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
