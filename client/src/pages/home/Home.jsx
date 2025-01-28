import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header.jsx';
import Menu from '../../components/menu/Menu.jsx';
import Foodlist from '../../components/foodlist/Foodlist.jsx';
import Appdownload from '../../components/appdownload/Appdownload.jsx';
const Home = () => {
  const [Category,setCategory] = useState("All");
  return (
    <div className='home'>
      <Header/>
      <Menu Category={Category} setCategory={setCategory}/>
      <Foodlist Category={Category}/>
      <Appdownload/>
    </div>
  )
}

export default Home
