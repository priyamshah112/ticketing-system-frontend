
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TicketCalender() {
    const [value, onChange] = useState(new Date());

    return (
        <div className="category__box category__box__ht__min">
            <p className="category__title">calender</p>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
}

export default TicketCalender

