import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imgs/logo.png';
import { CartContext } from './Context';
import { SearchContext } from './SearchContext';

function Header() {
  const Globalstate = useContext(CartContext);
  const state = Globalstate.state;
  const { search, setSearch } = useContext(SearchContext);
  const [showRegister, setShowRegister] = useState(false);
  const toggleRegister = () => setShowRegister(!showRegister);
  const [pop, setPop] = useState(false);
  const fire = () => {
    setPop(!pop);
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="head-row">
            <div className="head-left">
              <i className="bx bx-menu" onClick={() => setPop(!pop)}></i>
              <Link to="/">
                <h2 className="logo">Feel Food</h2>
              </Link>
            </div>
            <div className="head-center2">
              <i className="bx bx-search"></i>
              <Link to="/">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="head-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Link>
            </div>
            <div className="head-right">
              <Link to="/cart">
                <i className="bx bx-cart">
                  <span className="cart-number">{state.length}</span>
                </i>
              </Link>
              <Link to={'/login'}>
                <i className="bx bxs-user" style={{ color: 'black' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {showRegister && <RegisterModal onClose={toggleRegister} />}
    </>
  );
}

export default Header;
