import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../../item.css'
import './profile.css'

const Profile = ({user}) => {
    useEffect(() => {

    }, [user]);


  return (
    <div className="profile-container">
        <div className='profile-form'>
          <Link to="/orders" className="profile-button">
              View Orders
          </Link>
          <div className="profile-details">
            <h1>Details</h1>
              <div className="field-formatter">
                <label>First Name</label>
                <input placeholder={user.firstName}></input>
              </div>
              <div className="field-formatter">
                <label>Last Name</label>
                <input placeholder={user.lastName}></input>
              </div>
              <div className="field-formatter">
                <label>Email</label>
                <input placeholder={user.email}></input>
              </div>
              <button className="profile-button"> Save Changes </button>
          </div>
        </div>
    </div>

  );
}

export default Profile;
