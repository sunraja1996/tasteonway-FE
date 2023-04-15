import React from "react";
import "./Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from '../Assests/TasteonWay-Logo-01.png'
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


function Navbar() {
 
  const cartstate = useSelector(state => state.cartReducer);
  const firstname = sessionStorage.getItem('firstName');
  console.log(firstname); // Add this line to check if firstName is being properly retrieved

  
  console.log(firstname);
  let navigate = useNavigate()

  let logout = () => {
    sessionStorage.clear()
    navigate('/')
  }



  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-custom shadow p-3 mb-5 nav-logo">
        <a className="navbar-brand" href="/">
          <img className="logo" src={logo} alt="Logo"></img>
          Taste on Way
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
         
          <ul className="navbar-nav ml-auto" >


          <li className="nav-item active">
              {firstname && 
              <>
              <h1 className="ms-2 nav-link">{firstname} 
              <a href="/orders">
                
              <ShoppingBagIcon style={{color:'#367E18', cursor:'pointer'}}></ShoppingBagIcon>
              </a>
              </h1>
              
              </>
            }
              {!firstname && (
                <a className="btn btn-custom nav-link" href='/login'>
                  Login
                </a>
              )}
            </li>
            {firstname && (
            <li className="nav-item">
              <button onClick={()=>logout()} style={{backgroundColor:'#fa0606'}} className="btn btn-custom nav-link">
               <ExitToAppIcon/>
                Logout
              </button>
            </li>
          )}
            <li className="nav-item">

  <a className="nav-link position-relative" href="/cart">
    <ShoppingCartIcon className="ShoppingCartIcon"></ShoppingCartIcon>
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {cartstate.cartItems.length}
  </span>
 


    
  </a>
</li>

          </ul>
         
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
