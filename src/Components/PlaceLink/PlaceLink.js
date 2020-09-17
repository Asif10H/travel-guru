import React from 'react';
import { Link } from 'react-router-dom';
import './PlaceLink.css';

const PlaceLink = (props) => {
    const images = props.plc.cardImage
    return (
        <div className='place-body' > 
        <Link to={`/booking/${props.plc.key}`}>
        <div style={{ backgroundImage: `url(${images})` }} className="card">
            <div className="container">
           
            <h4><b>{props.plc.place}</b></h4>
            </div>
        </div></Link>
        
        
        </div>

    );
};

export default PlaceLink;