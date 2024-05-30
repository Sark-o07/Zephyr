import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/buyit4.svg'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropdown.png'
import { getDefaultCart } from '../../Context/ShopContext'

export const Navbar = () => {
    const  { isAuthenticated, setIsAuthenticated, setCartItems } = useContext(ShopContext);
    const [menu, setMenu] = useState('shop');
    const { getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();
    
    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsAuthenticated(false);
        setCartItems(getDefaultCart());
        navigate('/');
    };

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu('shop')}}><Link to='/'>Shop</Link>{menu ==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('men')}}><Link to='/men'>Men</Link>{menu==='men'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('women')}}><Link to='/women'>Women</Link>{menu==='women'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('kids')}}><Link to='/kid'>Kids</Link>{menu==='kids'?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {
                // Check if the auth-token exists in localStorage
                isAuthenticated ? (<button onClick={() => {handleLogout()}}>Logout</button>) :
                (
                    // If token doesn't exist, render a Login button wrapped in a Link component
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                )
            }

            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
