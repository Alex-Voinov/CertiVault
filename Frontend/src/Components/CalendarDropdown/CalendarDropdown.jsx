import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CalendarDropdown.module.css';

const CalendarDropdown = ({ className }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isActive, setActive] = useState(false);
    return (
        <div
            onClick={() => { setActive(true); }}
            className={`${styles.skin} ${className}`}
        >
            {isActive && <div className={styles.calendarWrapper}>

            </div>}
        </div>
    );
};

export default CalendarDropdown;
