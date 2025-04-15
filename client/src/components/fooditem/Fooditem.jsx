import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../Assets/frontend_assets/assets.js';
import { StoreContext } from '../../context/Storecontent.jsx';
const Fooditem = ({ id, name, price, description, image }) => {
  const url = "http://localhost:4000"
  const { Cartitems, addtoCart, removefromCart } = useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-img' src={url+"/images/"+image} alt='' />
        {!Cartitems[id]
          ? <img className='add' onClick={() => addtoCart(id)} src={assets.add_icon_white} />
          : <div className='food-item-counter'>
            <img onClick={() => removefromCart(id)} src={assets.remove_icon_red} alt='' />
            <p>{Cartitems[id]}</p>
            <img onClick={() => addtoCart(id)} src={assets.add_icon_green} alt='' />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt='' />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default Fooditem

