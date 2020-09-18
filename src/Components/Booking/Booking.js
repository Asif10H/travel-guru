import React, { useContext } from 'react';
import {  Form} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FakeData from '../FakeData/FakeData';
import './Booking.css'
import HeaderDark from '../HeaderDark/HeaderDark';
import Time from '../Time/Time';
import { PlaceContext } from '../../App';

const Booking = () => {
    const { Id } = useParams();
    const selectedPlace = FakeData.filter(place => parseInt(place.key) === parseInt(Id))
    const bgImage = selectedPlace[0].image

    const [place,setPlace] = useContext(PlaceContext);

    setPlace(Id);


    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} >
           <HeaderDark></HeaderDark>
            <div className="row">
                <div className="col-md-5 col-sm-12 travel-place-description">
                    <h1 style={{color: 'white'}} >{selectedPlace[0].place}</h1>
                    <p style={{color: 'white'}} >{selectedPlace[0].description}</p>
                </div>
                <div className="col-md-7 col-sm-12">
                    <div className="booking-card">
                        <Form>
                            <Form.Group>
                                <Form.Label>Origin</Form.Label>
                                <Form.Control defaultValue="Dhaka" type="origin"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control defaultValue={selectedPlace[0].place} type="origin"  />
                            </Form.Group>
                            <Time></Time>
                            <Link to='/hotel'>
                            <button className="booking-btn" type="submit">
                                Start Booking
                            </button>
                            </Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;