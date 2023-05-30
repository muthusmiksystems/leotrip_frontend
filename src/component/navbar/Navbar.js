import React, { useState, useEffect, useRef } from "react";
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import '../navbar/navbar.scss';
import bus from '../../asset/images/marqueebus.gif';
import run from '../../asset/images/marqueerun.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Login from "../../pages/authentication/login";


const CustomNavbar = ({ isSticky, onhandle }) => {

  const [colorChange, setColorchange] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    }
    else {
      setColorchange(false);
    }
  };
  window.addEventListener('scroll', changeNavbarColor);



  const toggleShow = () => {
    setOpen(!open)
  }

  useEffect(() => {

  }, [modalShow])


  /* # Close toast On clicking outside */

  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])
  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }
  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  // const usertoken = JSON.parse(localStorage.getItem('token'))
  // useEffect(() => {

  // }, [usertoken])



  const refreshPage = () => {
    window.location.reload();
  }


  return (
    <div className={`navbar-wrapper ${isSticky && isScrolled && 'header-scrolled sticky-top'}`}>
      <Navbar expand="lg" className={colorChange ? 'custom-navbarchange' : 'custom-navbar'}>
        <Navbar.Brand href="/flight">
          {/* <img src={Logo} alt="logo"/> */}
          <div className="img"></div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className='booking'>
            <div className='container containernavbar'>
              <ul className="nav nav-Tabs mt-2 mainnavbartabs">
                <li className="nav-item ms-2">
                  <NavLink to='/flight' className="nav-link me-2 " name="selection" onClick={() => refreshPage} >
                    <i class="fa fa-fighter-jet me-2 navicon" aria-hidden="true"></i>
                    {/* <img src={Plane} alt="plane" className="me-1" style={{ height: "38px", width: "32px" }} /> */}
                    Flights
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/hotel' className="nav-link" name="selection" onClick={() => refreshPage} >
                    <i class="fa fa-building me-2" aria-hidden="true"></i>

                    {/* <img src={Hotel} alt="hotel" className="me-1" style={{ height: "25px", width: "24px" }} /> */}
                    Hotels
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/bus' className="nav-link" name="selection" onClick={() => refreshPage} >
                    <i class="fa fa-bus me-2" aria-hidden="true"></i>
                    {/* <img src={Bus} alt="bus" className="me-1" style={{ height: "22px", width: "25px" }} /> */}
                    Bus
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/car' className="nav-link" name="selection" onClick={() => refreshPage} >
                    <i class="fa fa-car me-2" aria-hidden="true"></i>
                    {/* <img src={Car} alt="car" className="me-1" style={{ height: "22px", width: "22px" }} /> */}
                    Car
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </Navbar.Collapse>
        <div className="d-flex justify-content-end mt-2">
          <div className=" me-5 hoyjoyTriphistory">

            {/* <NavLink to='/home/triphistory' style={{ textDecoration: "none" }} className="d-flex mt-2">
              <FontAwesomeIcon icon={faToolbox} style={{ fontSize: "22px", color: "gray", padding: "1px", marginRight: "8px", marginTop: "5px" }} />
              <div className="d-flex flex-column">
                <p className="mb-0 text-muted" style={{ fontSize: "10px" }}>My Trips</p>
                <p className="mt-0 mb-0" style={{ color: "#2b2d91", fontSize: "13px" }}>Manage Booking</p>
              </div>
            </NavLink> */}
          </div>
          <div className="mb-2">
            <div className="register" onClick={() => setModalShow(true)}>
              <FontAwesomeIcon icon={faUserCircle} style={{ marginTop: "5px", fontSize: "25px", color: "#c96e30" }} />
              <a className="ms-2 mb-0  fw-bold mt-1" style={{ fontSize: "15px", color: "#c96e30" }}>LOGIN<span style={{ fontSize: "15px", color: "#c96e30" }}> / </span><span style={{ fontSize: "15px", color: "#c96e30" }}>SIGNUP</span></a>
              <i class="fa fa-chevron-down" aria-hidden="true" style={{ color: "#c96e30", marginTop: "10px", marginLeft: "6px", fontSize: "10px" }}></i>
              <Login
                show={modalShow}
                ModalSetter={setModalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
            {/* <Toast show={open} onClose={toggleShow} className="Logintoast" ref={refOne}>
              <Toast.Body>
                <div className='p-2'>
                  <div>
                    <h5 className="fw-bold mb-0">Hey Traveller</h5>
                    <p className="m-0">Get exclusive deals & Manage your trips</p>
                    <button className="btn btn-warning w-100 mt-2 fw-bold" onClick={() => setModalShow(true)}>Login/Sign Up</button>
                  </div>
                  <div className="ms-3 pt-1">
                    <div className="d-flex mt-2">
                      <img src={Offers} style={{ height: "20px", width: "20px" }} alt="img"></img>
                      <NavLink to='/home/offers' style={{ textDecoration: "none" }}>
                        <h6 className="ms-2 fw-bold text-dark">Offers</h6>
                      </NavLink>
                    </div>
                    <div className="d-flex">
                      <img src={Suitcase} alt="img" style={{ height: "20px", width: "20px" }}></img>
                      <NavLink to='/home/triphistory' style={{ textDecoration: "none" }}>
                        <h6 className="ms-2 fw-bold text-dark">Manage Booking</h6>
                      </NavLink>
                    </div>
                    <div className="d-flex">
                      <img src={Coin} alt="img" style={{ height: "20px", width: "20px" }}></img>
                      <h6 className="ms-2 fw-bold">Wallet</h6>
                    </div>
                  </div>
                </div>
              </Toast.Body>
            </Toast> */}
          </div>
        </div>
      </Navbar>
    </div>


  );
};
export default withRouter(CustomNavbar);