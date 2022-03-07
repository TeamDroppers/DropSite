import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signUserOut, userInfo } from './utilites';
import { IconButton, Badge } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
// import useStyles from '../components/Navbar/styles';
import './App.css';

const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'

const navStyle = {
    color: 'white'
}

function Nav({totalItems}){

    // const classes = useStyles();
    const location = useLocation();
    const [userLink, setUserLinks] = useState(<Empty/>);
    const [loginControl, setLoginButton] = useState(<LoginButton/>)

        useEffect(() => {
            fetchUser()
          }, [])

    const fetchUser = async()=>{
        await userInfo()              
        .then(user => {
            if(user.success){                
                setLoginButton(<LogoutButton/>);
                if(user.role >= 2)
                    setUserLinks(<UserLinks/>)
              } else {
                setLoginButton(<LoginButton/>);
              }
        })
    }
        
    function Empty(){
        return(
            <div className="removed"></div>
        );
        }
    
    function LoginButton() {
        return (
            <button className = "nav-button" onClick = {()=>{ if(window.location.pathname !== "/login") window.location = "/login"}}>
            Login
            </button>
        );
        }
        
        function LogoutButton() {
        return (
            <button className = "nav-button" 
            onClick = {()=>{
            signUserOut().then( ()=>{ window.location = "/"} )
            }}>
            Logout
            </button>
        );
        }
    
        function UserLinks(){
        return(
        <Link style={navStyle} to="/admin/create-employee">
        <li className = "nav-link">Admin</li>
        </Link>
        );
        }        
    
    return(
        <div name = "nav-container">
        <nav className = "topbar">
            <Link to = "/" ><img  alt = "logo" className = "nav--logo" src={logo} /></Link> 
            {location.pathname === '/' && (
            <div className = "searchbar-container">
                <input type="text" placeholder="Search.."/>
            </div>
            )}
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li className = "nav-link">Home</li>
                </Link>
                <Link style={navStyle} to="/about">
                    <li className = "nav-link">About</li>
                </Link>
                <Link style={navStyle} to="/contact">
                    <li className = "nav-link">Contact</li>
                </Link>
                {userLink}
                {location.pathname === '/' && (
                <div >
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton> 
                    
                </div>
                )}
                {loginControl}
            </ul>
            <div className ="dropdown-control" id = "dropdown-open">
                <button className = "dropdown-button" onClick={
                    ()=>{
                        (sideMenuOpen) ? sideMenuOpen = false: sideMenuOpen = true;
                        slideSideMenu(sideMenuOpen);
                        //document.querySelector("#dropdown-open").classList.toggle("removed")
                    }} >&#8801;</button>
            </div>
        </nav>
        <nav className = "sidemenu " id ="sidemenu" >
            <div className = {"dropdown-control"} id = "dropdown-close">
                <button className = "dropdown-button" onClick={
                    ()=>{
                        (sideMenuOpen) ? sideMenuOpen = false: sideMenuOpen = true;
                        slideSideMenu(sideMenuOpen);
                    }}>X</button>
            </div>
            {/* <Link to = "/" ><img  alt = "logo" className = "nav--logo" src={logo} /></Link>  */}
            <ul className="sidemenu-links">
                <Link style={navStyle} to="/">
                    <li className = "nav-link">Home</li>
                </Link>
                <Link style={navStyle} to="/about">
                    <li className = "nav-link">About</li>
                </Link>
                <Link style={navStyle} to="/contact">
                    <li className = "nav-link">Contact</li>
                </Link>
                <Link style={navStyle} to="/cart">
                    <li className = "nav-link">Shopping Cart</li>
                </Link>
                {userLink}
                {loginControl}
            </ul>

        </nav> 
        </div>
    ); 
    
}

/* Side Menu Animation */

let sideMenuOpen = false;
const slideSideMenu = ()=>{
    const sideMenu = document.getElementById('sidemenu');
    let pixels;
    if(sideMenuOpen){
        //sideMenu.classList.toggle('removed');
        pixels = sideMenu.getBoundingClientRect().left - sideMenu.getBoundingClientRect().right;
    }
    else{
        //sideMenu.classList.toggle('removed');
        pixels = 0;
    }
    sideMenu.style.transform = 'translateX(' + pixels  + 'px)';
}





// document.body.addEventListener('click', function (event) {
//     if (sideMenu.contains(event.target) || sideMenuOpenButton.contains(event.target)) {
//         console.log('clicked inside');
//     } else {
//         console.log('clicked outside');
//         if(sideMenuOpen){
//             slideSideMenu(false);
//             sideMenuOpen = false;
//         }
//     }
// });




// let width = $(window).width();
// let height = $(window).height();

// $( window ).resize(function() {
//     if ($(window).width() != width || $(window).height() != height) {
//         width = $(window).width();
//         height = $(window).height();
//         if(sideMenuOpen){
//         slideSideMenu(false);
//         sideMenuOpen = false;
//         }
//     }
// });

export default Nav;