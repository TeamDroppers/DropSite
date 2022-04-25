import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css'
//npm install emailjs-com --save

const Landing = () => {


    return (
        <div className = "background">
            <form className='landing-container'>
            <h1>Admin</h1>
                <div className='options'>
                    <Link className='option' to='/admin/create-employee'>Create Employee</Link>
                    <Link className='option' to='/admin/modify-employee'>Modify Employee</Link>
                    <Link className='option' to='/admin/store'>Modify Store</Link>
                    <Link className='option' to='/admin/orders'>View Orders</Link>
                </div>
            </form>
        </div>
    );
}

export default Landing;