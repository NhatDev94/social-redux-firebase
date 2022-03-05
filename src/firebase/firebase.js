import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getDatabase, push, ref, set } from 'firebase/database'
import { getDownloadURL, listAll, uploadBytes } from 'firebase/storage'
import { getStorage, ref as sref } from 'firebase/storage'

const config = {
    apiKey: "AIzaSyCDJtdWvUuUOF747mWEeEMQnQwO_GP8zyY",
    authDomain: "social-redux.firebaseapp.com",
    databaseURL: "https://social-redux-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "social-redux",
    storageBucket: "social-redux.appspot.com",
    messagingSenderId: "748117715091",
    appId: "1:748117715091:web:aa4feed27318f965884566"
}

const app = initializeApp(config)

const db = getDatabase()
const storage = getStorage()
const auth = getAuth(app)

const userRef = ref(db, 'user')
const postRef = ref(db, 'posts')


const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
}

const facebookSignIn = () => {
    const provider = new FacebookAuthProvider()
    return signInWithPopup(auth, provider)
}

const addNewUser = (user) => {
    const pushRef = push(userRef)
    set(pushRef, user)
}

const addNewPost = (post) => {
    const pushRef = push(postRef)
    set(pushRef, post)
}

const addNewComment = (post, path) => {
    const postRefUpdate = ref(db, `posts/${path}`)
    set(postRefUpdate, post)
}

const upload = (file) => {
    if (!file) {
        return
    }
    const imgRef = sref(storage, 'img/' + `${file.name}`)
    return uploadBytes(imgRef, file)
}

const getImgURL = (name) => {
    const imgRef = sref(storage, 'img/' + `${name}`)
    return getDownloadURL(imgRef)
}

export { 
    googleSignIn, 
    facebookSignIn,
    userRef, 
    postRef, 
    addNewUser, 
    addNewPost, 
    addNewComment, 
    upload, 
    getImgURL }