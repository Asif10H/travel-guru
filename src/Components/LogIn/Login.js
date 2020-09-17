import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import './Login.css'
import HeaderLight from '../HeaderLight/HeaderLight';
import google from '../../Icon/google.png'
import fb from '../../Icon/fb.png'
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, initializeLoginFrameWork, signInWithEmailAndPassword } from './LoginManager';


const Login = () => {

    //User Array


    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })


    //Context Call and hooks

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }


    //Initialization of firebase

    initializeLoginFrameWork();


    //Google Sign In handler


    function googleSignIn() {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res,true)
            })
    }


    //Facebook Sign In handler

    function fbSignIn() {
        handleFbSignIn()
            .then(res => {
               handleResponse(res,true)
            })
    }

    //handleresponse

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
      }


    //Submit Button Handler


    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res,true)
                })

        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res,true)
                })
        }
        event.preventDefault();

    }


    //Email and password validation

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
        if (isFieldValid) {
            const newUserInfo = { ...user }
            if(event.target.name==="firstName"){
                newUserInfo.displayName = event.target.value
            }
            newUserInfo[event.target.name] = event.target.value
            setUser(newUserInfo)
        }

    }

    return (

        <div>
            <HeaderLight></HeaderLight>
            <div className="row">
                <div className="col-lg-4 col-sm-2"></div>
                <div className="col-lg-4 col-sm-8 login-form">
                    <Form onSubmit={handleSubmit}>
                        <p style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
                            {newUser ? "Create an Account" : "Log In"}
                        </p>
                        <Form.Group controlId="formBasicEmail">
                            {newUser && <Form.Label>First Name</Form.Label>}
                            {newUser && <Form.Control  onBlur={handleBlur} type="text" name="firstName" placeholder="Your First Name" />}
                            {newUser && <Form.Label>Last Name</Form.Label>}
                            {newUser && <Form.Control  onBlur={handleBlur} type="text" name="lastName" placeholder="Your Last Name" />}
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Enter email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                        </Form.Group>
                       
                    </Form>
                    <div className="row justify-content-center">
                    <input style={{ backgroundColor: '#F9A51A', padding: '10px 8px 10px 8px', border: '2px solid #F9A51A' }} onClick={handleSubmit} type="submit" value={newUser ? "Create an account" : "Login"} /> <br /><br />
                </div><br/>
                <p style={{ color: 'black' }} >{!newUser ? "Don't have an account?" : "Already Have an Account?"} <span className="toggle" onClick={() => setNewUser(!newUser)} >{!newUser ? 'Sign Up' : 'Login'}</span></p>
                <button style={{ backgroundColor: 'white' }} onClick={googleSignIn} > <img style={{ height: '20px', width: '20px' }} src={google} alt='google' ></img> Continue With Google</button>
                <hr />
                <button style={{ backgroundColor: 'white' }} onClick={fbSignIn}><img style={{ height: '20px', width: '20px' }} src={fb} alt='facebook'></img>  Continue With Facebook</button>
                </div>
                <div className="col-lg-4 col-sm-2"></div>
            </div>

            <br />

            



        </div>
    );
};
export default Login;