import React, { useState } from 'react'
import { assets } from '../../Assets/frontend_assets/assets.js';
import './Loginpop.css';
const Logininpop = ({ setShowLogin }) => {
    const [CurrState, setCurrState] = useState("Login");
    return (
        <div classNmae="login-popup">
            <form  className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{CurrState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className="login-popup-inputs">
                    {CurrState === "Login" ? <></> :<input type="text" placeholder='Your name' required/>}
                    <input type="email" placeholder='Your email' required/>
                    <input type="password" placeholder='Password' required/>
                </div>
                <button>{CurrState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuing , I agree to the terms of use and privacy policy.</p>
                </div>
                {CurrState === "Login"
                    ? <p className='LS'>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                    : <p className='LS'>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default Logininpop;
