import React from 'react';
import './Login.css';

const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'

const login = async (email, password) =>{
    try{
    const response = await fetch(`https://droppers-node.herokuapp.com/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email:email, password:password}),
      })
      const data = await response.json()
      console.log(data)
    }
    catch(e){
        console.log(e);
    }
}

export default class UserForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
          email: props.email,
          password: props.password,
          status: props.status
        }
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event) {
        login(this.state.email, this.state.password);
        event.preventDefault();
      }

      render(){
        return (
            <div className = "login">
                <form onSubmit={this.handleSubmit}>
                    <img className = "logo" src={logo} />
                    <h1 > Login </h1>
                    <div className="form-control">
                        <label>Email</label>
                        <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange}/>
                    </div>
                    <button type = "submit" className = "submit">Submit</button>
                </form>
            </div>
        );
      }
}
