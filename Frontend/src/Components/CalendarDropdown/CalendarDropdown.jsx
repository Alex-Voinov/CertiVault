import React, { useState } from 'react';
import styles from './CalendarDropdown.module.css';
import { getCurrentDate, monthNamesByNumber, weekdaysShort, generateCalendar } from '../../utilities/datetime.js'

const monthPerRow = 4;
const monthPerColumn = 3;

const yearPerRow = 4;
const yearPerColumn = 3;

const addZerro = (date) => (date / 10 < 1 ? '0' : '') + date;
const currentYear = getCurrentDate()[2];

const CalendarDropdown = ({ className, inputState }) => {
    const [selectedDate, setSelectedDate] = inputState;
    const [isActive, setActive] = useState(false);
    const [acitveMode, setActiveMode] = useState(0);
    const [deltaYearTimeline, setDeltaYearTimeline] = useState(0);
    const months = []
    const textContent = selectedDate && `${addZerro(selectedDate[0])}.${addZerro(selectedDate[1] + 1)}.${selectedDate[2]}`;
    for (let rowNumber = 0; rowNumber < monthPerRow; rowNumber++) {
        const rowMonths = [];
        for (let columnNumber = 0; columnNumber < monthPerColumn; columnNumber++) {
            const monthNumber = rowNumber * monthPerColumn + columnNumber;
            const monthTablet = <div
                key={`month-tablet-${rowNumber}-${columnNumber}`}
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
            key={`row-months-${rowNumber}`}
            className={styles.rowMonths}
            style={{
                height: 100 / monthPerRow + '%'
            }}
        >
            {rowMonths}
        </div>
        months.push(rowMonthsBlock);
    }
    const years = [];
    for (let rowNumber = 0; rowNumber < yearPerRow; rowNumber++) {
        const rowYears = [];
        for (let columnNumber = 0; columnNumber < yearPerColumn; columnNumber++) {
            const yearNumber = (rowNumber - 1 + deltaYearTimeline) * monthPerColumn + columnNumber + currentYear;
            const yearTablet = <div
                key={`year-tablet-${rowNumber}-${columnNumber}`}
                onClick={() => {
                    setSelectedDate([selectedDate[0], selectedDate[1], yearNumber])
                    setActiveMode(0);
                }}
                style={{
                    width: 100 / monthPerColumn + '%'
                }}
            >
                {yearNumber}
            </div>
            rowYears.push(yearTablet);
        }
        const rowYearBlock = <div
            key={`row-year-${rowNumber}`}
            className={styles.rowMonths}
            style={{
                height: 100 / monthPerRow + '%'
            }}
        >
            {rowYears}
        </div>
        years.push(rowYearBlock);
    }
    const calendar = selectedDate && generateCalendar(selectedDate[2], selectedDate[1]).map(
        (week, numberWeek) => <div
            className={styles.calendarWeek}
            key={`week №${numberWeek}`}
        >{
                week.map(
                    (day, numberDay) => {
                        const isActiveTablet = !((numberWeek < 2 && day > 14) || (numberWeek > 3 && day < 14))
                        return <div
                            key={`day ${numberWeek}-${numberDay}`}
                            className={
                                isActiveTablet ? styles.activeTablteDay : styles.dissabledTablteDay
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (isActiveTablet) {
                                    setActive(false);
                                    setSelectedDate([day, selectedDate[1], selectedDate[2]]);
                                }
                            }
                            }
                        >
                            {day}
                        </div>
                    }
                )}
        </div>
    )

    return (
        <>
            {isActive && <div className={styles.outside} onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setActive(false)
            }
            } />}
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
                    {!acitveMode && <div className={styles.calendarBlock}>
                        <header>
                            {weekdaysShort.map((dayName, number) => <div key={`day name ${number}`}>{dayName}</div>)}
                        </header>
                        <main>
                            {calendar}
                        </main>
                    </div>}
                    {(acitveMode !== 2) && < div className={styles.year} onClick={() => setActiveMode(2)}>
                        <h1>{selectedDate[2]}</h1>
                    </div>}
                    {(acitveMode === 2) && <div className={styles.selectYear}>
                        <div className={styles.yearMenu}>
                            {years}
                        </div>
                        <div className={styles.yearMenuPointers}>
                            <img
                                onClick={() => { setDeltaYearTimeline(deltaYearTimeline - 1) }}
                                src="/img/svg/qwadroPointerTop.svg"
                                alt="pointer top"
                            />
                            <img
                                onClick={() => { setDeltaYearTimeline(deltaYearTimeline + 1) }}
                                src="/img/svg/qwadroPointerBottom.svg"
                                alt="pointer bottom"
                            />
                        </div>
                    </div>}
                </div>}
            </div >
        </>

    );
};

export default CalendarDropdown;
