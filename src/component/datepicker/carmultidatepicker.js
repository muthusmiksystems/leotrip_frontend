import React, { useState, useEffect, useRef } from 'react';
import { DayPicker, Row, RowProps, DateRange } from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import Button from 'react-bootstrap/Button';
import { Badge, Card } from 'react-bootstrap';
import 'react-day-picker/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function isPastDate(date) {
  return differenceInCalendarDays(date, new Date()) < 0;
}

function isPastCarDate(date) {
  return differenceInCalendarDays(date, new Date()) < 1;
}
function OnlyFutureRow(props) {
  const isPastRow = props.dates.every(isPastDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
}

function OnlyFutureCarRow(props) {
  const isPastRow = props.dates.every(isPastCarDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
}

export default function MultiDatePickers({ onSelect, Searchstyle, required, selected, calanderstyle, checkInDate, modelVie, onClick, checkOutDate,current }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const style2 = {
    fontSize: "16px",
    fontWeight: "700",
    color: "rgb(119, 119, 119)",
    fontFamily: "Quicksand, Avenir, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,Noto Color Emoji",
  }

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


  var startDate = moment(checkInDate).format("DD/MM/YYYY");
  var endDate = moment(checkOutDate).format("DD/MM/YYYY");

  var checkin = moment(startDate, "DD.MM.YYYY");
  var checkout = moment(endDate, "DD.MM.YYYY");

  var nights = checkout.diff(checkin, 'days');


  return (
    <div className='headerSearchItem'>
      <div onClick={handleClick} className={Searchstyle}>
        <div className='row d-inline-flex ms-2'>
          <div className='col car-daterange me-3'>
            <p className='mb-0' style={style2}><FontAwesomeIcon icon={faCalendarDays} className="ms-2 me-1 text-secondary "/>PickUp Date</p>
            <div className=' p-3 ms-1'>{`${checkInDate.toString()}`}</div>
          </div>

          <div className='col car-daterange me-2'>
            <p className='mb-0' style={style2}><FontAwesomeIcon icon={faCalendarDays} className="ms-3 me-1 text-secondary "/>Return Date</p>
            <div className=' p-3 ms-1'>{`${checkOutDate.toString()}`}</div>
          </div>
        </div>
      </div>
      {
        open && (
          <Card className={calanderstyle} style={{ position: 'absolute',zIndex:'6'}} ref={refOne}>
            <Card.Body >
              <DayPicker
                fromDate={new Date()}
                mode="range"
                required={required}
                selected={selected}
                onSelect={onSelect}
                // min={moment()}
                numberOfMonths={2}
                pagedNavigation
                components={{ Row: current?OnlyFutureCarRow :OnlyFutureRow }}
               disabled={current?isPastCarDate:isPastDate}
              />
            </Card.Body>
            <Card.Footer className="bg-white text-end">
              <h6 className='text-danger text-end'>Pick PickUpDate and Return date<Button variant="outline-primary mx-3" onClick={() => setOpen(false)}>Done</Button></h6>
            </Card.Footer>
          </Card>
        )
      }
    </div >
  );
}