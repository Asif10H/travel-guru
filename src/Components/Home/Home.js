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
            <div class="container">
                <div class="row travel-place-cards">
                    <div class="col-12">
                    <h1 style={{color: 'white',textAlign: 'center'}} >Where Do You Want To Go?</h1>
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