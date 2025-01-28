import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx';
import Cart from './pages/card/Card.jsx';
import Placeholder from './pages/placeholder/Placeholder.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer.jsx';
import Logininpop from './components/loginpopup/Logininpop.jsx';
function App() {

    const [ShowLogin, setShowLogin] = useState(false);
    return (
        <>
            <div className='App'>
                <Router>
                    <Navbar setShowLogin={setShowLogin} />
                    {ShowLogin ? <Logininpop setShowLogin={setShowLogin} /> : <></>}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/order' element={<Placeholder />} />
                    </Routes>
                </Router>
            </div>
            <Footer />
        </>

    );
}

export default App;


