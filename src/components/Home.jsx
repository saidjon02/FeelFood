import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import star from '../../imgs/star.png';
import ScrollToTop from './ScrollToTop';
import { SearchContext } from './SearchContext';

function Home() {
  const { data: items, loading, error } = useFetch('https://feelfood-2.onrender.com/items');
  const { search } = useContext(SearchContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // endi items doim array
  const filteredClothes = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="allwrap">
      <ScrollToTop />
      <div className="allclothes container">
        {filteredClothes.map((e) => (
          <div className="arriv-card" key={e.id}>
            <Link to={`/list/${e.id}`}>
              <div className="arriv-card-head">
                <img src={e.img} alt={e.name} className="arriv-img" />
              </div>
              <div className="card-body">
                <h2 className="arriv-card-title">{e.name}</h2>
                <img src={star} alt="Star" className="star" />
                <div className="price-box">
                  <p className="price">${e.price}</p>
                  <p className="notprice">
                    <del>{e.notprice}</del>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
