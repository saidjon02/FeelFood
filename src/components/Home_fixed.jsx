// src/components/Home.jsx
import React, { useContext, useState } from 'react';
import useFetch from './useFetch';
import ScrollToTop from './ScrollToTop';
import { SearchContext } from './SearchContext';
import { CartContext } from './Context';

const CATEGORY_OPTIONS = [
  {
    key: 'all',
    label: (
      <>
        <span style={{ fontSize: '24px' }}>🧾</span> <span>Hammasi</span>
      </>
    ),
  },
  {
    key: 'food',
    label: (
      <>
        <span style={{ fontSize: '24px' }}>🍔</span> <span>Taomlar</span>
      </>
    ),
  },
  {
    key: 'drink',
    label: (
      <>
        <span style={{ fontSize: '24px' }}>🥤</span> <span>Ichimliklar</span>
      </>
    ),
  },
  {
    key: 'cake',
    label: (
      <>
        <span style={{ fontSize: '24px' }}>🍰</span> <span>Desertlar</span>
      </>
    ),
  },
];

function Home() {
  const [category, setCategory] = useState('all');
  const { search } = useContext(SearchContext);
  const { dispatch } = useContext(CartContext);

  // Ma'lumotlarni serverdan olish
  const url = `https://chustfeelfoodbackend.onrender.com/api/products/`;
  const { data: rawData, error } = useFetch(url);
  
  // Ma'lumotlar arrayga aylantirish
  const items = Array.isArray(rawData) ? rawData : rawData?.results || [];

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  // Ma'lumotlarni filtrlash
  const filteredItems = items.filter((item) => {
    const bySearch = item.name.toLowerCase().includes(search.toLowerCase());
    const byCategory = category === 'all' || item.category === category;
    return bySearch && byCategory;
  });

  return (
    <div className="allwrap">
      <ScrollToTop />

      <div className="filter-buttons">
        {CATEGORY_OPTIONS.map((opt) => (
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
          {filteredItems.map((item) => (
            <div className="arriv-card" key={item.id}>
              <img src={item.get_image || '/default.png'} alt={item.name} className="arriv-img" />
              <h3 className="arriv-card-title">{item.name}</h3>
              <div className="price-box">
                <p className="price">{parseInt(item.price).toLocaleString()} UZS</p>
                <button
                  className="add-to-cart"
                  onClick={() => dispatch({ type: 'ADD', payload: { ...item, quantity: 1 } })}
                >
                  Buyurtma berish
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && <p className="nothing">Hech qanday mahsulot topilmadi.</p>}
        </div>
      </div>
    </div>
  );
}

export default Home;
