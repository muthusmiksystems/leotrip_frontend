import React, { useState, useEffect } from 'react';
import { Modal, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import './login.scss';
import { useHistory } from 'react-router-dom';
import firebase from "../../firebase";
import { event } from 'jquery';
import { loadSignup } from "../../store/actions/signup"
import { useDispatch, useSelector, useStore } from "react-redux";

const Login = (props) => {

    const [accname, setAccname] = useState('')

    const [mobileno, setMobileno] = useState('')

    const [mobileval, setMobileval] = useState('')

    const [vtoken, setVtoken] = useState('')

    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [view, setView] = useState(false);
    const [show, setShow] = useState(true);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [errormsg, setErrormsg] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });



    const handleName = (e) => {
        setAccname(e.target.value)
    }

    const handleChangeNumber = (e) => {
        setErrormsg("");
        setMobileno(e.target.value);
    }

    const handleChangeOtp = (e) => {
        setErrormsg("");
        setOtp(e.target.value);
    }

    const handleChangePassword = (e) => {
        setErrormsg("");
        setPassword(e.target.value);
    }

    const configureCaptcha = async () => {
        return await new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
                console.log("Recaptca varified")
            },
            defaultCountry: "IN"
        });
    }

    const onSignInSubmit = async (e) => {
        e.preventDefault();
        if (mobileno !== undefined) {
            if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileno)) {
                console.log("It is a mobile number");
                if (mobileno.length == 0) {
                    setErrormsg("Please enter mobile number");
                    console.log("lenth")
                }
                else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileno)) {
                    console.log("patten")
                    setErrormsg("Please enter valid mobile number!");
                }
                else {
                    setErrormsg("");
                    window.recaptchaVerifier = await configureCaptcha()
                    const phoneNumber = "+91" + mobileno
                    setMobileval(phoneNumber)
                    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
                        .then((confirmationResult) => {
                            window.confirmationResult = confirmationResult;
                            setMinutes(0);
                            setSeconds(59);
                            console.log("OTP has been sent")
                            setShowPage(false);
                            setViewVerify(true);
                        }).catch((error) => {
                            setErrormsg(error.message);
                            window.location.reload();
                            console.log("SMS not sent...", error)
                        });
                }
            }
            else {
                setErrormsg("Please enter valid mobile number!");
            }
        }
        else {
            setErrormsg("Please enter valid mobile number!");
        }
    }

    const dispatch = useDispatch();

    const onSubmitOTP = (e) => {
        e.preventDefault();
        console.log("sss")
        if (otp !== undefined) {
            console.log("jk")
            if (otp.length === 0) {
                setErrormsg("Please enter 6 digit OTP");
            }
            else if (otp.length < 6) {
                setErrormsg("Please enter 6 digit OTP");
                console.log("lenth")
            }
            else {
                setErrormsg("");
                const code = otp
                console.log("props ........", props)
                window.confirmationResult.confirm(code).then((result) => {
                    const user = JSON.stringify(result.user);
                    const usertoken = JSON.parse(user)
                    setVtoken(usertoken.stsTokenManager.accessToken)
                    setShow(false)
                    setViewVerify(false)
                    setShowPage(true)
                    props.ModalSetter(false)
                    setView(true)
                    console.log("All details", accname, mobileval, usertoken.stsTokenManager.accessToken)
                    const signup = {
                        "mobileNumber": mobileval,
                        "firebaseToken": usertoken.stsTokenManager.accessToken
                    }
                    dispatch(loadSignup(signup));
                }).catch((error) => {
                    console.log("error code", error);
                    if (error.code === "auth/code-expired") {
                        setErrormsg("OTP expired");
                    }
                    else {
                        setErrormsg("Invalid OTP");
                    }
                    console.log("non", error)
                });
            }
        }
        else {
            console.log("Tk")
            setErrormsg("Please enter valid 6 digit OTP!");
        }
    }

    const onSubmitPassword = (e) => {
       
        if (password !== undefined) {
            console.log("jk")
            if (password.length === 0) {
                setErrormsg("Please enter your password");
            }
            else {
                setErrormsg("");
                e.preventDefault()
                const code = password
                console.log(code)
            }
        }
        else {
            setErrormsg("Please enter valid 6 digit OTP!");
        }

    }

    const resendconfigureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('resend-recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
                console.log("Recaptca varified")
            },
            defaultCountry: "IN"
        });
    }


    const resendOTP = (e) => {
        e.preventDefault()
        resendconfigureCaptcha()
        const phoneNumber = mobileval
        setMobileval(phoneNumber)
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setMinutes(0);
                setSeconds(59);
                console.log("OTP has been sent")
            }).catch((error) => {
                setErrormsg("Rendered many times,Try again later");
                console.log("SMS not sent", error)
            });
    };


    const Signupdetails = useSelector(state => state.Signup);
    const [signupres, setSignupres] = useState();


    const usertoken = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {

    }, [usertoken])

    const history = useHistory();
    const handleSubmit = () => {
        history.push("/home/profilepage")
    }

    const handlemodelClose = () => {
        props.ModalSetter(false)
        if (usertoken == null) {
            setView(false)
        }
        else {
            setView(false)
        }
    }

    const handleloginClose = () => {
        console.log("river", props)
        props.onHide(false)
        // setShow(false)
        setViewVerify(false);
        setShowPage("false");

    }

    const handleEdit = () => {
        setErrormsg("");
        setViewVerify(false);
        setPasswordPage(false);
        setShowPage("true");
    }



    // #verification page

    const [showPage, setShowPage] = useState(true);
    const [viewVerify, setViewVerify] = useState(false);
    const [passwordPage, setPasswordPage] = useState(false);
    return (
        <>
            {props?.show && (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>

                        <div className='row modalcontainer'>
                            <div className='col-md-6 logintheme'>
                                <h3 className='benefitsList'>comfy <span className='fs-3'>stays</span></h3>
                                <ul className="fa-ul benefitsListItem ps-5">
                                    <li><span class="fa-li"><FontAwesomeIcon icon={faCircleCheck} className="icolor" /></span>Save traveler details</li>
                                    <li><span class="fa-li"><FontAwesomeIcon icon={faCircleCheck} className="icolor" /></span>Manage and modify bookings</li>
                                    <li><span class="fa-li"><FontAwesomeIcon icon={faCircleCheck} className="icolor" /></span>Hassle-free web check-in</li>
                                </ul>
                            </div>
                            {showPage && (<div className='col-md-6 loginposition'>
                                <Card className='loginPage border border-light'>
                                    <div className='d-flex justify-content-end m-3 mb-0 '>
                                        <button type="button" class="btn-close btn-close-danger  bg-danger d-block" aria-label="Close" onClick={(e) => handleloginClose(e)}></button>
                                    </div>
                                    <div className='h-50 w-100 my-auto p-3' >
                                        <h4 className='fw-bold'>Login/Signup</h4>
                                        <Form>
                                            <div id="recaptcha-container"></div>
                                            {/* <Form.Group className="mb-3 fw-bold" onChange={handleName} >
                                                <Form.Label className='mt-2'>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Your Name" />
                                            </Form.Group> */}
                                            <Form.Group className="mb-3 fw-bold" onChange={handleChangeNumber} >
                                                <Form.Label className='mt-2'>Mobile Number</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Mobile Number"
                                                    pattern="[0-9]{10}"
                                                />
                                            </Form.Group>
                                            <small className="font-weight-bold text-danger mt-2">{errormsg}</small>

                                            <div className="d-grid gap-2">
                                                <Button className='continue' onClick={(e) => onSignInSubmit(e)} >Continue</Button>
                                            </div>
                                        </Form>
                                    </div >
                                </Card>
                            </div>)}
                            {viewVerify && (<div className='col-md-6 loginposition'>
                                <Card className='loginPage border border-light'>
                                    <div className='d-flex justify-content-end m-3 mb-0 '>
                                        <button type="button" class="btn-close btn-close-danger  bg-danger d-block" aria-label="Close" onClick={(e) => handleloginClose(e)}></button>
                                    </div>
                                    <Card.Body className='d-flex '>
                                        <div className='h-50 w-100 my-auto p-3'>
                                            <div id="resend-recaptcha"></div>
                                            <h4 className='fw-bold'>Verify OTP</h4>
                                            <Form>
                                                <Form.Group className="mb-3 fw-bold" >
                                                    <Form.Group className="mb-3 fw-bold" onChange={handleChangeOtp} >
                                                        <Form.Label className='mt-2 text-muted'>Enter 6 digit OTP<br />
                                                            &nbsp;
                                                            <span className='ms-5'>{mobileno}&nbsp;
                                                                <small className='fw-bold text-primary' onClick={(e) => handleEdit(e)}>Edit</small></span>
                                                        </Form.Label>
                                                        <Form.Control type="text"
                                                            placeholder="Enter Your OTP"
                                                            maxLength={6} />
                                                    </Form.Group>
                                                </Form.Group>
                                                <h6 className="font-weight-bold text-danger mt-2">{errormsg}</h6>
                                                <div className="countdown-text d-flex">
                                                    {seconds > 0 || minutes > 0 ? (
                                                        <p>
                                                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                                            {seconds < 10 ? `0${seconds}` : seconds}
                                                        </p>
                                                    ) : (
                                                        <p className='me-5'>Didn't recieve code?</p>
                                                    )}

                                                    <span className='ms-5'
                                                        disabled={seconds > 0 || minutes > 0}
                                                        style={{
                                                            cursor: "pointer", color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630"
                                                        }}
                                                        onClick={(e) => resendOTP(e)}
                                                    >
                                                        Resend OTP
                                                    </span>
                                                </div>
                                                <div className="d-grid gap-2">
                                                    <Button variant="primary" onClick={(e) => onSubmitOTP(e)}>Continue</Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            )}
                            {passwordPage && (<div className='col-md-6 loginposition'>
                                <Card className='loginPage border border-light'>
                                    <div className='d-flex justify-content-end m-3 mb-0 '>
                                        <button type="button" class="btn-close btn-close-danger  bg-danger d-block" aria-label="Close" onClick={(e) => handleloginClose(e)}></button>
                                    </div>
                                    <Card.Body className='d-flex '>
                                        <div className='h-50 w-100 my-auto p-3'>
                                            <div id="resend-recaptcha"></div>
                                            <h4 className='fw-bold'>Password Email</h4>
                                            <Form>
                                                <Form.Group className="mb-3 fw-bold" >
                                                    <Form.Group className="mb-3 fw-bold" onChange={handleChangePassword} >
                                                        <Form.Label className='mt-2 text-muted'>Enter your password<br />
                                                            {/* &nbsp;
                                                            <span className='ms-5'>{mobileno}&nbsp;
                                                                <small className='fw-bold text-primary' onClick={(e) => handleEdit(e)}>Edit</small></span> */}
                                                        </Form.Label>
                                                        <Form.Control type="text"
                                                            placeholder="Password"
                                                            /* maxLength={6} */ />
                                                    </Form.Group>
                                                </Form.Group>
                                                <h6 className="font-weight-bold text-danger mt-2">{errormsg}</h6>
                                                <div className="d-grid gap-2">
                                                    <Button variant="primary" onClick={(e) => onSubmitPassword(e)}>Continue</Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
            )}
            {(Signupdetails?.data?.data?.result) ? (
                <Modal show={view} centered >
                    <div style={{ backgroundColor: "#D0F0C0", borderRadius: "10px" }}>
                        <div className='d-flex justify-content-end m-1 mb-0 '>
                            <button type="button" class="btn-close btn-close-danger  bg-danger d-block" aria-label="Close" onClick={handlemodelClose}></button>
                        </div>

                        <Modal.Header className='d-flex justify-content-center border-0'>
                            {(Signupdetails.data?.data && Signupdetails.data?.data?.result) ? (
                                <Modal.Title>
                                    <h5 className='mt-0'>Congratulations</h5>
                                    <h6 className='text-muted'>{Signupdetails.data?.data?.result?.mesg}</h6>

                                </Modal.Title>
                            ) : (
                                <Modal.Title>
                                    <h5 className='mt-0'>Something went wrong</h5>
                                    <h6 className='text-muted'>try again later</h6>
                                </Modal.Title>
                            )}
                        </Modal.Header>
                    </div>
                    {(Signupdetails.data?.data?.result?.mesg ==="User Created Successfully") ? (
                        <Modal.Body style={{ height: '300px' }}>
                            <Form className='container'>
                                <h6>Just one more thing.</h6>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        id="name"
                                        type="text"
                                        size="sm"
                                        placeholder="Enter Your Full Name"
                                    />
                                    <label htmlFor="floatingInputCustom">What do we call you?</label>
                                </Form.Floating>
                                <Form.Floating>
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        size="sm"
                                        placeholder="Enter Your Email Address"
                                    />
                                    <label htmlFor="floatingPasswordCustom">What's your email id?</label>
                                </Form.Floating>
                            </Form>
                            <Button variant="success" className='w-100 mt-2' onClick={handleSubmit}>Submit</Button>
                            <p className='link-primary text-center mt-3' onClick={handlemodelClose}>I'll do it later</p>
                        </Modal.Body>
                    ) :
                        null}
                </Modal>
            ) : null}
        </>
    )
}
export default Login
