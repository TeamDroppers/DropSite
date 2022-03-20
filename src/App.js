import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Cart, Checkout, Favorites } from './components';
import { About, Contact, Footer, Nav, Forgot, Login, Register, Reset, CreateEmployee, ModifyEmployee, EmployeeRegister } from './components-merge';
import { userInfo, updateFavorites } from './components-merge/utilites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './components-merge/App.css';



const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isLoggedIn, setUserLoggedIn] = useState(false)

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    }

    const fetchUser = async () => {
      await userInfo()
      .then(async (user)=>{
        console.log(user)
        setUserLoggedIn(user.isLoggedIn);
        let favorites = [];
        if(user.favorites.length === 0)
          {
            setFavorites(favorites);
            return;
          }
        for(const favorite of user.favorites){
          await commerce.products.list({
            query: favorite.item_id,
          }).then( (product)=>{
              favorites.push(product.data[0]);
          });
        }  
        // console.log("Favorites after conversion: ");
        // console.log(favorites);
        setFavorites(favorites);
      })
    }

    const handleAddToFavorites = async (productId) => { 
      const matchingItems = favorites.filter( favorite => favorite['id'] === productId );
      let updatedFavorites = favorites
      if(matchingItems.length > 0){
        updatedFavorites = updatedFavorites.filter( favorite => favorite['id'] !== productId );
      }
      else{
          const matchingProduct = products.filter(product => product.id === productId) 
          console.log(matchingProduct)
          updatedFavorites.push(matchingProduct[0]);
      }
      setFavorites(updatedFavorites);
      updateFavorites(productId);
      return updatedFavorites;
    }

    const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);

      setCart(item.cart);
    };

    const handleUpdateCartQty = async (lineItemId, quantity) => {
      const response = await commerce.cart.update(lineItemId, { quantity });

      setCart(response.cart);
    };

    const handleRemoveFromCart = async (lineItemId) => {
      const response = await commerce.cart.remove(lineItemId);

      setCart(response.cart);
    };

    const handleEmptyCart = async () => {
      const response = await commerce.cart.empty();

      setCart(response.cart);
    };

    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();

      setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

        setOrder(incomingOrder);

        refreshCart();

      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
        fetchUser();
    }, []);


    return (
      <Router>
        <div className="App">
          <Nav totalItems= {cart.total_items} />
          <div className="main-container">
          <Routes>
            <Route path="/cart" element=
            {<Cart cart={cart} 
            isLoggedIn={isLoggedIn}
            favorites={favorites}
            handleUpdateCartQty={handleUpdateCartQty} 
            handleRemoveFromCart={handleRemoveFromCart} 
            handleEmptyCart={handleEmptyCart}
            handleAddToFavorites={handleAddToFavorites}/>} 
            />
            <Route exact path="/checkout" element={<Checkout 
            cart={cart} 
            order={order} 
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}/>}
            />
            <Route exact path="/" element=
            {<Products products={products}
            isLoggedIn={isLoggedIn}
            favorites={favorites}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}/>}
            />
            <Route exact path="/favorites" element=
            {<Favorites favorites={favorites}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}/>}
            />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/reset" element={<Reset/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/admin/create-employee" element={<CreateEmployee/>}/>
            <Route path="/admin/modify-employee" element={<ModifyEmployee/>}/>
            <Route path="/validate/employee" element={<EmployeeRegister/>}/>
          </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    );

}

export default App;
