import React from 'react';
import { Button, Form,} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FakeData from '../FakeData/FakeData';
import './Booking.css'
import HeaderDark from '../HeaderDark/HeaderDark';
import Time from '../Time/Time';

const Booking = () => {
    const { Id } = useParams();
    const select = FakeData.filter(place => parseInt(place.key) === parseInt(Id))
    const bgImage = select[0].image
    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} >
           <HeaderDark></HeaderDark>
            <div className="row">
                <div className="col-md-5 col-sm-12 travel-place-description">
                    <h1 style={{color: 'white'}} >{select[0].place}</h1>
                    <p style={{color: 'white'}} >{select[0].description}</p>
                </div>
                <div className="col-md-7 col-sm-12">
                    <div className="booking-card">
                        <Form>
                            <Form.Group>
                                <Form.Label>Origin</Form.Label>
                                <Form.Control value="Dhaka" type="origin"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control value={select[0].place} type="origin"  />
                            </Form.Group>
                            <Time></Time>
                            <Link to='/hotel'>
                            <button  type="submit">
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