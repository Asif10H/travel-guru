import React from 'react';
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


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/booking/:Id' >
            <Booking></Booking>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
