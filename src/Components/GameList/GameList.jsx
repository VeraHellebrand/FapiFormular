import React from 'react';
import './GameList.css'; // Pokud máte styly

const GameList = ({ data, addToCart }) => {
   return (
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
         {data.map((item) => {
            return (
               <div className="col" key={item.id}>
                  <div className="card h-100">
                     <img
                        src={item.imgUrl}
                        className="card-img-top"
                        alt={item.name}
                     />
                     <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h5 className="card-title">{item.price} Kč</h5>
                        <p className="card-text">Vydavatel: {item.publisher}</p>
                        <p className="card-text">Jazyk: {item.language}</p>
                        <button
                           className="btn btn-success text-white"
                           onClick={() => addToCart(item)}
                        >
                           <i className="bi bi-basket bc"></i> Přidat do košíku
                        </button>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default GameList;
