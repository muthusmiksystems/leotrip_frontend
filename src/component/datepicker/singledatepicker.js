import React, { useState, useEffect, useRef } from 'react';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import '../../pages/car/car.scss';


export default function CustomDatePickers({ onDayClick, Searchstyle, selected, calanderstyle, value, previous }) {

  const [open, setOpen] = useState(false);

  const handleClick = () => {

    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  function isPastDate(date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function isPrevious(date) {
    return differenceInCalendarDays(date, previous) < 1;
  }
  

  function OnlyFutureRow(props) {
      const isPastRow = props.dates.every(isPastDate);
      if (isPastRow) return <></>;
      return <Row {...props} />;
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



  return (

    <div className='headerSearchItem'>
      <div onClick={handleClick} className={Searchstyle}>
        {`${value.toString()}`}
      </div>
      {open && (
        <Card className={calanderstyle} style={{ position: 'absolute', zIndex: '1'}} id='calendar' ref={refOne}>
          <Card.Body>
            <DayPicker 
              fromDate={new Date()}
              mode="single"
              required
              selected={selected}
              onDayClick={onDayClick}
              numberOfMonths={1}
              pagedNavigation
              components={{ Row: OnlyFutureRow }}
              disabled={(previous) ? isPrevious : isPastDate}
            />
          </Card.Body>
          <Card.Footer className="bg-white text-end">
            <Button variant="outline-primary mx-3" onClick={() => setOpen(false)}>Done</Button>
          </Card.Footer>
        </Card>
      )}
    </div>

  );
}