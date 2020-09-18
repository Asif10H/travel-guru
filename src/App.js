import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from './Components/NotFound/NotFound';
import Booking from './Components/Booking/Booking';
import Hotel from './Components/Hotel/Hotel';
import Login from './Components/LogIn/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import GoogleMap from './Components/Map/GoogleMap';

export const UserContext = createContext();

export const PlaceContext = createContext();

function App(props) {
  const [loggedInUser,setLoggedInUser] = useState({});

  const [place,setPlace] = useState({});
  
 
  return (
    <div className="App">
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <PlaceContext.Provider value ={[place,setPlace]}>
    
      <Router>
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/booking/:Id' >
            <Booking></Booking>
          </Route>
          <PrivateRoute path='/hotel'>
          <Hotel></Hotel>
          </PrivateRoute>
          <Route path='/login'>
          <Login></Login>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/map'>
          <GoogleMap></GoogleMap>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </PlaceContext.Provider>
      
      </UserContext.Provider>

    </div>
  );
}

export default App;
