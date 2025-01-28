import React, { useContext } from 'react';
import './Navbar.css';
import { assets } from '../../Assets/frontend_assets/assets';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {StoreContext} from '../../context/Storecontent.jsx';
const Navbar = ({setShowLogin}) => {

  const [Menu ,setMenu] = useState("home");

  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='Navbar'>
        <Link to="/"><img src={assets.logo} alt='' className='Logo'/></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={Menu==="home"?"active":""}>home</Link>
            <a href='#Menu'onClick={()=>setMenu("menu")} className={Menu==="menu"?"active":""}>menu</a>
            <a href='#app-download'onClick={()=>setMenu("mobile-app")} className={Menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer'onClick={()=>setMenu("contact-us")} className={Menu==="contact-us"?"active":""}>contact-app</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt=''/>
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>setShowLogin(true)} className='button'>sign in</button>
        </div>
    </div>
  )
}

export default Navbar
