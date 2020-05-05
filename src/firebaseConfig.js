import firebase from 'firebase'
import 'firebase/firestore'
// firebase init goes here
const config = {
    apiKey: "AIzaSyAupYDB7Nc2gsKVH6D-1JJcjBU2wh1_-p8",
    authDomain: "dashboard-93854.firebaseapp.com",
    databaseURL: "https://dashboard-93854.firebaseio.com",
    projectId: "dashboard-93854",
    storageBucket: "dashboard-93854.appspot.com",
    messagingSenderId: "643019393709",
    appId: "1:643019393709:web:030937853f1c077f791424",
    measurementId: "G-HF3B20KPN8"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.database();
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    // usersCollection,
    // postsCollection,
    // commentsCollection,
    // likesCollection
}