// src/components/CardList.jsx
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { CartContext } from './Context';
import ScrollToTop from './ScrollToTop';
import star from '../../imgs/star-num.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CardList() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { id } = useParams();

  // useFetch hooklari har doim bir xil tartibda chaqiriladi
  const { data: items, loading: loadingItems } = useFetch(`https://ac8d73010fc49ec5.mokky.dev/items/${id}`);
  const { data: firstFour, loading: loadingFirst } = useFetch(`https://ac8d73010fc49ec5.mokky.dev/firstfour/${id}`);
  const { data: top, loading: loadingTop } = useFetch(`https://ac8d73010fc49ec5.mokky.dev/top/${id}`);

  // useContext har doim hooklardan keyin
  const { dispatch } = useContext(CartContext);

  // Uchta fetchdan birinchisi
  const singleData = items || firstFour || top;
  const isLoading = loadingItems || loadingFirst || loadingTop;

  if (isLoading || !singleData?.id) {
    return <div>Loading...</div>;
  }

  const updatedData = { ...singleData, quantity: 1 };

  return (
    <div className="wrap container">
      <ScrollToTop />

      <div className="cardl-row">
        <div className="cardl-box">
          <img data-aos="fade-right" src={singleData.img} alt={singleData.name} />
        </div>
        <div className="cardl-box">
          <h2 className="cardl-title t2" data-aos="fade-down">{singleData.name}</h2>
          <img data-aos="fade-down" src={star} className="starnum t3" />
          <div className="cardl-price-row t4" data-aos="fade-down">
            <p className="thing-price">${singleData.price}</p>
            {singleData.notprice && (
              <p className="cardl-text2">
                <del style={{ textDecoration: 'line-through' }}>{singleData.notprice}</del>
              </p>
            )}
          </div>

          <p className="cardl-text t5" data-aos="fade-down">{singleData.text}</p>
          <Link to={'/cart'} data-aos="fade-down" className="t6">
            <button
              className="addtocard-in-list"
              onClick={() => dispatch({ type: 'ADD', payload: updatedData })}
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardList;
