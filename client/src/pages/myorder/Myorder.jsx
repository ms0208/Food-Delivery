import React, { useContext, useEffect, useState } from 'react';
import './Myorder.css';
import axios from 'axios';
import { StoreContext } from '../../context/Storecontent.jsx';
import { assets } from '../../Assets/frontend_assets/assets.js';

const Myorder = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/order/userorders', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });
            console.log("Response:", response.data);
            setData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='My-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    // Guard against undefined or non-array items
                    if (!Array.isArray(order.items)) return null;

                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="Parcel" />
                            <p>
                                {order.items.map((item, id) => (
                                    id === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                ))}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Myorder;

