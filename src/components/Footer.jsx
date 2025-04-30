import React from 'react';
import logo from '../../imgs/logo.png';
import pay1 from '../../imgs/paymant (1).png';
import pay2 from '../../imgs/paymant (2).png';
import pay3 from '../../imgs/paymant (3).png';
import pay4 from '../../imgs/paymant (4).png';
import pay5 from '../../imgs/paymant (5).png';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="offers">
          <h2 className="offers-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
          <div className="offers-login">
            <div className="login-input">
              <i className="bx bx-envelope"></i>
              <input type="email" placeholder="Enter your email address" />
            </div>
            <button className="offers-btn">Subscribe to Newsletter</button>
          </div>
        </div>
        <div className="foot-row">
          <div className="foot-box foot-box2">
            <img src={logo} alt="" />
            <p className="foot-text">
              We have clothes that suits your style and which you’re proud to wear. From women to
              men.
            </p>
            <div className="icons">
              <i className="bx bxl-twitter"></i>
              <i className="bx bxl-facebook"></i>
              <i className="bx bxl-instagram"></i>
              <i className="bx bxl-github"></i>
            </div>
          </div>
          <div className="foot-box">
            <h2 className="foot-title">Company</h2>
            <ul className="foot-list">
              <li className="foot-item">
                <a href="" className="foot-link">
                  About{' '}
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Features{' '}
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Works{' '}
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Career{' '}
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-box">
            <h2 className="foot-title">Help</h2>
            <ul className="foot-list">
              <li className="foot-item">
                <a href="" className="foot-link">
                  Customer Support
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Delivery Details
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Terms & Conditions
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-box">
            <h2 className="foot-title">FAQ</h2>
            <ul className="foot-list">
              <li className="foot-item">
                <a href="" className="foot-link">
                  Account
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Manage Deliveries
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Orders
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Payments
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-box">
            <h2 className="foot-title">Resources</h2>
            <ul className="foot-list">
              <li className="foot-item">
                <a href="" className="foot-link">
                  Free eBooks
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Development Tutorial
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  How to - Blog
                </a>
              </li>
              <li className="foot-item">
                <a href="" className="foot-link">
                  Youtube Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="arrow"></div>
        <div className="foot-row2">
          <p className="foot-row2-text">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="payment">
            <img src={pay1} alt="" />
            <img src={pay2} alt="" />
            <img src={pay3} alt="" />
            <img src={pay4} alt="" />
            <img src={pay5} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
