import { TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import HeaderLight from '../HeaderLight/HeaderLight';
import { initializeLoginFrameWork } from './LoginManager';
import fb from '../../Icon/fb.png'
import google from '../../Icon/google.png'


const Login = () => {
    const [user, setLoggedInUser] = useContext(UserContext)
    const [haveAccount, setAccount] = useState(false)

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    
    initializeLoginFrameWork()

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const createdUser = result.user;
                const newUserInfo = { ...user } 
                newUserInfo.name = createdUser.displayName;
                newUserInfo.email = createdUser.email
                setLoggedInUser(newUserInfo) 
                history.replace(from); 
            })
            .catch(function (error) {
                const newUserInfo = { ...user } 
                newUserInfo.error = error.message;
                setLoggedInUser(newUserInfo)
            });
    }

    const handleSignUp = (e) => {
        if (user.password === user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = "Your account has been created successfully!"
                    newUserInfo.name = `${user.first} ${user.last}`
                    setLoggedInUser(newUserInfo)
                    updateUserName(`${user.first} ${user.last}`) 
                    verifyEmail()
                    history.replace(from)
                })
                .catch(function (error) {
                    const newUserInfo = { ...user }
                    const errorMessage = error.message;
                    newUserInfo.error = errorMessage
                    newUserInfo.success = ''
                    setLoggedInUser(newUserInfo)
                });
        }
        else {
            const newUserInfo = { ...user }
            newUserInfo.error = "Password didn't match"
            setLoggedInUser(newUserInfo)
        }
        e.preventDefault()
    }

    const handleSignIn = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user }
                newUserInfo.error = ''
                newUserInfo.success = "You have logged in successfully!"
                newUserInfo.name = res.user.displayName
                setLoggedInUser(newUserInfo)
                history.replace(from)
            })
            .catch(function (error) {
                const newUserInfo = { ...user }
                const errorMessage = error.message;
                newUserInfo.error = errorMessage
                newUserInfo.success = ''
                setLoggedInUser(newUserInfo)
            });
        e.preventDefault()
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(result => {
                const createdUser = result.user;
                const newUserInfo = { ...user }
                newUserInfo.email = createdUser.email
                newUserInfo.name = createdUser.displayName
                newUserInfo.success = "You are now logged in successfully"
                setLoggedInUser(newUserInfo)
                history.replace(from)
                console.log(newUserInfo)
                console.log(createdUser)
            })
            .catch(error => {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message
                setLoggedInUser(newUserInfo)
            });
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
    }

    const verifyEmail = () => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
        .then(()=>{
            const newUserInfo = { ...user }
            newUserInfo.success = 'A verification email has been sent to your email address'
            setLoggedInUser(newUserInfo)
        })
    }

    const resetPassword = () => {
        const auth = firebase.auth();
        const emailAddress = user.email;

        auth.sendPasswordResetEmail(emailAddress)
            .then(() => {
                const newUserInfo = { ...user }
                newUserInfo.success = 'A password reset email has been sent to your email address'
                setLoggedInUser(newUserInfo)
            })
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'password') {
            isFormValid = e.target.value.length > 5
            if (e.target.value.length <= 5) {
                const newUserInfo = { ...user }
                newUserInfo.error = "Password can't be less than 6 characters"
                setLoggedInUser(newUserInfo)
            }
        }
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value
            newUserInfo.error = ''
            setLoggedInUser(newUserInfo)
        }
    }

    return (
        <div className='container'>
            <HeaderLight></HeaderLight>
            <div className="booking-login-form">
                <div className="login-page-inner">
                    <h3 className='login-page-title'>Create an account</h3>
                    <form onSubmit={haveAccount ? handleSignIn : handleSignUp}>
                        {
                            !haveAccount &&
                            <>
                                <TextField required onBlur={handleBlur} autoComplete="off" style={{ marginTop: '40px' }} name='first' id="standard-basic" label="First Name" />
                                <TextField required onBlur={handleBlur} autoComplete="off" style={{ marginTop: '33px' }} name='second' id="standard-basic" label="Last Name" />
                            </>
                        }
                        <TextField required onBlur={handleBlur} autoComplete="off" style={{ marginTop: '33px' }} name='email' type='email' id="standard-basic" label="Username or Email" />
                        <TextField required onBlur={handleBlur} autoComplete="off" style={{ marginTop: '33px' }} name='password' type='password' id="standard-basic" label="Password" />
                        {
                            haveAccount &&
                            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <input style={{ width: '18px' }} type="checkbox" name="remember" id="" />
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                                <div>
                                    <p onClick={resetPassword} className="forget-password">Forget Password</p>
                                </div>
                            </div>
                        }
                        {!haveAccount && <TextField required onBlur={handleBlur} autoComplete="off" style={{ marginTop: '33px' }} name='confirmPassword' type='password' id="standard-basic" label="Confirm Password" />}
                        {!haveAccount ? <input type="submit" value="Create an Account" className="submit-btn" /> : <input type="submit" value="Log In" className="submit-btn" />}
                    </form>
                    <p className='about-account'>{!haveAccount ? "Already have an account?" : "Create An Account"} <span style={{ color: '#F9A51A', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setAccount(!haveAccount)}>{!haveAccount ? "Login" : "Sign Up"}</span></p>
                </div>
                {user.error && <p style={{ color: 'red', textAlign: 'center' }}>{user.error}</p>}
                {user.success && <p style={{ color: 'green', textAlign: 'center' }}>{user.success}</p>}
                <div className="or">
                    <div style={{ width: '200px', height: '1px', border: '1px solid #AAAAAA', marginTop: '37px' }}></div>
                    <p style={{ marginTop: '37px', paddingTop: '15px' }}>Or</p>
                    <div style={{ width: '200px', height: '1px', border: '1px solid #AAAAAA', marginTop: '37px' }}></div>
                </div>
                <div className='continue-with-facebook' onClick={handleFbSignIn}> <img className="google-facebook-logo" src={fb} alt="fb-logo"></img>  <p>Continue With Facebook</p></div>
                <div style={{ marginBottom: '50px' }} onClick={handleGoogleSignIn} className='continue-with-google'> <img className="google-facebook-logo" src={google} alt="google-logo"></img><p>Continue With Google</p></div>
            </div>
        </div>
    );
};

export default Login;