import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';
import Home from './Home';
import Cart from './Cart';
import Login from './User/Login';
import Register from './User/Register'
import Forgot from './User/Forgot'
import Reset from './User/Reset'
import Create from './User/Admin/CreateEmployee'
import EmpRegister from './User/Admin/EmployeeRegister'


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/> {/*only render home page when "/" is only used */}
          <Route path="/about" component={About}/>
          <Route path="/shop" component={Shop} />
          <Route path="/shoppingcart" component={Cart}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/forgot" component={Forgot}/>
          <Route path="/reset" component={Reset}/>
          <Route path="/admin/create-employee" component={Create}/>
          <Route path="/validate/employee" component={EmpRegister}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
