import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Logo from '../../Logo.png';
import './Home.css'
import Coxs from '../../Image/Coxs.png'
import FakeData from '../FakeData/FakeData'
import { Link } from 'react-router-dom';
import PlaceLink from '../PlaceLink/PlaceLink';
const Home = () => {
    return (
        <div className="img-fluid" style={{ backgroundImage: `url(${Coxs})` }}>
            <Navbar className="navbar" bg="transparent" expand="lg">
                <Navbar.Brand href="#home"><img className="travel-guru-logo" src={Logo} alt="travel-guru-logo"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">News</Nav.Link>
                        <Nav.Link href="#link">Destination</Nav.Link>
                        <Nav.Link href="#link">Blog</Nav.Link>
                        <Nav.Link href="#link">Contact</Nav.Link>
                        <Button>Login</Button>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        One of three columns
                    </div>
                    <div class="col-9">
                    {
                        FakeData.map(plc=><PlaceLink plc={plc}></PlaceLink>)
                    }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;