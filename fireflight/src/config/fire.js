import firebase from 'firebase'
const config = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCrydaAdKVQgdiI2npa_9VmovXTcB0Ud3M",
    authDomain: "wildfire-watch.firebaseapp.com",
    databaseURL: "https://wildfire-watch.firebaseio.com",
    projectId: "wildfire-watch",
    storageBucket: "wildfire-watch.appspot.com",
    messagingSenderId: "568880742365",
    appId: "1:568880742365:web:2a74932078260df0744034",
    measurementId: "G-CPM4G2YHCX"
};

const fire = firebase.initializeApp(config)
export default fire;