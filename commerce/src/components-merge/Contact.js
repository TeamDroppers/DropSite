import React from 'react';
import './App.css';
import './User/user-form.css';

const h1Style = {
    margin: '2rem 0' 
}

const contactUs = () => {
    return (
        <div className = "background">
            <div className="user-form">
                    <form>
                        <h1 style={h1Style}>Contact Us</h1>
                        <label for="email">Please Enter Your Email:</label>
                        <br></br>
                        <input type="text" id="email" name="email" size="50"></input>
                        <br></br>
                        <label for="complaint">Please Specify Your Issue Below:</label>
                        <br></br>
                        <input type="text" id="complaint" name="complaint" size="50"></input> 
                        <br></br>
                        <button type="submit" className = "submit">Submit Claim</button>
                    </form>
            </div>
        </div>
    );
}

export default contactUs;