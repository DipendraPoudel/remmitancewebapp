import React, {useState} from 'react'
import './Topbar.css';


const Topbar = () => {

  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">MoneyTransfer</a>

        </div>
        <div className="signup_buttons">
          <button type="button" className="btn btn-primary">Register</button>
          <button type="button" className="btn btn-success">Login</button>
         
        </div>
      </nav>
                
    </>
  )
}

export default Topbar
