import React from 'react'
import styles from './InputRecord.module.css'
import CalendarDropdown from '../../../Components/CalendarDropdown/CalendarDropdown'


const InputRecord = ({
    title,
    skinStyles = {},
    isMandatory = true,
    isDropdawn = false,
    isBlocked = false,
    isDate = false,
}) => {
    return (
        <div
            className={`${styles.skin} ${isBlocked ? styles.blocked : ''}`}
            style={skinStyles}
        >
            <h1
                className={
                    `${!isMandatory ? styles.notMandatory : ''} 
                    ${isBlocked ? styles.blocked : ''}`
                }
            >
                {`${title}${!isMandatory ? '*' : ''}`}
            </h1>
            {isDate ? <CalendarDropdown className={styles.alternativeInput}/>
                : <input
                    type={"text"}
                    disabled={isBlocked}
                    className={isBlocked ? styles.blocked : ''}
                />
            }
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={isBlocked ? styles.blocked : ''}>
                <circle cx="13" cy="13" r="13" fill="#1D728F" />
                <path d="M13 11.5V19M13 7V7.5" stroke="#E7EDF3" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export default InputRecord