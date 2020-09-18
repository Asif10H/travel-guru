import React, { useContext } from 'react';
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../Logo.png';
import './HeaderDark.css'


const HeaderDark = () => {
    const[loggedInUser,setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header-nav" >
        <Navbar className="navbar home-nav " bg="transparent" expand="lg">
        <Navbar.Brand style={{borderRadius:'20px'}} href="/home"><img className="travel-guru-logo" src={Logo} alt="travel-guru-logo"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link style={{color: 'white'}} href="#home">News</Nav.Link>
            <Nav.Link style={{color: 'white'}} href="#link">Destination</Nav.Link>
            <Nav.Link style={{color: 'white'}} href="#link">Blog</Nav.Link>
            <Nav.Link style={{color: 'white'}} href="#link">Contact</Nav.Link>
            
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                {loggedInUser.email?  <Nav.Link style={{color: 'white'}} href="#link">{loggedInUser.name}</Nav.Link>:
                <Link to='/login'><button className="login-submit-btn-header" > Log In</button></Link>
            }
                
            </Form>
        </Navbar.Collapse>
    </Navbar>
            
        </div>
    );
};

export default HeaderDark;