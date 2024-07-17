import React, { useState } from 'react';
import './App.css';
import Data from './Data.json';
import GameList from './Components/GameList/GameList';
import OrderForm from './Components/OrderForm/OrderForm';
import Cart from './Components/CartGame/CartGame';
import logo from './logo.png';
import {
   BrowserRouter as Router,
   Route,
   Routes,
   useNavigate,
} from 'react-router-dom';
import SummaryPage from './Components/SummaryPage/SummaryPage';

const App = () => {
   const [game, setGame] = useState(Data.games);
   const [cart, setCart] = useState([]);
   const [orderDetails, setOrderDetails] = useState(null); // Stav pro uchování detailů objednávky

   const addToCart = (item) => {
      setCart((prevCart) => {
         const existingItem = prevCart.find(
            (cartItem) => cartItem.id === item.id
         );
         if (existingItem) {
            return prevCart.map((cartItem) =>
               cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
            );
         } else {
            return [...prevCart, { ...item, quantity: 1 }];
         }
      });
   };

   const updateCartItemQuantity = (id, quantity) => {
      setCart((prevCart) =>
         prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
   };

   const navigate = useNavigate();

   const handleSubmitOrder = (orderDetails) => {
      setOrderDetails(orderDetails); // Uložení detailů objednávky do stavu
      navigate('/summary', { state: { orderDetails, cart } });
   };

   return (
      <div className="container">
         <h1 className="h1 text-center">Hell Deskovky</h1>
         <Routes>
            <Route
               path="/"
               element={
                  <>
                     <h2 className="h2 text-center">Nabídka her:</h2>
                     <GameList data={game} addToCart={addToCart} />
                     <h2 className="h2 text-center my-2">Objednávka:</h2>
                     <div className="row">
                        <div className="col-md">
                           <OrderForm
                              initialOrderDetails={orderDetails} // Předání původních detailů objednávky do formuláře
                              onSubmitOrder={handleSubmitOrder}
                           />
                        </div>
                        <div className="col-md">
                           <Cart
                              cart={cart}
                              updateCartItemQuantity={updateCartItemQuantity}
                           />
                        </div>
                     </div>
                  </>
               }
            />
            <Route path="/summary" element={<SummaryPage />} />
         </Routes>
         <footer className="text-end">
            <img className="logo" src={logo} alt="logo" />
            &copy; Věra Hellebrand 2024
         </footer>
      </div>
   );
};

export default App;
