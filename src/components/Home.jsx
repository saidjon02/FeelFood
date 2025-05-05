// src/components/Home.jsx

import React, { useContext } from 'react';
import useFetch from './useFetch';
import ScrollToTop from './ScrollToTop';
import { SearchContext } from './SearchContext';
import { CartContext } from './Context';

function Home() {
  const { data: items, loading, error } = useFetch(
    'https://chustfeelfoodbackend.onrender.com/api/products/'
  );
  const { search } = useContext(SearchContext);
  const { dispatch } = useContext(CartContext);

  if (loading) {
    return (
      <div className="margintop">
        <img
          src="https://assets-v2.lottiefiles.com/a/dd9692b4-117a-11ee-aefa-9ff42c99e3ad/hTvOqFogUK.gif"
          className="gif"
          alt="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="allwrap">
      <ScrollToTop />
      <div className="container">
        <div className="allclothes product-grid">
          {filteredItems.map(item => (
            <div className="arriv-card" key={item.id}>
              <img
                src={item.get_image || '/default.png'}
                alt={item.name}
                className="arriv-img"
              />
              <h3 className="arriv-card-title">{item.name}</h3>
              <div className="price-box">
                <p className="price">{parseInt(item.price).toLocaleString()} so'm</p>
                <button
                  className="add-to-cart"
                  onClick={() =>
                    dispatch({ type: 'ADD', payload: { ...item, quantity: 1 } })
                  }
                >
                  Buyurtma berish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
