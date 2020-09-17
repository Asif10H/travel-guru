import React from 'react';
import './Home.css'
import Coxs from '../../Image/Coxs.png'
import FakeData from '../FakeData/FakeData'
import PlaceLink from '../PlaceLink/PlaceLink';
import HeaderDark from '../HeaderDark/HeaderDark';
const Home = () => {
    return (
        <div className="img-fluid" style={{ backgroundImage: `url(${Coxs})` }}>
        <HeaderDark></HeaderDark>
            <div className="container">
                <div className="row travel-place-cards">
                    <div className="col-12">
                    <h1 style={{color: 'white',textAlign: 'center'}} >Where Do You Want To Go?</h1>
                    {
                        FakeData.map(plc=><PlaceLink key={plc.key} plc={plc}></PlaceLink>)
                    }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;