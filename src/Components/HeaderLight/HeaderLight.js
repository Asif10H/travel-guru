import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './HeaderLight.css';
import Logo from '../../Logo.png';
import { UserContext } from '../../App';


const HeaderLight = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header-light-nav'>
        <Navbar className="navbar" bg="transparent" expand="lg">
        <Navbar.Brand href="/home"><img className="travel-guru-logo-light" src={Logo} alt="travel-guru-logo"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">News</Nav.Link>
            <Nav.Link href="#link">Destination</Nav.Link>
            <Nav.Link href="#link">Blog</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            <Nav.Link href="#link">{loggedInUser.name}</Nav.Link>

            </Nav>
        </Navbar.Collapse>
    </Navbar>
            
        </div>
    );
};

export default HeaderLight;