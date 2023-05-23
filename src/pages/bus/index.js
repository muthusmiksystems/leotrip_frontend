import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './bus.scss';
import { useHistory } from 'react-router-dom';
import CustomNavbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/footer';
import CustomButton from "../../component/button";
import Homepage from '../home/home';
// import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import LocalSearch from "../../component/autocomplete/localsearch";
import CustomDatePickers from "../../component/datepicker/singledatepicker"
import { format } from 'date-fns';
import { loadBusList } from '../../store/actions/bus';
import moment from 'moment';
import AutoSuggest from "react-autosuggest";
import ErrorPage from '../404page';
import { loadBusCityList } from '../../store/actions/buscitylist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
const Bus = () => {
    const [city, setCity] = useState()
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const BusCityList = {
            "ClientId": "180109",
            "UserName": "SKdigPa8",
            "Password": "A$JSkEf4#4"
        }
        dispatch(loadBusCityList(BusCityList));
    }, []);
    /* # RoutingCall */
    /* # ERROR Handling */
    const [errormsg, setErrormsg] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (depart_date) => {
        if (source_city == '') {
            setErrormsg('Please Enter the Valid Location !');
        }
        else if (destination_city == '') {
            setErrormsg('Please Enter the Valid Location !');
        }
        else if(source_city.localeCompare(destination_city) === 0 ){
            setErrormsg('Destination is same as source');
        }
        else {
            setErrormsg('')
            const buslist = {
                "ClientId": "180148",
                "UserName": "SKdigPa8",
                "Password": "A$JSkEf4#4",
                "source_city": source_city,
                "source_code": source_city_Id,
                "destination_city": destination_city,
                "destination_code": destination_city_Id,
                "depart_date": moment(depart_date).format("YYYY-MM-DD"),
            }
            dispatch(loadBusList(buslist));
            let localstores = [];
            localstores.push({ "from": from });
            localstores.push({ "to": to });
            localStorage.setItem('bussearch', JSON.stringify(localstores));
            history.push("/bus/buslist", { state: { source_city, destination_city, depart_date } })
        }
    }
    const buscitylist = useSelector(state => state.BusCityList);
    /*  # Source */
    const [source_city, setSource_city] = useState("");
    const [source_city_Id, setSource_city_Id] = useState("");
    /* # Destination */
    const [destination_city, setDestination_city] = React.useState("");
    const [destination_city_Id, setDestination_city_Id] = useState("");
    /*  #swapping */
    const switchText = (from, to) => {
        handleSelection(to)
        handleSelectiondestination(from)
        setValue(to.suggestion.CityName)
        setValueDes(from.suggestion.CityName);

        // setSource_city(to)
        // setDestination_city(from)
    }
    /* # DatePicker */
    const [depart_date, setDepart_date] = useState(Date);
    const [date, setDate] = useState('')
    const handleDayClick = (day) => {
        setDate(format(day, 'PP'))
        setDepart_date(day)
    };
    useEffect(() => {
        setDate(format(new Date(), 'PP'))
    }, [])


    useEffect(() => {
        setCity(buscitylist.data?.CityList)
    }, [buscitylist])


    const [value, setValue] = useState("");
    const [valueDes, setValueDes] = useState("");
    // console.log("i am A1",value);
    // console.log("i am A2",valueDes);
    // console.log("i am A4",city)
    const [suggestions, setSuggestions] = useState([]);
    function getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : city.filter(lang =>
            lang.CityName.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    //  console.log("i am A3",suggestions);

    const [from, setFrom] = useState("")

    const handleSelection = (suggestionValue) => {
        console.log(".......", suggestionValue)

        setFrom(suggestionValue);
        setSource_city(suggestionValue.suggestion.CityName)
        setSource_city_Id(suggestionValue.suggestion.CityId)
    }

    const [to, setTo] = useState("")


    const handleSelectiondestination = (suggestionValue) => {
        setTo(suggestionValue);
        setDestination_city(suggestionValue.suggestion.CityName)
        setDestination_city_Id(suggestionValue.suggestion.CityId)
    }
    return (
        <>
             {/* {(buscitylist.data) ? ( */}
                <>
                    <div className='bussearch'>
                        <CustomNavbar />
                        <div className="headImage">
                            <div className="container">
                                <h2 className="text-white text-center">Bus Ticket Booking</h2>
                                <div className='bussearchcontainer mt-0 mx-auto'>

                                        <h6 className="text-success fw-bold h5">Book Your Tickets With Best Deals</h6>
                                        {(source_city === '' || destination_city === '' || source_city.localeCompare(destination_city) === 0) ? <h6 className="font-weight-bold text-danger">{errormsg}</h6> : null}
                                        <div className='d-inline-flex content mt-5 my-4 bussearch_content'>
                                            <div className='bussearchbox  mt-2 '>
                                                <p className="bg-white px-2">FROM</p>
                                                <div>
                                                    <AutoSuggest
                                                        suggestions={suggestions}
                                                        onSuggestionsFetchRequested={({ value }) => {
                                                            setValue(value);
                                                            setSuggestions(getSuggestions(value));
                                                        }}
                                                        onSuggestionSelected={(_, suggestionValue) => { handleSelection(suggestionValue) }}
                                                        getSuggestionValue={suggestion => suggestion.CityName}
                                                        renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.CityName}</span>}
                                                        inputProps={{
                                                            placeholder: "Enter Source",
                                                            value: value,
                                                            onChange: (_, { newValue, method }) => {
                                                                setValue(newValue);
                                                                //    console.log("newValue",method)
                                                            }
                                                        }}
                                                        highlightFirstSuggestion={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className='icon d-flex justify-content-center my-4 switchicon'>
                                                <FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={() => switchText(from,to)} className="Switcharrow" />
                                            </div>
                                            <div className='bussearchbox mt-2'>
                                                <p className="bg-white px-2">TO</p>

                                   
                                            <AutoSuggest
                                                suggestions={suggestions}
                                                onSuggestionsFetchRequested={({ value }) => {
                                                    setValueDes(value);
                                                    setSuggestions(getSuggestions(valueDes));
                                                }}
                                                onSuggestionSelected={(_, suggestionValue) => { handleSelectiondestination(suggestionValue) }}
                                                getSuggestionValue={suggestion => suggestion.CityName}
                                                renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.CityName}</span>}
                                                inputProps={{
                                                    placeholder: "Enter Destination",
                                                    value: valueDes,
                                                    onChange: (_, { newValue, method }) => {
                                                        setValueDes(newValue);
                                                        //    console.log("newValue",method)
                                                    }
                                                }}
                                                highlightFirstSuggestion={true}
                                            />
                                        </div>

                                        <div className='buspickup mt-2'>
                                            <div className=' buspickupdate'>
                                                <p className="px-2 bg-white">Pickup Date</p>
                                                <CustomDatePickers
                                                    value={date}
                                                    Searchstyle="Bus_searchdate"
                                                    selected={depart_date}
                                                    onDayClick={handleDayClick}
                                                    required="required"
                                                    calanderstyle="bus_calander"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='busbutton'>
                                        <CustomButton customstyle='busbtnsearch btn btn-primary ' onClick={() => handleSubmit(date)} value="SEARCH BUS"></CustomButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Homepage/>
                    <Footer />
                </>
            {/* ) : <ErrorPage />} */}
        </>
    );
};
export default Bus;
