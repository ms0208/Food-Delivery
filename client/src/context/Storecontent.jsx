import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [Cartitems, setCartitems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodlist] = useState([]);

    const addtoCart = async (itemId) => {
        if (!Cartitems[itemId]) {
            setCartitems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removefromCart = async (itemId) => {
        setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in Cartitems) {
            if (Cartitems[item] > 0) {
                let itemInfo = food_list.find((product) => String(product._id) === String(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * Cartitems[item];
                }
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodlist(response.data.data);
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartitems(response.data.cardData);
    }
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])



    // useEffect(()=>{
    //     console.log(Cartitems);
    // },[Cartitems])

    const contextValue = {
        food_list,
        Cartitems,
        setCartitems,
        addtoCart,
        removefromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;