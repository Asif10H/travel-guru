import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FakeData from '../FakeData/FakeData';

const Booking = () => {
    const {Id} = useParams();
    // const [selectedPlace,setSelectedPlace] = useState({})
    // useEffect(() =>{
    //     const filteredPlace = FakeData.filter(place =>parseInt(place.key) === parseInt(Id))
    //     setSelectedPlace(filteredPlace)
    // },[])
    // console.log(selectedPlace);
    const select = FakeData.filter(place => parseInt(place.key) === parseInt(Id))
    console.log(select[0].place);
    return (
        <div>
        <h1>Lol</h1>
        <h1>{select[0].place}</h1>
        </div>
    );
};

export default Booking;