import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Form } from 'react-bootstrap';
import './Login.css'
import HeaderLight from '../HeaderLight/HeaderLight';


const SignUp = () => {
    const [newUser,setNewUser] = useState(true);
    const [user,setUser] = useState({
        isSignedIn: false,
        name:'',
        email:'',
        password:'',
        photo:''
    })
 

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn =() => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
            const {displayName,email} = result.user;
            const signedInUser = {name:displayName,email:email}
            setLoggedInUser(signedInUser)
            history.replace(from);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    const handleFbSignIn = () =>{
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            const {displayName,email} = result.user;
            const signedInUser = {name:displayName,email:email}
            setLoggedInUser(signedInUser)
            history.replace(from);
            console.log(user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.message);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    

    const handleSubmit = (event) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo);
                history.replace(from);

            })
            .catch(error=> {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error=error.message;
                newUserInfo.success=false;
                setUser(newUserInfo);

                // ...
              });


        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo);
                history.replace(from);


            })
            .catch(function(error) {
                // Handle Errors here.
                const newUserInfo = {...user};
                newUserInfo.error=error.message;
                newUserInfo.success=false;
                setUser(newUserInfo)
                // ...
              });
        }


        
        event.preventDefault();

    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
          isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
          const isPasswordValid = event.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(event.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
    
        }
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[event.target.name] = event.target.value
            setUser(newUserInfo)
        }

    }
    
    return (
        
        <div>
        <HeaderLight></HeaderLight>
    <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
        <div className="form-card">
        <p style={{color: 'black' , textAlign: 'center',fontWeight: 'bold'}}>
        {newUser? "Create an Account" : "Log In" }
        </p>
    <Form onSubmit={handleSubmit} >
    <div className="row justify-content-center">
    {
        newUser && <input type="text" name="first-name" id="" placeholder="First name" />
    }
    </div><br/>
    <div className="row justify-content-center">
    {
        newUser && <input type="text" name="last-name" id="" placeholder="Last name" />
    }
    </div><br/>
    <div className="row justify-content-center">
    <input type="text" onBlur={handleBlur} name="email" placeholder="Email Address" required />
    </div><br/>
    <div className=" row justify-content-center">
    <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
    </div><br/>
    <div className="row justify-content-center">
    <input type="submit" value={newUser?"Sign Up" : "Login"}/><br/><br/>
    </div><br/><br/>
    <div className="row justify-content-left">
    </div>
    </Form>
    <p style={{color: 'black'}} >{!newUser?"Don't have an account?" : "Already Have an Account?"} <a href="#" onClick={()=> setNewUser(!newUser) } >{!newUser? 'Sign Up' : 'Login'}</a></p>
    <button onClick={handleGoogleSignIn} >Continue With Google</button><br/><br/>
            <p style={{textAlign: 'center'}}>Or,</p>
            <button onClick={handleFbSignIn}>Continue With Facebook</button>
    
    </div>
        </div>
        <div className="col-4"></div>
    </div>
    
    <br/>

    <p style={{color: 'red'}} >{user.error}</p>


            
        </div>
    );
};
export default SignUp;