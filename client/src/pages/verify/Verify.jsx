import React, { useContext, useEffect } from 'react';
import './Verify.css';
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/Storecontent.jsx';
const Verify = () => {

    const [seachParams, setSearchParams] = useSearchParams();
    const success = seachParams.get("success");
    const orderId = seachParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    console.log(success,orderId);
    const verifyPayment = async (req,res) =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success) {
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
    <div className='spinner'></div>
    </div>
  )
}

export default Verify;