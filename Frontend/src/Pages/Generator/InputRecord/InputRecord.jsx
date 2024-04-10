import { useRef } from 'react'
import styles from './InputRecord.module.css'
import CalendarDropdown from '../../../Components/CalendarDropdown/CalendarDropdown'
import DropDown from '../../../Components/DropDown/DropDown';


const InputRecord = ({
    title,
    skinStyles = {},
    setHint,
    descriptionHint,
    exampleHint,
    inputState,
    isMandatory = true,
    isDropdawn = false,
    isBlocked = false,
    isDate = false,
}) => {
    const infoRef = useRef(null);
    const [inputValue, setInputValue] = inputState;
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
            {isDate ? <CalendarDropdown
                inputState={inputState}
                className={styles.alternativeInput}
            />
                : isDropdawn
                    ? <DropDown
                        reciveData={isDropdawn}
                        inputState={inputState}
                        className={styles.alternativeInput}
                    />
                    : <input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        type={"text"}
                        disabled={isBlocked}
                        className={isBlocked ? styles.blocked : ''}
                    />
            }
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                ref={infoRef}
                className={isBlocked ? styles.blocked : ''}
                onMouseEnter={() => {
                    if (!isBlocked)
                        setHint({
                            title,
                            descriptionHint,
                            example: exampleHint,
                            y: infoRef.current.getBoundingClientRect().top / window.innerHeight - 0.23061581726354455,
                        })
                }}
                onMouseLeave={() => {
                    if (!isBlocked)
                        setHint(null)
                }}
            >
                <circle cx="13" cy="13" r="13" fill="#1D728F" />
                <path d="M13 11.5V19M13 7V7.5" stroke="#E7EDF3" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export default InputRecord