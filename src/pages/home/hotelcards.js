import React, { useState } from "react";
import Hotel from '../../asset/images/hotel/hotel1.jpg';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Hotel1 from '../../asset/images/hotel/room1.jpg'
import Hotel2 from '../../asset/images/hotel/room2.jpg'
import Hotel3 from '../../asset/images/hotel/room.jpg'
import Hotel4 from '../../asset/images/hotel/hotel2.jpg';
import Hotel5 from '../../asset/images/hotel/hotel3.jpg';
import Hotel6 from '../../asset/images/hotel/room.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { Card, Badge,Row,Col,Button } from 'react-bootstrap';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useStore, useDispatch } from "react-redux";
const SimilarHotels = () => {
    const [SliderRef, setSliderRef] = useState(null)




    const sliderOption = {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        // lazyLoad: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 450,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    }


    /* # STORE */
    const hotelSearchList = useSelector(state => state.HotelSearch);
    const store = useStore()


    return (
        <>
            <Card className="container mt-5 Hojoyhotelcards1   cardrad" >
              
                    <h4 className="fw-bold text-center mt-3 text-white">Nearby Hotels</h4>
              
                <Card.Body className="dealsTab">
                    <Row>
                        <Col className="my-auto leftcoldeals3">
                            <Button variant="light" size="lg" onClick={SliderRef?.slickPrev} className="slidebutton rounded-circle">
                                <FontAwesomeIcon icon={faArrowLeftLong} />
                            </Button>
                        </Col>
                        <Col xs={11}>
                            <div className="HojoyBankoffers  mt-3">
                                <Slider ref={setSliderRef} {...sliderOption}>
                                    <div className="hotelCARD">
                                        <img src={Hotel1} alt="hotel" height={170} width="100%"/>
                                        <div>
                                            <p></p>
                                            <h4 className="fw-bold">Hotel Vinayak</h4>
                                            <p className="small">Near Coimbatore Train Station</p>
                                            <h6 className="fw-bold"><Badge bg="success">3.9/5</Badge> 3860 reviews</h6>
                                            <div>
                                                <h6 className="fw-bold">Rating</h6>
                                                <span className="hint-star star">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="hotelCARD">
                                        <img src={Hotel2} alt="hotel"  height={170} width="100%" />
                                        <div>

                                            <p></p>
                                            <h4 className="fw-bold">Hotel Queen Park</h4>
                                            <p className="small">Near Coimbatore Train Station</p>
                                            <h6 className="fw-bold"><Badge bg="success">3.9/5</Badge> 3860 reviews</h6>

                                            <div>
                                                <h6 className="fw-bold">Rating</h6>
                                                <span className="hint-star star">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="hotelCARD">
                                        <img src={Hotel3} alt="hotel"  height={170} width="100%" />
                                        <div>

                                            <p></p>
                                            <h4 className="fw-bold">Hotel Green Land</h4>
                                            <p className="small">Near Coimbatore Train Station</p>
                                            <h6 className="fw-bold"><Badge bg="success">3.9/5</Badge> 3860 reviews</h6>
                                            <div>
                                                <h6 className="fw-bold">Rating</h6>
                                                <span className="hint-star star">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="hotelCARD">
                                        <img src={Hotel4} alt="hotel"  height={170} width="100%" />
                                        <div>
                                            <p></p>
                                            <h4 className="fw-bold">Hotel SaiRam</h4>
                                            <p className="small">Near Coimbatore Train Station</p>
                                            <h6 className="fw-bold"><Badge bg="success">3.9/5</Badge> 3860 reviews</h6>
                                            <div>
                                                <h6 className="fw-bold">Rating</h6>
                                                <span className="hint-star star">
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="hotelCARD">
                                        <img src={Hotel5} alt="hotel"  height={170} width="100%" />
                                        <p></p>
                                        <h4 className="fw-bold">Hotel Vinayak</h4>
                                        <p className="small">Near Coimbatore Train Station</p>
                                        <h6 className="fw-bold"><Badge bg="success">3.9/5</Badge> 3860 reviews</h6>
                                        <div>
                                            <h6 className="fw-bold">Rating</h6>
                                            <span className="hint-star star">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </span>
                                        </div>


                                    </div>
                                    <div className="hotelCARD">
                                        <img src={Hotel6} alt="hotel"  height={170} width="100%" />
                                        <p></p>
                                        <h4 className="fw-bold">Hotel Vinayak</h4>
                                        <p className="small">Near Coimbatore Train Station</p>
                                        <h6 className="fw-bold"><Badge bg="success">3.9/5</Badge> 3860 reviews</h6>
                                        <div>
                                            <h6 className="fw-bold">Rating</h6>
                                            <span className="hint-star star">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                            </span>
                                        </div>


                                    </div>
                                </Slider>
                            </div>
                        </Col>
                        <Col className="my-auto rightcoldeals3 ">
                            <Button variant="light" size="lg" onClick={SliderRef?.slickNext} className="slidebutton3 rounded-circle">
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </Button>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </>
    )
}

export default SimilarHotels