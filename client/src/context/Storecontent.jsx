import { createContext, useEffect, useState } from "react";
import { food_list } from "../Assets/frontend_assets/assets.js";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [Cartitems, setCartitems] = useState({});

    const addtoCart = (itemid) => {
        if (!Cartitems[itemid]) {
            setCartitems((prev) => ({ ...prev, [itemid]: 1 }))
        }
        else {
            setCartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }))
        }
    }

    const removefromCart = (itemid) => {
        setCartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in Cartitems) {
            if (Cartitems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * Cartitems[item];
            }
        }
        return totalAmount;
    }

    // useEffect(()=>{
    //     console.log(Cartitems);
    // },[Cartitems])

    const contextValue = {
        food_list,
        Cartitems,
        setCartitems,
        addtoCart,
        removefromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;