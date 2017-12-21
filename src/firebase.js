import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBBJsF28NkuwTww0VP9iXgGJyNsvQyTPLQ",
    authDomain: "machshop-2876a.firebaseapp.com",
    databaseURL: "https://machshop-2876a.firebaseio.com",
    projectId: "machshop-2876a",
    storageBucket: "machshop-2876a.appspot.com",
    messagingSenderId: "358130993280"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth()

export default firebase;