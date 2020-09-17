import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

}

export const handleGoogleSignIn =() => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider).then(function(result) {
        const {displayName,email,photoURL} = result.user;
        const signedInUser = {
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL
        }
        return signedInUser
      }).catch(function(error) {
        
      });
}

export const handleFbSignIn = () =>{
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        const {displayName,email,photoURL} = result.user;
        const signedInUser = {
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL
        }
        return signedInUser
      }).catch(function(error) {
        
      });
}

export const createUserWithEmailAndPassword = (name,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res=>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo
    })
    .catch(error=> {
        // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        return newUserInfo

        // ...
      });
}

export const signInWithEmailAndPassword = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo
    })
    .catch(function(error) {
        const newUserInfo = {};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        return newUserInfo
      });
}