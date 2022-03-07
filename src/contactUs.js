import React from 'react';
import './App.css';

const contactUs = () => {
    return (
        <div>
            <h1>Contact Us Page</h1>
            <body> 
                <form>
                    <label for="email">Please Enter Your Email:</label>
                    <br></br>
                    <input type="text" id="email" name="email" size="50"></input>
                    <br></br>
                    <label for="complaint">Please Specify Your Issue Below:</label>
                    <br></br>
                    <input type="text" id="complaint" name="complaint" size="50"></input> 
                </form>
            </body>
        </div>
    );
}

export default contactUs;