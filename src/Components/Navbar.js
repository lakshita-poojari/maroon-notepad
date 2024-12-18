import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">M@roon</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
            </ul>

            {!localStorage.getItem('token') ? (
              <form className="d-flex" role="search">
                {/* 
               <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
               <button className="btn btn-outline-success" type="submit">Search</button>
                */}
                <NavLink className="btn btn-primary mx-2" to="/login" role="button">
                  Login
                </NavLink>
                <NavLink className="btn btn-primary mx-2" to="/signup" role="button">
                  Signup
                </NavLink>
              </form>
            ) : (
              <div className=''>
                <i className="fa-solid fa-user mx-1" style={{ cursor: 'pointer', color: 'white' }}></i>
                <input className="" value={"lakshita"} disabled={true}/>
                <button onClick={handleLogout} className="btn btn-primary mx-3">
                  Log Out
                </button>
              </div>
            )}


          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
