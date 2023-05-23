import React, { useState, useEffect, useRef } from "react";
import "./timepicker.css";
import './car.scss';
import { useHistory } from 'react-router-dom';
import CustomButton from "../../component/button";
import { useDispatch, useSelector, useStore } from "react-redux";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import LocalSearch from "../../component/autocomplete/localsearch";
import CustomDatePickers from "../../component/datepicker/singledatepicker"
import { format } from 'date-fns';
import TimePicker from "rc-time-picker";
import moment from "moment";
import { loadCarList } from '../../store/actions/car';
import switchicon from '../../asset/images/hotel/transfer.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AutoSuggest from "react-autosuggest";

const AirportTransfer = () => {



    const [city, setCity] = useState([])

    const [errormsg, setErrormsg] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (pickup) => {
        if (fromaddress == '') {
            setErrormsg('Please Enter the Valid Location !');
        }
        else if (toaddress == '') {
            setErrormsg('Please Enter the Valid Location !');
        }
        else {
            setErrormsg('')
            const carlist = {
                "EndUserIp": "107.180.105.183",
                "ClientId": "180109",
                "UserName": "SKdigPa8",
                "Password": "A$JSkEf4#4",
                "FromCity": fromaddress_city_Id,
                "ToCity": toaddress_city_Id,
                "PickUpDate": moment(pickup).format("DD/MM/YYYY"),
                "DropDate": moment(pickup).format("DD/MM/YYYY"),
                "Hours": "8",
                "TripType": "2"
            }
            dispatch(loadCarList(carlist));
            let localstores = [];
            localstores.push({ "from": from });
            localstores.push({ "to": to });
            localstores.push({ "pickup": pickup });
            localstores.push({ "pickuptime": time });
            localstores.push({ "triptype": "2" });
            localstores.push({ "drop": pickup });
            localstores.push({ "droptime": time });
            localStorage.setItem('carsearch', JSON.stringify(localstores));
            localStorage.setItem('triptypename', JSON.stringify("airporttransfer"));
            history.push("/car/carlist-airporttransfer" /* ,{state: {fromaddress,toaddress,selectedDay,time}} */)
        }
    }


    const carcitylist = useSelector(state => state.carcitylist);


    /*  # Source */

    const [fromaddress, setFromaddress] = React.useState("");
    const [fromaddress_city_Id, setFromaddress_city_Id] = React.useState("")

    /* # Destination */
    const [toaddress, setToaddress] = React.useState("");
    const [toaddress_city_Id, setToaddress_city_Id] = React.useState("")

    /*  #swapping */

    const switchText = (from, to) => {
        console.log("swapping",to.suggestion.airport_city_name);
        handleSelection(to)
        handleSelectiondestination(from)
        setValueDes(from.suggestion.caoncitlst_city_name)
        setValueSrc(to.suggestion.caoncitlst_city_name);

    }



    /* # DatePicker */

    const [selectedDay, setSelectedDay] = useState(Date);
    const [date, setDate] = useState('')

    const handleDayClick = (day) => {
        setDate(format(day, 'PP'))
        setSelectedDay(day)
    };
    useEffect(() => {
        // set current date on component load
        setDate(format(new Date(), 'PP'))
    }, [])


    /*  # Timepicker */
    const [time, setTime] = useState(moment());


    const handleSelect = (value) => {
        setTime(value);
    }

    const refOne = useRef(null);
    const [open, setOpen] = useState()
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

    useEffect(() => {
        setCity(carcitylist.data)
        console.log("iam star...", carcitylist)
    }, [carcitylist])



    const [valueSrc, setValueSrc] = useState("");
    const [valueDes, setValueDes] = useState("");
    // console.log("i am A1",valueSrc);
    // console.log("i am A2",valueDes);

    // console.log("i am A4",city)


    const [suggestions, setSuggestions] = useState([]);
    function getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : city.filter(lang =>
            lang.caoncitlst_city_name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    console.log("i am A3", suggestions);

    const [from,setFrom]=useState("")
    const handleSelection = (suggestionValue) => {
        setFrom(suggestionValue);
        setFromaddress(suggestionValue.suggestion.caoncitlst_city_name)
        setFromaddress_city_Id(suggestionValue.suggestion.caoncitlst_id)
    }
    const [to,setTo]=useState("")
    const handleSelectiondestination = (suggestionValue) => {
        setTo(suggestionValue);
        setToaddress(suggestionValue.suggestion.caoncitlst_city_name)
        setToaddress_city_Id(suggestionValue.suggestion.caoncitlst_id)
    }

    console.log("uk", fromaddress)
    console.log("tk", toaddress)
    console.log("skk", fromaddress_city_Id)
    console.log("ppkk", toaddress_city_Id)


    return (
        <div>
            {(fromaddress === '' || toaddress === '') ? <h6 className="font-weight-bold text-danger mt-2">{errormsg}</h6> : null}

            <div className='d-inline-flex content mt-5 airportcontent mx-auto'>
                <div>
                    <div className='carsearchbox mt-2 carsearchbox1 p-0'>

                        <p className="bg-white px-2">From</p>
                        {/* <LocalSearch
                                value={fromaddress}
                                onChange={(e) => FromAddress(e)}
                                onSelect={(e) => handleSelectSource(e)}
                                searchOptions={options}
                                searchplaceholder="Enter Pickup location"
                                name="From"
                                required="required"
                            >
                            </LocalSearch> */}
                        <div>
                            <AutoSuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={({ value }) => {
                                    setValueSrc(value);
                                    setSuggestions(getSuggestions(valueSrc));
                                }}
                                onSuggestionSelected={(_, suggestionValue) => { handleSelection(suggestionValue) }}

                                getSuggestionValue={suggestion => suggestion.caoncitlst_city_name}
                                renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.caoncitlst_city_name}</span>}
                                inputProps={{
                                    placeholder: "Enter Pickup location",
                                    value: valueSrc,

                                    onChange: (_, { newValue, method }) => {
                                        setValueSrc(newValue);
                                        //    console.log("newValue",method)
                                    }
                                }}
                                highlightFirstSuggestion={true}
                            />
                        </div>
                    </div>
                </div>
                <div className='icon d-flex justify-content-center caricon '>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={() => switchText(from, to)} style={{ fontSize: "20px", color: "green" }} />
                </div>
                <div className='carsearchbox mt-2 carsearchbox1 p-0'>
                    <p className="bg-white px-2">To</p>
                    {/* <LocalSearch
                            value={toaddress}
                            onChange={(e) => ToAddress(e)}
                            onSelect={(e) => handleSelectDestination(e)}
                            searchOptions={options}
                            searchplaceholder="Enter Drop location"
                            name="To"
                            required="required"
                        >
                        </LocalSearch> */}
                    <div>
                        <AutoSuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={({ value }) => {
                                setValueDes(value);
                                setSuggestions(getSuggestions(valueDes));

                            }}
                            onSuggestionSelected={(_, suggestionValue) => { handleSelectiondestination(suggestionValue) }}


                            getSuggestionValue={suggestion => suggestion.caoncitlst_city_name}
                            renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.caoncitlst_city_name}</span>}
                            inputProps={{
                                placeholder: "Enter Drop location",
                                value: valueDes,

                                onChange: (_, { newValue, method }) => {
                                    setValueDes(newValue);
                                    //    console.log("newValue",method)
                                }
                            }}
                            highlightFirstSuggestion={true}
                        />
                    </div>
                </div>
                <div className='row mt-2 '>
                    <div className='col-6 dateselections dateselections1 me-5' id="dateselections1" >
                        <p className="bg-white px-2">Pickup Date</p>
                        <CustomDatePickers
                            maxDate={moment().format("PP")}
                            value={date}
                            Searchstyle="car_searchdate"
                            selected={selectedDay}
                            onDayClick={handleDayClick}
                            required="required"
                            calanderstyle="car_calander"
                        />
                    </div>
                    {/* <div className='col-5 dateselections'>
                        <p>Pickup Time</p>
                        <div classname="rc-time-picker-panel" ref={refOne}>
                            <TimePicker
                                use12Hours
                                value={time}
                                focusOnOpen={true}
                                onChange={handleSelect}
                                showSecond={false}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='carbutton mt-5 me-5' id="carbutton3">
                <CustomButton customstyle='carbtnsearch' onClick={() => { handleSubmit(date) }} value='SEARCH CAR'></CustomButton>
            </div>

        </div >
    )
}
export default AirportTransfer;