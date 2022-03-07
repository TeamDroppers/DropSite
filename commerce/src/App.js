import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Cart } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './components-merge/App.css';
import Nav from './components-merge/Nav';
import About from './components-merge/About';
import Shop from './components-merge/Shop';
//import Home from './components-merge/Home';
import Login from './components-merge/User/Login';
import Register from './components-merge/User/Register'
import Forgot from './components-merge/User/Forgot'
import Reset from './components-merge/User/Reset'
import Create from './components-merge/User/Admin/CreateEmployee'
import EmpRegister from './components-merge/User/Admin/EmployeeRegister'
import Contact from './components-merge/Contact'

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
      const { cart } = await commerce.cart.add(productId, quantity);

      setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
      const { cart } = await commerce.cart.update(productId,  { quantity });

      setCart(cart)
    }


    const handleRemoveFromCart = async (productId) => {
      const { cart } = await commerce.cart.remove(productId);

      setCart(cart)
    }

    const handleEmptyCart = async () => {
      const { cart } = await commerce.cart.empty();

      setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);


    return (
      <Router>
        <div className="App">
          <Nav totalItems= {cart.total_items} />
          <Routes>
            <Route path="/cart" element=
            {<Cart cart={cart} 
            handleUpdateCartQty={handleUpdateCartQty} 
            handleRemoveFromCart={handleRemoveFromCart} 
            handleEmptyCart={handleEmptyCart}/>} 
            />
            <Route exact path="/" element=
            {<Products products={products}
            onAddToCart={handleAddToCart}/>} 
            />
            <Route path="/about" element={<About/>}/>
            <Route path="/shop" element={<Shop/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/reset" element={<Reset/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/admin/create-employee" element={<Create/>}/>
            <Route path="/validate/employee" element={<EmpRegister/>}/>
          </Routes>
        </div>
      </Router>
    );

  // return (
  //   <Router>
  //     <div>
  //       <Navbar totalItems= {cart.total_items} />
  //       <Routes>
        
  //       <Route path="/cart" element=
  //       {<Cart cart={cart} 
  //       handleUpdateCartQty={handleUpdateCartQty} 
  //       handleRemoveFromCart={handleRemoveFromCart} 
  //       handleEmptyCart={handleEmptyCart}/>} 
  //       />
        
  //       <Route exact path="/" element=
  //       {<Products products={products}
  //        onAddToCart={handleAddToCart}/>} 
  //        />

  //       </Routes>
  //     </div>
  //   </Router>
  // );
}

export default App;
