import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound container wrap">
      <h2 className="not-title">404</h2>
      <p className="not-text">Page Not Found</p>
      <Link to={'/'}>
        <button className="not-btn">Back to Home Page</button>
      </Link>
    </div>
  );
}

export default NotFound;
