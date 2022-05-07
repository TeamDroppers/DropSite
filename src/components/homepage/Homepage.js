import React from 'react';

import { Footer, Blog, Possibility, Features, WhatDroppers, Header } from './containers';
import { CTA, Brand } from './components';

import './Homepage.css';

function Homepage() {
  return (
  <>
  <div className='homepage-container'>
    <header>
      <a href="#" > <img src="/logo192.png"  class ="logo"/> </a>
      <div className='homepage-header-links'>
        <a href="/" class="active">HOME</a>
        <a href="#sec">What is Droppers ?</a>
        <a href="/store">Store</a>
        <a href="/contact">Contact Us</a>
        <a href="/faq">FAQ</a>
      </div>
    </header>
    <section class ="homepage-section">
      <img src="/logo192.png"  id="logo"/>
      <h2 id="text"> Droppers</h2>
      <a href="/login" id="btn">Sign in</a>      
      
    </section>
    <div class="sec" id="sec">
      <h2>The global standard of checkout</h2>
      <p>  Droppers is the culmination of months of hard work creating the next generation of automated checkout software, designed to make your retail more effective. Droppers has over 1000 people who requested access a visit in the last 24 hours.
        However, This is only the beginning for Droppers , as we continue to modify the site to the genral public. We will continue to make adjustments to our store. For more information click  the FAQ. </p>
      <a href="/about" className='homepage-button'>More</a>
    </div>
    </div>
  </>

  );
}

export default Homepage;
