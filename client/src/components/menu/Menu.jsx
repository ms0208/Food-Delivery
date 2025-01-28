import React from 'react'
import './Menu.css';
import {menu_list} from '../../Assets/frontend_assets/assets.js';
export const Menu = ({Category,setCategory}) => {
  return (
    <div className='Menu' id='Menu'>
        <h1>Explore Our Menu</h1>
        <p className='Menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest Ingredients</p>
        <div className="Menu-list1">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='Menu-list'>
                        <img className={Category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default Menu;