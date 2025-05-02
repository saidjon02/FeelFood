import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import ScrollToTop from './ScrollToTop';
import { SearchContext } from './SearchContext';
import { CartContext } from './Context';

function Home() {
  const { data: items, loading, error } = useFetch('https://feelfood-2.onrender.com/items');
  const { search } = useContext(SearchContext);

  if (loading)
    return (
      <div className="margintop">
        <img
          src="https://assets-v2.lottiefiles.com/a/dd9692b4-117a-11ee-aefa-9ff42c99e3ad/hTvOqFogUK.gif"
          className="gif"
          alt=""
        />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  // endi items doim array
  const filteredClothes = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const Globalstate = useContext(CartContext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  return (
    <div className="allwrap">
      <ScrollToTop />
      <div className="allclothes container">
        {filteredClothes &&
          filteredClothes.map((e) => {
            const quantity = 1; // ← endi bu xatolik chiqarmaydi
            return (
              <div className="arriv-card" key={e.id}>
                <div className="arriv-card-head">
                  <img src={e.img} alt={e.name} className="arriv-img" />
                </div>
                <div className="card-body">
                  <h2 className="arriv-card-title">{e.name}</h2>
                  <div className="price-box">
                    <button
                      className="add-to-cart"
                      onClick={() => dispatch({ type: 'ADD', payload: { ...e, quantity } })}
                    >
                      Buyurtma berish
                    </button>
                    <p className="price">{e.price} so'm</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
