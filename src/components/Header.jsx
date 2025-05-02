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
  const [animate, setAnimate] = useState(false);

  // Karzinka soni o'zgarganda animatsiya boshlab beradi
  React.useEffect(() => {
    if (state.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300); // animatsiya 300ms
      return () => clearTimeout(timer);
    }
  }, [state.length]);
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="head-row">
            <div className="head-left">
              <Link to="/">
                <img src={logo} className="logo" alt="" />
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
              <Link to="/cart" className={`${animate ? 'bump' : ''}`}>
                <i className="bx bx-cart">
                  <span className="cart-number" >{state.length}</span>
                </i>
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
