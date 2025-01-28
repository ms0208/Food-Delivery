import React, { useContext } from 'react';
import { StoreContext } from '../../context/Storecontent.jsx'
import './Foodlist.css';
import Fooditem from '../fooditem/Fooditem.jsx';
export const Foodlist = ({ Category }) => {

  const { food_list } = useContext(StoreContext)
  return (
    <div className='foodlist' id='foodlist'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (Category === "All" || Category === item.category) {
            return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}
export default Foodlist;
