
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './style.css';
import moment from "moment";
import 'moment-timezone';
function TicketCalender() {
    const [value, onChange] = useState(new Date());
    const formatShortWeekday = (locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
    var a = moment.tz(value, "America/Toronto");
    var dateValue = new Date(a.format('YYYY-MM-DD'))
    console.log(dateValue)
    return (
        <div className="category__box category__box__ht__min calender-width">
            <p className="category__title calender">Calendar</p>
            {/* <Calendar onChange={onChange} value={value} /> */}
            
        {console.log(a.format(),(new Date(dateValue)))}
            <Calendar onChange={onChange}
                next2Label={null}
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                showNeighboringMonth={false}
                activeStartDate={new Date()}
                showNavigation={true}
                defaultValue={new Date()}
                value={dateValue}
                calendarType={"US"}
                formatShortWeekday={formatShortWeekday}
            />
        </div>
    );
}

export default TicketCalender

