import React, { useState } from "react";
import { Tab, Tabs, Card, Row, Col, Button } from 'react-bootstrap';
import BankOfferDetails from "../../json/home/bankoffers"
import BusOfferDetails from "../../json/home/bus"
import CarOfferDetails from "../../json/home/car"
import HotelOfferDetails from "../../json/home/hotel"
import FlightOfferDetails from "../../json/home/flight"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const Offers = () => {

    const [SliderReference, setSliderReference] = useState(null)
    const [SliderReferenceflight, setSliderReferenceflight] = useState(null)
    const [SliderReferencehotel, setSliderReferencehotel] = useState(null)
    const [SliderReferencebus, setSliderReferencebus] = useState(null)
    const [SliderReferencecar, setSliderReferencecar] = useState(null)

    const sliderSettings = {

        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        lazyLoad: true,
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
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
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

    return (
        <>
            <Card className="container hojoyoffers-Label cardrad">
                <p className="fw-bold text-center mt-3">Offers For You</p>
                <Card.Header className="">
                    <Row className="text-end">
                        <Col >
                            {/* <p className="fw-bold">Offers For You</p> */}
                            <Row>
                                <Tabs className="text-primary">
                                    <Tab eventKey="Bankoffer" title="All Offer" className="dealsTab">
                                        <Row>
                                            <Col className="my-auto">
                                                <Button variant="light" size="lg" onClick={SliderReference?.slickPrev} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowLeftLong} />
                                                </Button>
                                            </Col>
                                            <Col xs={11} className="HojoyBankoffersmedia">
                                                <div className="HojoyBankoffers mt-3">
                                                    <Slider ref={setSliderReference} {...sliderSettings}>
                                                        {BankOfferDetails.map((card, index) => (
                                                            <Card className="OFFERS-CARD">
                                                                <Row className="offerscard">
                                                                    <Col xs={5} className="bannerimage">
                                                                        <img src={card.Banner} alt="img1" className="bannerimage" width={130} height={130}></img>
                                                                    </Col>
                                                                    <Col className="flex-3">
                                                                        <h4 className="text-muted fw-bold mt-2 pb-3">{card.Description}</h4>
                                                                        <h4 className="fw-bold">{card.offer}</h4>
                                                                        <h6 className="text-danger fw-bold">{card.valid}</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-5">
                                                                    <Button variant="light" className="text-primary fw-bold cardbtn" >View More Details <FontAwesomeIcon icon={faAngleRight} /></Button>
                                                                </Row>
                                                            </Card>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </Col>
                                            <Col className="my-auto rightcoldeals ">
                                                <Button variant="light" size="lg" onClick={SliderReference?.slickNext} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Tab>
                                    <Tab eventKey="Flight" title="Flight" className="dealsTab">
                                        <Row>
                                            <Col className="my-auto">
                                                <Button variant="light" size="lg" onClick={SliderReferenceflight?.slickPrev} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowLeftLong} />
                                                </Button>
                                            </Col>
                                            <Col xs={11}>
                                                <div className="HojoyBankoffers mt-3">
                                                    <Slider ref={setSliderReferenceflight} {...sliderSettings}>
                                                        {FlightOfferDetails.map((card, index) => (
                                                            <Card className="OFFERS-CARD">
                                                                <Row>
                                                                    <Col xs={5} className="bannerimage">
                                                                        <img src={card.Banner} alt="img1" className="bannerimage" width={130} height={130}></img>
                                                                    </Col>
                                                                    <Col className="flex-3">

                                                                        <h4 className="text-muted fw-bold mt-2 pb-3">{card.Description}</h4>
                                                                        <h4 className="fw-bold">{card.offer}</h4>
                                                                        <h6 className="text-danger fw-bold">{card.valid}</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-5">
                                                                    <Button variant="light" className="text-primary fw-bold" >View More Details <FontAwesomeIcon icon={faAngleRight} /></Button>
                                                                </Row>
                                                            </Card>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </Col>
                                            <Col className="my-auto rightcoldeals ">
                                                <Button variant="light" size="lg" onClick={SliderReferenceflight?.slickNext} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Tab>
                                    <Tab eventKey="Hotel" title="Hotel" className="dealsTab">
                                        <Row>
                                            <Col className="my-auto">
                                                <Button variant="light" size="lg" onClick={SliderReferencehotel?.slickPrev} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowLeftLong} />
                                                </Button>
                                            </Col>
                                            <Col xs={11}>
                                                <div className="HojoyBankoffers mt-3">
                                                    <Slider ref={setSliderReferencehotel} {...sliderSettings}>
                                                        {HotelOfferDetails.map((card, index) => (
                                                            <Card className="OFFERS-CARD">
                                                                <Row>
                                                                    <Col xs={5} className="bannerimage">
                                                                        <img src={card.Banner} alt="img1" className="bannerimage" width={130} height={130}></img>
                                                                    </Col>
                                                                    <Col className="flex-3">

                                                                        <h4 className="text-muted fw-bold mt-2 pb-3">{card.Description}</h4>
                                                                        <h4 className="fw-bold">{card.offer}</h4>
                                                                        <h6 className="text-danger fw-bold">{card.valid}</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-5">
                                                                    <Button variant="light" className="text-primary fw-bold" >View More Details <FontAwesomeIcon icon={faAngleRight} /></Button>
                                                                </Row>
                                                            </Card>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </Col>
                                            <Col className="my-auto rightcoldeals ">
                                                <Button variant="light" size="lg" onClick={SliderReferencehotel?.slickNext} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Tab>
                                    <Tab eventKey="Car" title="Car" className="dealsTab">
                                        <Row>
                                            <Col className="my-auto">
                                                <Button variant="light" size="lg" onClick={SliderReferencecar?.slickPrev} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowLeftLong} />
                                                </Button>
                                            </Col>
                                            <Col xs={11}>
                                                <div className="HojoyBankoffers mt-3">
                                                    <Slider ref={setSliderReferencecar} {...sliderSettings}>
                                                        {CarOfferDetails.map((card, index) => (
                                                            <Card className="OFFERS-CARD">
                                                                <Row>
                                                                    <Col xs={5} className="bannerimage">
                                                                        <img src={card.Banner} alt="img1" className="bannerimage" width={130} height={130}></img>
                                                                    </Col>
                                                                    <Col className="flex-3">

                                                                        <h4 className="text-muted fw-bold mt-2 pb-3">{card.Description}</h4>
                                                                        <h4 className="fw-bold">{card.offer}</h4>
                                                                        <h6 className="text-danger fw-bold">{card.valid}</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-5">
                                                                    <Button variant="light" className="text-primary fw-bold" >View More Details <FontAwesomeIcon icon={faAngleRight} /></Button>
                                                                </Row>
                                                            </Card>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </Col>
                                            <Col className="my-auto rightcoldeals ">
                                                <Button variant="light" size="lg" onClick={SliderReferencecar?.slickNext} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Tab>
                                    <Tab eventKey="Bus" title="Bus" className="dealsTab">
                                        <Row>
                                            <Col className="my-auto">
                                                <Button variant="light" size="lg" onClick={SliderReferencebus?.slickPrev} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowLeftLong} />
                                                </Button>
                                            </Col>
                                            <Col xs={11}>
                                                <div className="HojoyBankoffers mt-3">
                                                    <Slider ref={setSliderReferencebus} {...sliderSettings}>
                                                        {BusOfferDetails.map((card, index) => (
                                                            <Card className="OFFERS-CARD">
                                                                <Row>
                                                                    <Col xs={5} className="bannerimage">
                                                                        <img src={card.Banner} alt="img1" className="bannerimage" width={130} height={130}></img>
                                                                    </Col>
                                                                    <Col className="flex-3">

                                                                        <h4 className="text-muted fw-bold mt-2 pb-3">{card.Description}</h4>
                                                                        <h4 className="fw-bold">{card.offer}</h4>
                                                                        <h6 className="text-danger fw-bold">{card.valid}</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-5">
                                                                    <Button variant="light" className="text-primary fw-bold" >View More Details <FontAwesomeIcon icon={faAngleRight} /></Button>
                                                                </Row>
                                                            </Card>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </Col>
                                            <Col className="my-auto rightcoldeals ">
                                                <Button variant="light" size="lg" onClick={SliderReferencebus?.slickNext} className="slidebutton rounded-circle">
                                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Tab>
                                </Tabs>
                            </Row>
                        </Col>
                        <Col className="mt-2">
                            <Button variant="light" className="text-primary fw-bold p-0 my-3" >See All Offers <FontAwesomeIcon icon={faAngleRight} /></Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body >



                </Card.Body>
            </Card>

        </>

    )

}
export default Offers;