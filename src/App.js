import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';
import Home from './Home';
import Cart from './Cart';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/> //only render home page when "/" is only used
          <Route path="/about" component={About}/>
          <Route path="/shop" component={Shop} />
          <Route path="/shoppingcart" component={Cart}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
