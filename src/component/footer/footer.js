import '../footer/footer.scss'
import Logo from '../../asset/images/logo.png';
import FaceBook from '../../asset/images/facebook.png';
import Instagram from '../../asset/images/instagram.png';
import Twitter from '../../asset/images/twitter.png';
import Android from '../../asset/images/android.png';
import MasterCard from '../../asset/images/master.gif';
import Visa from '../../asset/images/visa.png';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Footer = () => {

    const history = useHistory();
    const handlePolicy = () => {
        history.push("/privacypolicy")
    }
    return (
        <div>
            <div className="footer-bg">
                <div className='container  text-muted'>
                    <div className='row'>
                        <div className='col text-light'>
                            <h5 className='h5'>Call Us</h5>
                            <p className='mb-0 ps-2 bor a'>98491 44844 </p>
                            <p className='mt-0 ps-2 bor a'>93939 60999</p>
                            <h5 className='h5 bor1'>Email</h5>
                            <p className='ps-2 bor a'>hojoycomforts@gmail.com</p>
                            {/* <div className='logo'>
                                <h5 className='mb-0 text-muted'>Ho Joy Comforts</h5>
                                <img src={Logo} alt="logo" className='ps-2' />
                            </div> */}
                            {/* <div>
                                <h5 className='text-muted'>Follow Us</h5>
                                <img src={FaceBook} alt="facebook" className='ms-2 ' style={{ height: "30px", width: "30px",cursor: "pointer" }} />
                                <img src={Instagram} alt="instagram" className='ms-2' style={{ height: "35px", width: "35px",cursor: "pointer" }} />
                                <img src={Twitter} alt="twitter" className='ms-2' style={{ height: "30px", width: "30px", cursor: "pointer" }} />
                            </div> */}
                        </div>
                        <div className="col products ">
                            <h5 className='h5'>Our Products</h5>
                            <ul className='ourlist text-muted'>
                                <li> <NavLink to='/hotel'>Domestic Hotels</NavLink></li>
                                <li><NavLink to='/flight'>International Flights</NavLink></li>
                                <li><NavLink to='/flight'>Domestic Flights</NavLink></li>
                                <li><NavLink to='/flight'>Multi-City Flights</NavLink></li>
                                <li><NavLink to='/bus'>Bus Booking</NavLink></li>
                                <li><NavLink to='/car'>Cab Booking</NavLink></li>
                                <li><NavLink to='/car'>Airport Cabs Booking</NavLink></li>
                                <li><NavLink to='/car'>Outstation Cabs Booking</NavLink></li>
                            </ul>
                        </div>
                        <div className='col footer2 text-light'>
                            <h5 className='h5'>Packages</h5>
                            <ul>
                                <li className='bor a'>Goa</li>
                                <li className='bor a'>Kashmir</li>
                                <li className='bor a'>Andaman</li>
                                <li className='bor a'>Kerala</li>
                                <li className='bor a'>Lakshadweep</li>
                                <li className='bor a'>All Packages</li>
                            </ul>
                        </div>
                        <div className='col text-light'>
                            <h5 className='h5'>Support</h5>
                            <ul className='ms-1'>
                                <li className='bor a'><a onClick={() => { history.push('/aboutus') }}>About Us</a></li>
                                <li className='bor a'><a onClick={() => { history.push('/contactus') }}>Contact</a></li>
                                <li className='bor a'><a onClick={handlePolicy}>Privacy Policy</a></li>
                                <li className='bor a'><a onClick={() => { history.push('/termsandconditions') }}>Terms & Conditions</a> </li>
                            </ul>
                        </div>

                    </div>
                    {/* sasi */}
                    <div className='row footermedia'>
                        <div className='col'>
                            <div className='logo'>
                                <h5 className='mb-0 h5'>Leo trip Comforts</h5>
                                <img src={Logo} alt="logo" className='ps-2' />
                            </div>

                        </div>
                        <div className='col'>

                            <h5 className='h5'>Follow Us</h5>
                            <div className='footerlogo'>
                            <img src={FaceBook} alt="facebook" className='ms-2 mt-1' style={{ height: "35px", width: "35px", cursor: "pointer" }} />
                            <img src={Instagram} alt="instagram" className='ms-2' style={{ height: "40px", width: "40px", cursor: "pointer" }} />
                            <img src={Twitter} alt="twitter" className='ms-2 mt-1' style={{ height: "35px", width: "35px", cursor: "pointer" }} />
                            </div>
                        </div>
                        <div className='col footer1'>
                            <h5 className='h5'>Pay Safely With Us</h5>
                            {/* <p className='ms-2'>The payment is encrypted and transmitted securely with an SSL protocol.</p> */}
                            <img src={Visa} alt="visa" className='ms-1' style={{ height: "35px", width: "35px" }} />
                            <img src={MasterCard} alt="mastercard" className='ms-2' style={{ height: "35px", width: "35px" }} />
                            <br />
                            {/* <span className='ms-2' style={{ fontSize: "10px", color: "powderblue" }}>Download our Android App</span>
                            <img src={Android} alt="android" className='ms-1 mt-1' style={{ height: "50px", width: "180px" }} /> */}
                        </div>
                        <div className='col'>
                            <span className='ms-2' style={{ fontSize: "10px", color: "powderblue" }}>Download our Android App</span>
                            <img src={Android} alt="android" className='ms-1 mt-1' style={{ height: "50px", width: "180px" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom d-flex justify-content-center'>
                <p className='p-3 text-muted bottomcon'> © 2022 Travel. All Rights Reserved.</p>
            </div>
        </div>

    );


};
export default withRouter(Footer);