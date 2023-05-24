import React, { useState, useEffect, useRef } from 'react';
import './flight.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomButton from '../../component/button';
import { useHistory } from 'react-router-dom';
import CustomDatePickers from "../../component/datepicker/singledatepicker"
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import AutoSuggest from "react-autosuggest";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import { loadFlightList } from "../../store/actions/flightsearch"
import MultiDatePickers from '../../component/datepicker/flightmultipicker';
import { addDays, format } from 'date-fns';
const RoundTrip = () => {

    /* # AirportCityList */
    const [airportcity, setAirportcity] = useState()

    const airportcitylist = useSelector(state => state.AirportCityList);
    useEffect(() => {
        setAirportcity(airportcitylist.data)
    }, [airportcitylist])

    const history = useHistory();

    const dispatch = useDispatch();

    /* # Error Handle */
    const [errormsg, setErrormsg] = useState('');



    const handleSubmit = () => {

        console.log("K-paper", options, "yy", selectedDay, "gk", returnselection)

        if (fromaddress == '') {
            setErrormsg('Please Enter the Valid Location !');
        }
        else if (toaddress == '') {
            setErrormsg('Please Enter the Valid Location !');
        }
        else if ((fromaddress.suggestion.airport_code).localeCompare(toaddress.suggestion.airport_code) === 0) {
            setErrormsg('Source and Destination cannot be same');
        }
        else {
            setErrormsg('')
            console.log("options", options);
            history.push("/flight/flightlist-roundtrip", { state: options })

            const flightSearchList = {
                "EndUserIp": "107.180.105.183",
                "ClientId": "180109",
                "UserName": "SKdigPa8",
                "Password": "A$JSkEf4#4",
                "AdultCount": options.adult,
                "ChildCount": options.children,
                "InfantCount": options.Infants,
                "JourneyType": "2",
                "Sources": null,
                "Segments": [
                    {
                        "Origin": fromaddress.suggestion?.airport_code,
                        "Destination": toaddress.suggestion?.airport_code,
                        "FlightCabinClass": triptype.id,
                        "PreferredDepartureTime": moment(selectedDay).format("YYYY-MM-DDT00:00:00"),
                        "PreferredArrivalTime": moment(selectedDay).format("YYYY-MM-DDT00:00:00")
                    },
                    {
                        "Origin": toaddress.suggestion?.airport_code,
                        "Destination": fromaddress.suggestion?.airport_code,
                        "FlightCabinClass": triptype.id,
                        "PreferredDepartureTime": moment(returnselection).format("YYYY-MM-DDT00:00:00"),
                        "PreferredArrivalTime": moment(returnselection).format("YYYY-MM-DDT00:00:00")
                    },
                ]
            }
            dispatch(loadFlightList(flightSearchList));


            let localstores = [];
            localstores.push({ "Source_code": fromaddress.suggestion?.airport_code });
            localstores.push({ "Source": valueDes });
            localstores.push({ "Destination_code": toaddress.suggestion?.airport_code });
            localstores.push({ "Destination": destinationdata });
            localstores.push({ "Travelclass": triptype.className });
            localstores.push({ "Departure": moment(selectedDay).format("MMM DD YYYY") });
            localstores.push({ "Travellers": options });
            localstores.push({ "JourneyType": "2" })
            localstores.push({ "Return": moment(returnselection).format("MMM DD YYYY") });
            localStorage.setItem('travelDetails', JSON.stringify(localstores));
            localStorage.setItem('sourcedata', JSON.stringify(fromaddress));
            localStorage.setItem('destinationdata', JSON.stringify(toaddress));
            localStorage.setItem('triptype', JSON.stringify(triptype));

        }

    }

    /*  # Source */
    const [fromaddress, setFromaddress] = useState("");
    /* # Destination */
    const [toaddress, setToaddress] = React.useState("");
    /*  #swapping */
    const switchText = (from, to) => {
        console.log("swapping", to.suggestion.airport_city_name);
        handleSelection(to)
        handleSelectiondestination(from)
        setValueDes(to.suggestion.airport_city_name)
        setDestinationdata(from.suggestion.airport_city_name);
    }




    /* # DatePicker */

    const [selectedDay, setSelectedDay] = useState(Date);
    const [date, setDate] = useState('')

    const handleDayClick = (day) => {
        setDate(format(day, 'PP'))
        setSelectedDay(day)
        setReturnDate(moment(day).add(1, 'day').format('MMM DD, yyyy'), 'PP')
        setReturnSelection(moment(day).add(1, 'day').format('MMM DD, yyyy'))
    };
    useEffect(() => {
        // set current date on component load
        setDate(format(new Date(), 'PP'))

        /*  # On clicking Outside */
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])


    /* # Hide on outside click */

    const refOne = useRef(null);
    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    /* # DatePicker(Return) */

    const today = new Date();

    const [returnselection, setReturnSelection] = useState(moment(new Date()).add(1, 'day').format('MMM DD, yyyy'));
    const [returndate, setReturnDate] = useState('')

    const handleReturnDateClick = (day) => {
        setReturnDate(format(day, 'PP'))
        setReturnSelection(day)
        console.log("jk-paper", day)
    };

    useEffect(() => {
        // set current date on component load
        setReturnDate(moment(new Date()).add(1, 'day').format('MMM DD, yyyy'));
    }, [])


    /*  # AutoSuggest */

    const [destinationdata, setDestinationdata] = useState("");
    const [valueDes, setValueDes] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    function getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : airportcity.filter(lang =>
            lang.airport_city_name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    const handleSelection = (suggestionValue) => {
        setFromaddress(suggestionValue)
    }

    const handleSelectiondestination = (suggestionValue) => {
        setToaddress(suggestionValue)
    }


    /* #traveloption */

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        Infants: 0,
    });
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };
    const [triptype, setTriptype] = useState({ className: "All Class", id: 1 });
    const handleChange = (value) => {
        switch (value) {
            case "Economy":
                {
                    setTriptype({ className: "Economy", id: 2 });
                }
                break;
            case "Business":
                {
                    setTriptype({ className: "Business", id: 4 });
                }
                break;
            case "FirstClass":
                {
                    setTriptype({ className: "FirstClass", id: 6 });
                }
                break;
            case "AllClass":
                {
                    setTriptype({ className: "AllClass", id: 1 });
                }
                break;
            default:
                return "AllClass";
        }
    }
    const defaultSelected = {
        from: today,
        to: addDays(today, 1)
    };
    const [selectedRange, setSelectedRange] = useState(defaultSelected);
    const handleRangeSelect = (range) => {

        setSelectedRange(range);
        if (range?.from) {
            setDate(format(range.from, 'MMM dd, yyyy'));
            setSelectedDay(moment(range.from).format('MMM DD, yyyy'))
        }
        if (range?.to) {
            setReturnDate(format(range.to, 'MMM dd, yyyy'));
            setReturnSelection(moment(range.to).format('MMM DD, yyyy'))
        }
    };



    return (
        <>
            <div className='d-inline-flex flex-wrap content'>

                <div className="search-area mt-4">
                    <p className='w-auto bg-white '>From</p>
                    <AutoSuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={({ value }) => {
                            setValueDes(value);
                            // console.log("I am selected in ...............................",value)
                            setSuggestions(getSuggestions(valueDes));
                        }}
                        onSuggestionSelected={(_, suggestionValue) => { handleSelection(suggestionValue) }}
                        getSuggestionValue={suggestion => suggestion.airport_city_name}
                        renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.airport_city_name} ({suggestion.airport_name})</span>}
                        inputProps={{
                            placeholder: "Enter city or airport",
                            value: valueDes,

                            onChange: (_, { newValue, method }) => {
                                setValueDes(newValue);
                                //    console.log("newValue",newValue)
                            }
                        }}
                        highlightFirstSuggestion={true}
                    />
                </div>

                <div className='icon justify-content-center'>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={() => switchText(fromaddress, toaddress)} style={{ fontSize: "20px", color: "green" }} />
                </div>
                <div className="search-area mt-4" >
                    <p className='w-auto bg-white'>To</p>
                    <AutoSuggest
                        suggestions={suggestions}

                        onSuggestionsFetchRequested={({ value }) => {
                            setDestinationdata(value);
                            // console.log("I am selected in ...............................",value)
                            setSuggestions(getSuggestions(destinationdata));
                        }}
                        onSuggestionSelected={(_, suggestionValue) => { handleSelectiondestination(suggestionValue) }}
                        getSuggestionValue={suggestion => suggestion.airport_city_name}
                        renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.airport_city_name} ({suggestion.airport_name})</span>}
                        inputProps={{
                            placeholder: "Enter city or airport",
                            value: destinationdata,

                            onChange: (_, { newValue, method }) => {
                                setDestinationdata(newValue);
                                //    console.log("newValue",newValue)
                            }
                        }}
                        highlightFirstSuggestion={true}
                    />
                </div>
                <MultiDatePickers
                    departure={date}
                    returndate={returndate}
                    Searchstyle="flight_rangesearchdate"//hotel.scss
                    selected={selectedRange}
                    onSelect={handleRangeSelect}
                    required="required"
                    calanderstyle="flight_calander"
                />
                {/* <div className='dateselection mt-4'>
                    <p>Departure</p>
                    <CustomDatePickers
                        maxDate={moment().format("PP")}
                        value={date}
                        Searchstyle="flight_searchdate"
                        selected={selectedDay}
                        onDayClick={handleDayClick}
                        required="required"
                        calanderstyle="flight_calander"
                    />
                </div>
                <div className='dateselection mt-4'>
                    <p>Return</p>
                    <CustomDatePickers
                        value={returndate}
                        previous={selectedDay}
                        Searchstyle="flight_searchdate"
                        selected={returnselection}
                        onDayClick={handleReturnDateClick}
                        required="required"
                        calanderstyle="flight_calander"
                    />
                </div> */}
                <div className='traveloption mt-3 traveloption1'>
                    <p className='w-auto bg-white'>Travellers & Class</p>
                    <div className="headerSearchItem">
                        <div
                            onClick={() => setOpen(true)}
                            className="w-100 mt-1 text-center" style={{ height: "60px" }}>
                            <span className="headerSearchText">&nbsp;&nbsp;&nbsp;{`${options.adult} adult · ${options.children} children · ${options.Infants} Infants Travel Class: ${triptype.className}`}</span>
                        </div>
                        {open && (
                            <Card className="travelmenucard" style={{ position: 'relative', zIndex: '1' }} ref={refOne}>
                                <Card.Body >
                                    <div className="row text-center ">
                                        <div className="col-3 mx-auto">
                                            <h5>Adult</h5>
                                            <h6>(Aged 12+ yrs)</h6>
                                            <InputGroup className="mx-auto w-75">
                                                <Button size="sm" variant="outline-primary" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                                <Form.Control size="sm" type="text" value={options.adult} className="text-center" />
                                                <Button size="sm" variant="outline-primary" disabled={options.adult >= 10} onClick={() => handleOption("adult", "i")}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </InputGroup>
                                        </div>
                                        <div className="col-3 mx-auto">
                                            <h5>Children</h5>
                                            <h6>(Aged 2-12 yrs)</h6>
                                            <InputGroup className="mx-auto w-75">
                                                <Button size="sm" variant="outline-primary" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                                <Form.Control size="sm" type="text" value={options.children} className="text-center" />
                                                <Button size="sm" variant="outline-primary" disabled={options.children >= 9} onClick={() => handleOption("children", "i")}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </InputGroup>
                                        </div>
                                        <div className="col-3 mx-auto">
                                            <h5>Infants</h5>
                                            <h6>(Below 2 yrs)</h6>
                                            <InputGroup className="mx-auto w-75">
                                                <Button size="sm" variant="outline-primary" disabled={options.Infants <= 0} onClick={() => handleOption("Infants", "d")}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                                <Form.Control size="sm" type="text" value={options.Infants} className="text-center" />
                                                <Button size="sm" variant="outline-primary" disabled={options.Infants >= 9} onClick={() => handleOption("Infants", "i")}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <h5 className="my-3">Travel Class</h5>
                                        {/* <div className="col mx-auto">
                                                <Button variant="outline-primary mx-3" onClick={() => handleChange("Economy")}>Economy</Button>
                                                <Button variant="outline-primary mx-3" onClick={() => handleChange("Business")} >Business</Button>
                                                <Button variant="outline-primary mx-3" onClick={() => handleChange("FirstClass")} >First Class</Button>
                                                <Button variant="outline-primary mx-3" onClick={() => handleChange("AllClass")} >All Class</Button>
                                            </div> */}
                                        <Form.Select className='w-50 mx-auto fw-bold' onChange={(e) => handleChange(e.target.value)}>
                                            <option className="fw-bold" value="AllClass">All Class</option>
                                            <option className="fw-bold" value="Economy">Economy</option>
                                            <option className="fw-bold" value="Business">Business</option>
                                            <option className="fw-bold" value="FirstClass">First Class</option>
                                        </Form.Select>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="bg-white text-end">
                                    <Button variant="outline-primary mx-3" onClick={() => setOpen(false)}>Done</Button>
                                </Card.Footer>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
            <div className='text-center'>
                {(fromaddress === '' || toaddress === '' || ((fromaddress.suggestion.airport_code).localeCompare(toaddress.suggestion.airport_code) === 0)) ? <h6 className="font-weight-bold text-danger mt-2">{errormsg}</h6> : null}
            </div>
            <div className='flightbutton'>
                <CustomButton customstyle='flightbtnsearch' onClick={() => handleSubmit()} value='SEARCH FLIGHTS'></CustomButton>
            </div>
        </>
    )
}
export default RoundTrip;
