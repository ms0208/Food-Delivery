import React, {  useEffect, useState } from 'react'
import './Add.css';
import { assets } from '../../assets/admin_assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
const Add = () => {
  const [Image,setImage] = useState(false);
  const [Data , setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(Data=>({...Data,[name]:value}))
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",Data.name);
    formData.append("description",Data.description);
    formData.append("price",Number(Data.price));
    formData.append("category",Data.category);
    formData.append("image",Image);
    const response = await axios.post("http://localhost:4000/api/food/add",formData);
    if (response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
      })
      setImage(false);
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  } 
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={Image?URL.createObjectURL(Image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </div>
        <div className="add-product-name">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={Data.name}  type='text' name='name' placeholder='Type-here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={Data.description} name='description' rows='6' placeholder='Write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={Data.price} type='Number'name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add+'>Add</button>
      </form>
    </div>
  )
}

export default Add
