// src/components/Home.jsx

import React, { useContext, useState } from 'react';
import useFetch from './useFetch';
import ScrollToTop from './ScrollToTop';
import { SearchContext } from './SearchContext';
import { CartContext } from './Context';

const CATEGORY_OPTIONS = [
  { key: 'all',   label: 'Hammasi' },
  { key: 'food',  label: 'Ovqatlar' },
  { key: 'drink', label: 'Ichimliklar' },
  { key: 'cake',  label: 'Tortlar' },
];

function Home() {
  
  const { data: items, loading, error } = useFetch(
    'https://chustfeelfoodbackend.onrender.com/api/products/'
  );
  const { search } = useContext(SearchContext);
  const { dispatch } = useContext(CartContext);
  const [category, setCategory] = useState('all');

  if (loading) return (
    <div className="margintop">
      <img
        src="https://assets-v2.lottiefiles.com/a/dd9692b4-117a-11ee-aefa-9ff42c99e3ad/hTvOqFogUK.gif"
        className="gif"
        alt="Loading..."
      />
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;

  // Birlashtirilgan filtr
  const filteredItems = items.filter(item => {
    const bySearch   = item.name.toLowerCase().includes(search.toLowerCase());
    const byCategory = category === 'all' || item.category === category;
    return bySearch && byCategory;
  });

  return (
    <div className="allwrap">
      <ScrollToTop />

      {/* — Filter tugmalari — */}
      <div className="filter-buttons">
        {CATEGORY_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={`filter-btn ${category === opt.key ? 'active' : ''}`}
            onClick={() => setCategory(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>

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
              <p className="category-label">
                {CATEGORY_OPTIONS.find(o => o.key === item.category)?.label}
              </p>
              <div className="price-box">
                <p className="price">{parseInt(item.price).toLocaleString()} UZS</p>
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
