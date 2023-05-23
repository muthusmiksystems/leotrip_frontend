import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import MultiDatePickers from '../../component/datepicker/multidatepicker';
import './hotel.scss';
import CustomNavbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/footer';
import CustomButton from '../../component/button';
import Homepage from '../home/home';
import moment from 'moment';
import { addDays, format } from 'date-fns';
import { loadHotelList } from "../../store/actions/hotelsearch"
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { loadHotelCityList } from "../../store/actions/hotelcitylist";
import ErrorPage from '../404page';
import AutoSuggest from "react-autosuggest";


const Hotels = () => {

    const [citylocation, setCityLocation] = useState()

    const today = new Date(moment());

    const defaultSelected = {
        from: today,
        to: addDays(today, 1)
    };
    /*  # Source */
    const [hotellocation, setHotellocation] = useState("");

    // date state
    const [selectedRange, setSelectedRange] = useState(defaultSelected);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const history = useHistory();
    const refOne = useRef(null);
    const dispatch = useDispatch();
    const [errormsg, setErrormsg] = useState('');
    const [submitData, SetSubmitData] = useState(null)
    const [valueDes, setValueDes] = useState("");
    const [suggestions, setSuggestions] = useState([]);


    const hotelcitylist = useSelector(state => state.HotelCityList);

    useEffect(() => {
        setCityLocation(hotelcitylist.data?.result)
    }, [hotelcitylist])



    /* # RoutingCall */

    // console.log("i am A0", citylocation)
    const handleRangeSelect = (range) => {

        setSelectedRange(range);
        if (range?.from) {
            setCheckInDate(format(range.from, 'MMM dd, yyyy'));
        }
        if (range?.to) {
            setCheckOutDate(format(range.to, 'MMM dd, yyyy'));
        }
    };

    function getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        // console.log("selected values ...........................>",inputValue);
        return inputLength === 0 ? [] : citylocation.filter(lang =>
            lang.Destination.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    const handleSelection = (suggestionValue) => {
        console.log(suggestionValue, "suggestion value")
        setHotellocation(suggestionValue)
    }

    const [night, setnight] = useState();

    const handleSubmit = (checkInDate, checkOutDate) => {

        var startDate = moment(checkInDate).format("DD/MM/YYYY");
        var endDate = moment(checkOutDate).format("DD/MM/YYYY");

        var checkin = moment(startDate, "DD.MM.YYYY");
        var checkout = moment(endDate, "DD.MM.YYYY");

        var nights = checkout.diff(checkin, 'days');
        if (nights !== 0) {
            setnight(nights)
        }

        if (hotellocation === "") {
            setErrormsg('Please Enter the  Location !');
        }
        else if(rooms === 0 ){
            setErrormsg('Please select rooms and guest!');
        }
        else {
            /*  #hotel Search payload */
            SetSubmitData({
                "BookingMode": "1",
                "CheckInDate": moment(checkInDate).format("DD/MM/YYYY"),
                "NoOfNights": nights,
                "CountryCode": hotellocation.suggestion.countrycode,
                "CityId": hotellocation.suggestion.cityid,
                "ResultCount": null,
                "PreferredCurrency": "INR",
                "GuestNationality": "IN",
                "NoOfRooms": rooms,
                "RoomGuests": roomGuest,
                "PreferredHotel": "",
                "MaxRating": "5",
                "MinRating": "0",
                "ReviewScore": null,
                "IsNearBySearchAllowed": false
            })

            let localstores = [];
            localstores.push({ "location": hotellocation.suggestion?.Destination });
            localstores.push({ "checkIn": moment(checkInDate).format("MMM DD YYYY") });
            localstores.push({ "rooms": rooms });
            localstores.push({ "Checkout": moment(checkOutDate).format("MMM DD YYYY") });
            localstores.push({ "nights": nights });
            localStorage.setItem('hotellocation', JSON.stringify(localstores));
            localStorage.setItem('destination', JSON.stringify(hotellocation));
            localStorage.setItem('roomGuest', JSON.stringify(roomGuest));
        }
    }

    
    useEffect(() => {
        console.log("iam nerghu", submitData)
        if (submitData != null) {
            dispatch(loadHotelList(submitData));
            history.push("/hotel/hotellist")
        }
    }, [submitData]);


    useEffect(() => {
        window.scrollTo(0, 0);
        setCheckInDate(format(new Date(), 'PP'))
        setCheckOutDate((moment(new Date()).add(1, 'day').format('MMM DD, yyyy')))
    }, []);

    // # new room setting
    const [viewRoom, setViewRoom] = useState(false)
    const [rooms, setRooms] = useState(1)
    const [roomGuest, setRoomGuest] = useState([{
        "NoOfAdults": 1,
        "NoOfChild": 0,
        "ChildAge": []
    }])


    const handleRoom = async(value) => {
        setViewRoom(true)
        setRooms(value)
        console.log("no of value",value)  
        let varr = [];
        for (var i = 0; i < value; i++) {
          varr.push({
            "NoOfAdults": 1,
            "NoOfChild": 0,
            "ChildAge": []
        })
        }
        setRoomGuest(varr)
    }


    const handleAdult = (value, i) => {
        let newFormValues = [...roomGuest];
        newFormValues[i]["NoOfAdults"] = value;
        setRoomGuest(newFormValues);
    }

    
    const handleChild = (value, i) => {
        let newFormValues = [...roomGuest];
        newFormValues[i]["NoOfChild"] = value;
        setRoomGuest(newFormValues);
    }
    const handleAge = (value, i, j) => {
        let newFormValues = [...roomGuest];
        newFormValues[i]["ChildAge"][j] = value;
        setRoomGuest(newFormValues);
    }
    console.log("setChild data:", "child count:", roomGuest)





    useEffect(() => {
        /* #hotelcitylist payload */
        const hotelCityList = {
            "ClientId": "180109",
            "UserName": "SKdigPa8",
            "Password": "A$JSkEf4#4"
        }
        dispatch(loadHotelCityList(hotelCityList));
    }, [dispatch])


    return (
        <>
            {(hotelcitylist.data) ? (
                <>
                    <div className='hotelsearch'>
                        <CustomNavbar />
                        <div className="headerImage">
                            <div className="container ">
                                <h2 className='text-white text-center'>Book Hotels & Homestays</h2>
                                <div className='searchcontainer mt-3 mx-auto'>
                                    <h6 className="fw-bold headingcolor h5">Book Your Rooms With Best Deals</h6>
                                    <div className=' d-inline-flex content content1 hotelcontent mb-3 mt-5'style={{height:"100px"}}>
                                        <div className='hotelsearchbox mt-2'>
                                            <p className='bg-white w-auto'>Destination</p>
                                            <AutoSuggest

                                                suggestions={suggestions}

                                                onSuggestionsFetchRequested={({ value }) => {
                                                    setValueDes(value);
                                                    // console.log("I am selected in ...............................",value)
                                                    setSuggestions(getSuggestions(valueDes));
                                                }}
                                                onSuggestionSelected={(_, suggestionValue) => { handleSelection(suggestionValue) }}
                                                getSuggestionValue={suggestion => suggestion.Destination}

                                                renderSuggestion={suggestion => <span className="suggesstionList">{suggestion.Destination},{suggestion.country}</span>}
                                                inputProps={{
                                                    placeholder: "Enter Source",
                                                    value: valueDes,

                                                    onChange: (_, { newValue, method }) => {
                                                        setValueDes(newValue);
                                                        //    console.log("newValue",newValue)
                                                    }
                                                }}
                                                highlightFirstSuggestion={true}
                                            />

                                        </div>
                                        <div className='mt-2 dateinput'>
                                            <MultiDatePickers
                                                checkInDate={checkInDate}
                                                checkOutDate={checkOutDate}
                                                Searchstyle="hotel_searchdate "
                                                selected={selectedRange}
                                                onSelect={handleRangeSelect}
                                                required="required"
                                                calanderstyle="hotel_calander"
                                            />
                                        </div>
                                        <div className='guestoption mt-2 ms-3 me-5'>
                                            <p>Guests&nbsp;&nbsp;&amp;&nbsp;&nbsp;Rooms</p>
                                            <div className="roomSearchItem" style={{ position: 'absolute' }}>
                                                <select class="bp_room_select valid " style={{ width: "100%" }} name="room" required="required" autocomplete="off" onChange={(e) => handleRoom(parseInt(e.target.value))} onClick={()=>setViewRoom(true)}>
                                                    <option value={0} >Select Room</option>
                                                    <option value={1} selected={true}>1 Room</option>
                                                    <option value={2}>2 Rooms</option>
                                                    <option value={3}>3 Rooms</option>
                                                    <option value={4}>4 Rooms</option>
                                                </select>
                                                {viewRoom && rooms > 0 && (
                                                    <Card className="roomOptions" ref={refOne} >
                                                        <Card.Body >
                                                            {[...Array(rooms)].map((value, index) => (
                                                                <div key={index} className="my-2">
                                                                    <div class="roombox clearfix mt-10">
                                                                        <span class="block fz16 fwb black-color">Room {index + 1}:</span>
                                                                        <div class="roomchildbox clearfix border-top pt-2">
                                                                            <div class="row mt15">
                                                                                <div class="col-sm-6">
                                                                                    <span class="block mb10 black-color fz12">Adult</span>
                                                                                    <select name="adult_1" id="adult_1" class="form-control" onChange={(e) => handleAdult(parseInt(e.target.value), index)}>
                                                                                        <option value="1">1 Adult</option>
                                                                                        <option value="2">2 Adults</option>
                                                                                        <option value="3">3 Adults</option>
                                                                                        <option value="4">4 Adults</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-sm-6">
                                                                                    <span class="block mb10 black-color fz12">Child</span>
                                                                                    <select name="child_1" id="child_1" class="form-control" onChange={(e) => handleChild(parseInt(e.target.value), index)}>
                                                                                        <option value="0">0 Child</option>
                                                                                        <option value="1">1 Child</option>
                                                                                        <option value="2">2 Children</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            {roomGuest[index].NoOfChild>0 && (
                                                                                <div class="row my-3">
                                                                                    {[...Array(roomGuest[index].NoOfChild)].map((value, idx) => (
                                                                                        <div class="col-sm-6 my-2" key={idx}>
                                                                                            <span class="block mb10 black-color fz12">Child {idx + 1} Age</span>
                                                                                            <select name="age_1_1" id="age_1_1" class="block width-100 border radius form-control" onChange={(e) => handleAge(parseInt(e.target.value), index, idx)}>
                                                                                                <option value="1">1 Year</option>
                                                                                                <option value="2">2 Years</option>
                                                                                                <option value="3">3 Years</option>
                                                                                                <option value="4">4 Years</option>
                                                                                                <option value="5">5 Years</option>
                                                                                                <option value="6">6 Years</option>
                                                                                                <option value="7">7 Years</option>
                                                                                                <option value="8">8 Years</option>
                                                                                                <option value="9">9 Years</option>
                                                                                                <option value="10">10 Years</option>
                                                                                                <option value="11">11 Years</option>
                                                                                                <option value="12">12 Years</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Card.Body>
                                                        <Card.Footer className="bg-white text-end">
                                                            <Button variant="outline-primary mx-3" onClick={() => setViewRoom(false)}>Done</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        {(hotellocation === '' || rooms === 0) ? <h6 className="text-danger ">{errormsg}</h6> : null}
                                    </div>
                                    <div className='hotelbutton '>
                                        <CustomButton customstyle="hotelbtnsearch" onClick={() => handleSubmit(checkInDate, checkOutDate)} value='SEARCH HOTELS'></CustomButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Homepage />
                    <Footer />
                </>
            ) : <ErrorPage />}
        </>
    );
};
export default Hotels;
