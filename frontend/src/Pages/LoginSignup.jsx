import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const  { setIsAuthenticated, setCartItems, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Login');

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const signup = async () => {
    console.log('signup function triggered', formData);
  
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        setIsAuthenticated(true);
        console.log(cartItems, "if user successfully signs up");
        navigate('/men');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  const login = async () => {
    console.log('login function triggered', formData);

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (data.success){
      localStorage.setItem('auth-token', data.token);
      setIsAuthenticated(true);
      const resp = await fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: "",
      })
      const cartData = await resp.json();
      setCartItems(cartData);
      navigate('/');

    } else {
      alert(data.error)
    }
  }

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === 'Sign Up' && (<input type="text" placeholder='Your Name' name='username' value={formData.name} onChange={changeHandler} />)}
            <input type="email" placeholder='Email Address' name='email' value={formData.email} onChange={changeHandler} />
            <input type="password" placeholder='Password' name='password' value={formData.password} onChange={changeHandler}/>
            <button onClick={() => {state === 'Login' ? login() : signup()}}>Continue</button>
          </div>
          {state === 'Sign Up'? <p className="loginsignup-login">Already have an account? <span onClick={() => setState('Login')} >Login here</span></p>
             : <p className="loginsignup-login">Creat an Account? <span onClick={() => setState('Sign Up')} >Click here</span></p>}
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
    </div>
  )
}
