import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'

function Nav() {
    
    const navStyle = {
        color: 'white'
    }

    return(
        <nav>
            <Link to = "/" ><img  alt = "logo" className = "nav--logo" src={logo} /></Link> 
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                <li>Home</li>
                </Link>
                <Link style={navStyle} to="/about">
                    <li>About</li>
                </Link>
                <Link style={navStyle} to="/shop">
                    <li>Shop</li>
                </Link>
                <Link style={navStyle} to="/shoppingcart">
                    <li>Shopping Cart</li>
                </Link>
                <Link style={navStyle} to="/login">
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    ); 
}

export default Nav;