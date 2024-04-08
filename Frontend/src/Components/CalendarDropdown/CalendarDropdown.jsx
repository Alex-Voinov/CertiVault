import React, { useState } from 'react';
import styles from './CalendarDropdown.module.css';
import { getCurrentDate, monthNamesByNumber } from '../../utilities/datetime.js'

const monthPerRow = 4;
const monthPerColumn = 3;

const addZerro = (date) => (date / 10 < 1 ? '0' : '') + date;

const CalendarDropdown = ({ className }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isActive, setActive] = useState(false);
    const [acitveMode, setActiveMode] = useState(0);
    const months = []
    const textContent = selectedDate && `${addZerro(selectedDate[0])}.${addZerro(selectedDate[1] + 1)}.${selectedDate[2]}`;
    for (let rowNumber = 0; rowNumber < monthPerRow; rowNumber++) {
        const rowMonths = [];
        for (let columnNumber = 0; columnNumber < monthPerColumn; columnNumber++) {
            const monthNumber = rowNumber * monthPerColumn + columnNumber;
            const monthTablet = <div
                onClick={() => {
                    setSelectedDate([selectedDate[0], monthNumber, selectedDate[2]])
                    setActiveMode(0);
                }}
                style={{
                    width: 100 / monthPerColumn + '%'
                }}
            >
                {monthNamesByNumber(monthNumber)}
            </div>
            rowMonths.push(monthTablet);
        }
        const rowMonthsBlock = <div
            className={styles.rowMonths}
            style={{
                height: 100 / monthPerRow + '%'
            }}
        >
            {rowMonths}
        </div>
        months.push(rowMonthsBlock);
    }
    return (
        <>
            {isActive && <div className={styles.outside} onClick={() => setActive(false)} />}
            <div
                onClick={() => {
                    setActive(true);
                    if (!selectedDate) setSelectedDate(getCurrentDate());
                }}
                className={`${styles.skin} ${className}`}
            >
                {textContent}
                {isActive && <div className={styles.calendarWrapper}>
                    {(acitveMode === 1) && <div className={styles.selectMonth}>
                        {months}
                    </div>}
                    {(acitveMode !== 1) && <div className={styles.month} onClick={() => setActiveMode(1)}>
                        <h1>{monthNamesByNumber(selectedDate[1])}</h1>
                    </div>}
                    {!acitveMode && <div className={styles.calendarBlock}></div>}
                    {(acitveMode !== 2) && < div className={styles.year} onClick={() => setActiveMode(2)}>
                        <h1>{selectedDate[2]}</h1>
                    </div>}
                    {(acitveMode === 2) && <div className={styles.selectYear}></div>}
                </div>}
            </div >
        </>

    );
};

export default CalendarDropdown;
