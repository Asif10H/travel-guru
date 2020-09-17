import React, { useContext } from 'react';
import './Hotel.css';
import roomOne from '../../Image/roomOne.png'
import roomTwo from '../../Image/roomTwo.png'
import roomThree from '../../Image/roomThree.png'
import HeaderLight from '../HeaderLight/HeaderLight';
// import { PlaceContext } from '../../App';
import FakeData from '../FakeData/FakeData';
// import Map from '../Map/Map';
import star from '../../Icon/star.png'



const Hotel = () => {
    // const [place, setPlace] = useContext(PlaceContext);

    // const placeArray = FakeData.filter(plc => parseInt(plc.key) === parseInt(place))


    // {placeArray[0].length && <h1>Book a Room in {placeArray[0].place}</h1>}

    // <Map></Map>


    return (
        <div>
            <HeaderLight></HeaderLight>
            <hr></hr>
            <div className="row book-room">
                <div className="col-6">
               
                    <div className="row room-details">
                        <div className="col-6"> <img className="img-fluid" src={roomOne} alt='hotel-room'></img> </div>
                        <div className="col-6"> <div className="book-room-details">
                            <p>4 Guests 2 Bedrooms 2 Beds 2 Baths</p>
                            <p>Wifi Air Conditioned Kitchen</p>
                            <p>Cancellation Flexibility Available</p>
                            <p><img src={star} alt='star'></img> 4.9(20) | $34/night</p>
                        </div> </div>
                    </div>
                    <div className="row room-details">
                        <div className="col-6"> <img className="img-fluid" src={roomTwo} alt='hotel-room'></img> </div>
                        <div className="col-6"> <div className="book-room-details">
                            <p>3 Guests 2 Bedrooms 2 Beds 2 Baths</p>
                            <p>Wifi Air Conditioned Kitchen</p>
                            <p>Cancellation Flexibility Available</p>
                            <p><img src={star} alt='star'></img> 4.7(70) | $27/night</p>

                        </div></div>
                    </div>
                    <div className="row room-details">
                        <div className="col-6"> <img className="img-fluid" src={roomThree} alt='hotel-room'></img> </div>
                        <div className="col-6"><div className="book-room-details">
                            <p>2 Guests 1 Bedrooms 2 Beds 2 Baths</p>
                            <p>Wifi Air Conditioned Kitchen</p>
                            <p>Cancellation Flexibility Available</p>
                            <p><img src={star} alt='star'></img> 4.8(50) | $22/night</p>

                        </div> </div>
                    </div>
                </div>
                <div className="col-6">
                

                </div>
            </div>
        </div>
    );
};

export default Hotel;

