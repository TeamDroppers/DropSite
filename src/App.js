import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import axios from 'axios'
import { Products, Cart, Checkout, Favorites } from './components';
import { About, Contact, Footer, Nav, Forgot, Login, Register, Reset, CreateEmployee, EmployeeRegister } from './components-merge';
import { userInfo } from './components-merge/utilites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './components-merge/App.css';



const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [favorites, setFavorites] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        console.log("Products from fetch: ")
        console.log(data)
        setProducts(data);
    }

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    }

    const fetchFavorites = async () => {
      let token = localStorage.getItem('token');
      if(token){
        try {
          const { data } = await axios.get('https://droppers-node.herokuapp.com/api/v1/auth/favorites',{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if(data)
          {
            let favorites = [];
            for(const favorite of data.favorites){
              await commerce.products.list({
                query: favorite.item_id,
              }).then( (product)=>{
                  favorites.push(product.data[0]);
              });
            }  
            console.log("Favorites after conversion: ");
            console.log(favorites);
            setFavorites(favorites);
          }
        }
        catch(err){
          console.error(err);
        }
      }
    }
    const handleAddToFavorites = async (productId, quantity) => {
      console.log(productId)
      const user = await userInfo();
      try{
        const { data } = await axios.post('https://droppers-node.herokuapp.com/api/v1/auth/favorites',{
          item_id:productId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(data);

        const matchingItems = favorites.filter( favorite => favorite['id'] === productId );
        if(matchingItems.length > 0){
          const removeItem = favorites.filter( favorite => favorite['id'] !== productId );
          setFavorites(removeItem);
        }
        else{
          await commerce.products.list({
            query: productId,
          }).then( (product)=>{
              favorites.push(product.data[0]);
          });
          setFavorites(favorites);
        }
      }
      catch(err){
        console.error(err);
      }
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
        fetchFavorites();
    }, []);


    return (
      <Router>
        <div className="App">
          <Nav totalItems= {cart.total_items} />
          <div className="main-container">
          <Routes>
            <Route path="/cart" element=
            {<Cart cart={cart} 
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
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}/>}
            />
            <Route exact path="/favorites" element=
            {<Favorites products={favorites}
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
            <Route path="/validate/employee" element={<EmployeeRegister/>}/>
          </Routes>
          </div>
          <Footer/>
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
