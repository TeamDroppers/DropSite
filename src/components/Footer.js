import React from "react";
import { Link, useLocation } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Creditcard from "@mui/icons-material/CreditCard";
import Payments from "@mui/icons-material/Payments";
import GTranslate from "@mui/icons-material/GTranslate";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import './App.css'
function Footer() {


  function Foot() {
    return (
      <section className="section footer text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h6>Follow Us</h6>
              {/* <ConnectWithoutContactIcon /> */}
  
              <div>
                <a href="https://twitter.com" target="_blank">
                  <TwitterIcon />
                </a>
              </div>
              <div>
                <a href="https://www.instagram.com" target="_blank">
                  <InstagramIcon />
                </a>
              </div>
              <div>
                <a href="https://www.facebook.com/login.php" target="_blank">
                  <FacebookIcon />
                </a>
              </div>
  
              <div>
                <a href="https://www.pinterest.com/login" target="_blank">
                  <PinterestIcon />
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <h6>Quick Links</h6>
  
              <div>
                <Link to="/"> Home </Link>
              </div>   
              <div>
                <Link to="/cart">Cart</Link>
              </div>           
              <div>
                <Link to="/cart">FAQ</Link>
              </div>
              <div>
                <Link to="/about">About</Link>
              </div>
              <div>
                <Link to="/contact">Contact</Link>
              </div>

            </div>
            <div className="col-md-4">
              <h6>Contact Information</h6>
  
              <div>
                <p className="text-white mb-1">DropShippers</p>
              </div>
  
              <div>
                <p className="text-white mb-1"> +1 (909) 537-5000</p>
              </div>
              <div>
                <p className="text-white mb-1">Dropshippers@gmail.com</p>
              </div>
              <div className="cards">
                <Creditcard/>
                <Payments/>
                <GTranslate/>
                <CardGiftcardIcon/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const location = useLocation();

  return (
    <>
      {/* {location.pathname !== '/' && <Foot/>}
      {location.pathname === '/' && <></>} */}
      <Foot/>
    </>
  );
}

export default Footer;