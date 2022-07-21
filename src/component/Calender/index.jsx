
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './style.css';

function TicketCalender() {
    const [value, onChange] = useState(new Date());
    const formatShortWeekday = (locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]

    return (
        <div className="category__box category__box__ht__min">
            <p className="category__title calender">Calendar</p>
            {/* <Calendar onChange={onChange} value={value} /> */}
            
            <Calendar onChange={onChange}
                next2Label={null}
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                showNeighboringMonth={false}

                showNavigation={true}
                defaultValue={new Date()}
                value={value}
                formatShortWeekday={formatShortWeekday}
            />
        </div>
    );
}

export default TicketCalender

