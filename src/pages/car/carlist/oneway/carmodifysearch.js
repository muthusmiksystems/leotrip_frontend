import React, { useState, useEffect, useRef } from "react";
import "../../timepicker.css";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from 'react-bootstrap';
import CustomDatePickers from "../../../../component/datepicker/singledatepicker"
import { format } from 'date-fns';
import TimePicker from "rc-time-picker";
import { loadCarList } from '../../../../store/actions/car';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AutoSuggest from "react-autosuggest";
import { useLocation } from "react-router-dom";


const CarModifySearch = () => {

    
    const location = useLocation()
    console.log(location)
    // const [source, setSource] = React.useState(location.state.fromaddress)
    // const [destination, setDestination] = React.useState(location.state.toaddress)
    // const [datetime, setDatetime] = React.useState(location.state.selectedDay)

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
                "Hours": "0",
                "TripType": "0"
            }
            dispatch(loadCarList(carlist));
            history.push("/car/carlistoneway" /* ,{state: {fromaddress,toaddress,selectedDay,time}} */)
        }
    }


    const carcitylist = useSelector(state => state.carcitylist);

    // const store = useStore()
    // console.log(store.getState(), "hello")



    // useEffect(() => {
    //     console.log("khhhggn", carcitylist)
    // }, [carcitylist])

    console.log("i am current", carcitylist)

    /*  # Source */

    const [fromaddress, setFromaddress] = React.useState("");
    const [fromaddress_city_Id, setFromaddress_city_Id] = React.useState("")

    /* # Destination */
    const [toaddress, setToaddress] = React.useState("");
    const [toaddress_city_Id, setToaddress_city_Id] = React.useState("")



    /*  #swapping */

    const switchText = (from, to) => {
        console.log("swapping", to.suggestion.caoncitlst_city_name);
        handleSelection(to)
        handleSelectiondestination(from)
        setValueDes(from.suggestion.caoncitlst_city_name)
        SetValueSrc(to.suggestion.caoncitlst_city_name);
        // setFromaddress(to)
        // setToaddress(from)

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
    const [from, setFrom] = useState("")
    const handleSelection = (suggestionValue) => {
        setFrom(suggestionValue);
        setFromaddress(suggestionValue.suggestion.caoncitlst_city_name)
        setFromaddress_city_Id(suggestionValue.suggestion.caoncitlst_id)
    }
    const [to, setTo] = useState("")
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
        <div className='modifyhotelsearch_header'>
        <div className='container modifyhotelsearch'>  
            <div className='mt-5 my-4 mx-auto'>
                <div>
                    <div className='carsearchbox border-bottom border-2 mt-2'>

                        <p>From</p>
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
                <div className='icon d-flex justify-content-center my-4'>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={() => switchText(from, to)} style={{ fontSize: "20px", color: "green" }} />
                </div>
                <div className='carsearchbox border-bottom border-2 mt-2'>
                    <p>To</p>
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
                <div className='row mt-2'>
                    <div className='col-6 dateselections'>
                        <p>Pickup Date</p>
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
                    <div className='col-5 dateselections'>
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
                    </div>
                </div>
                <div className='carbutton'>
                    <Button onClick={() => { handleSubmit(date) }}>Update Modify</Button>
                </div>
            </div>
        </div>
        </div >
    )


};
export default CarModifySearch;