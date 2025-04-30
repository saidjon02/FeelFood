import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imgs/logo.png';
function Login() {
  return (
    <div className="login wrap">
      <div className="container">
        <img src={logo} className='logo' alt="" />
        <input type="email" placeholder="Email" name="" id="" className="login-inp" />
        <input type="password" name="" placeholder="Password" id="" className="login-inp" />
        <Link to={'/not'}>
          <button className="login-btn">Login</button>
        </Link>
        <Link to={'/not'}>
          <button className="login-btn">New Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
