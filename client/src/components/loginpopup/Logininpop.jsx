import React, { useContext, useState } from 'react'
import { assets } from '../../Assets/frontend_assets/assets.js';
import './Loginpop.css';
import axios from 'axios';
import { StoreContext } from '../../context/Storecontent.jsx';
import { useEffect } from 'react';
const Logininpop = ({ setShowLogin }) => {

    const { url , setToken } = useContext(StoreContext);
    const [CurrState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
       event.preventDefault();
       let newUrl = url;
       if(CurrState==="Login") {
        newUrl += '/api/user/login'
       }
       else {
        newUrl += '/api/user/register'
       }
       const response = await axios.post(newUrl,data);

       if(response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
       }
       else {
        alert(response.data.message);    
       }
    }

    return (
        <div classNmae="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{CurrState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className="login-popup-inputs">
                    {CurrState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{CurrState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuing , I agree to the terms of use and privacy policy.</p>
                </div>
                {CurrState === "Login"
                    ? <p className='LS'>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p className='LS'>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default Logininpop;
