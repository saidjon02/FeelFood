import React, { useContext, useEffect, useState } from 'react';
import img from '../../imgs/bg1.png';
import company1 from '../../imgs/companys (1).png';
import company2 from '../../imgs/companys (2).png';
import company3 from '../../imgs/companys (3).png';
import company4 from '../../imgs/companys (4).png';
import company5 from '../../imgs/companys (5).png';
import star from '../../imgs/star.png';
import check from '../../imgs/check.png';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CartContext } from './Context';
import ScrollToTop from './ScrollToTop';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { data } = useFetch('https://ac8d73010fc49ec5.mokky.dev/firstfour');
  const { top } = useFetch('https://ac8d73010fc49ec5.mokky.dev/top');
  const { testimonials } = useFetch('https://ac8d73010fc49ec5.mokky.dev/testimonials');
  const [brands, setBrands] = useState(0);
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    countUp(200, setBrands, 1000); // 200+ brend
    countUp(2000, setProducts, 1500); // 2,000+ mahsulot
    countUp(30000, setCustomers, 2000); // 30,000+ mijoz
  }, []);

  const countUp = (target, setter, duration) => {
    let start = 0;
    let increment = Math.ceil(target / (duration / 80)); // Qadam o‘lchami
    let interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setter(start);
    }, 80);
  };

  const Globalstate = useContext(CartContext);
  const dispatch = Globalstate.dispatch;
  console.log(Globalstate);

  return (
    <div className="wraps">
      <ScrollToTop />

      <div className="home">
        <div className="container">
          <div className="home-row">
            <div className="home-left">
              <h2 className="home-title t1" data-aos="fade-down">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h2>
              <p className="home-text t2" data-aos="fade-down">
                Browse through our diverse range of meticulously crafted garments, designed to bring
                out your individuality and cater to your sense of style.
              </p>
              <Link to={'/allclothes'} className="t3">
                <button className="home-btn" data-aos="fade-down">Shop Now</button>
              </Link>
              <div className="home-box">
                <div className="homebox-box t1" data-aos="fade-down">
                  <h2 className="home-box-h2">{brands}+</h2>
                  <p className="home-box-p">International Brands</p>
                </div>
                <div className="homebox-box t2" data-aos="fade-down">
                  <h2 className="home-box-h2">{products.toLocaleString()}+</h2>
                  <p className="home-box-p">High-Quality Products</p>
                </div>
                <div className="homebox-box t3" data-aos="fade-down">
                  <h2 className="home-box-h2">{customers.toLocaleString()}+</h2>
                  <p className="home-box-p">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="home-right">
              <img data-aos="fade-right" className="t4" src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="imgs">
        <div className="container">
          <img src={company1} data-aos="fade-right" alt="" className="imgs-img t1" />
          <img src={company2} data-aos="fade-right" alt="" className="imgs-img t2" />
          <img src={company3} data-aos="fade-right" alt="" className="imgs-img t3" />
          <img src={company4} data-aos="fade-right" alt="" className="imgs-img t4" />
          <img src={company5} data-aos="fade-right" alt="" className="imgs-img t5" />
        </div>
      </div>
      <div className="arrivals container">
        <h2 className="arriv-title" data-aos="fade-down">
          NEW ARRIVALS
        </h2>
        <div className="arriv-row">
          {data &&
            data.map((e) => {
              e.quantity = 1;
              return (
                <div className="arriv-card" data-aos="fade-right" key={e.id}>
                  <Link to={`/list/${e.id}`}>
                    <div className="arriv-card-head">
                      <img src={e.img} alt="" className="arriv-img" />
                    </div>
                    <div className="card-body">
                      <h2 className="arriv-card-title">{e.name}</h2>
                      <img src={star} alt="" className="star" />
                      <div className="price-box">
                        <p className="price">${e.price}</p>{' '}
                        <p className="notprice">
                          <del>{e.notprice}</del>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <Link to="/allclothes">
          <button className="view-all-btn">View All</button>
        </Link>
      </div>
      <hr className="container" />
      <div className="arrivals container">
        <h2 className="arriv-title" data-aos="fade-down">
          TOP SELLING
        </h2>
        <div className="arriv-row">
          {top &&
            top.map((a) => {
              a.quantity = 1;
              return (
                <div className="arriv-card" data-aos="fade-right" key={a.id}>
                  <Link to={`/list/${a.id}`}>
                    <div className="arriv-card-head">
                      <img src={a.img} alt="" className="arriv-img" />
                    </div>
                    <div className="card-body">
                      <h2 className="arriv-card-title">{a.name}</h2>
                      <img src={star} alt="" className="star" />
                      <div className="price-box">
                        <p className="price">${a.price}</p>
                        <p className="notprice">
                          <del>{a.notprice}</del>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <Link to="/allclothes">
          <button className="view-all-btn">View All</button>
        </Link>
      </div>
      <div className="dress container" data-aos="flip-left">
        <h2 className="dress-title">BROWSE BY DRESS STYLE</h2>
        <div className="dress-row">
          <div className="dress-box1">
            <h2 className="dress-box-title">Casual</h2>
          </div>
          <div className="dress-box2">
            <h2 className="dress-box-title">Formal</h2>
          </div>
        </div>
        <div className="dress-row2">
          <div className="dress-box3">
            <h2 className="dress-box-title">Party</h2>
          </div>
          <div className="dress-box4">
            <h2 className="dress-box-title">Gym</h2>
          </div>
        </div>
      </div>
      <div className="customer container">
        <div className="custom-row1">
          <h2 className="customer-title" data-aos="flip-up">
            OUR HAPPY CUSTOMERS
          </h2>{' '}
          <div className="prev-next">
            <button className="prev">
              <ChevronLeft />
            </button>
            <button className="next">
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="custom-cards t2" data-aos="flip-up">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3.5}
            centeredSlides={true}
            breakpoints={{
              768: {
                slidesPerView: 2.5,
              },
              576: {
                slidesPerView: 1.5,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            loop={true}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
          >
            {testimonials &&
              testimonials.map((e, index) => (
                <SwiperSlide key={`${e.id}-${index}`} className="custom-card">
                  <img src={e.image} alt="" className="custom-card-img" />
                  <h2 className="custom-card-title">
                    {e.name} <img src={check} alt="" />
                  </h2>
                  <p className="custom-card-text">{e.text}</p>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
