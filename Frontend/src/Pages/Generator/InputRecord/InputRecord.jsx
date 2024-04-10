import { useRef, useEffect } from 'react'
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
    setCorrectnessInputs,
    isMandatory = true,
    isDropdawn = false,
    isBlocked = false,
    isDate = false,
}) => {
    const infoRef = useRef(null);
    const [inputValue, setInputValue] = inputState;
    useEffect(() => {
        let correctValue = true;
        if (isDropdawn && (isMandatory || inputValue)) {
            const { type, data } = isDropdawn;
            const acceptableValues = data.map(
                el => type === 'default' ? el.toLowerCase() : `${el.name.toLowerCase()} (${el.code.toLowerCase()})`
            )
            correctValue = acceptableValues.includes(inputValue.toLowerCase());
        }
        if (!isMandatory && !inputValue || isBlocked) setCorrectnessInputs(true); //не обязательное поле без значения или заблокировано - коректно
        else if(!isMandatory && inputValue) {//заполненное не обязательное поле 
            if(correctValue)setCorrectnessInputs(true) //с коррекнтым занчением - коректно
            else setCorrectnessInputs(false) //с не коррекнтым занчением - не коректно
        } 
        else if (isMandatory) { // обязательное поле
            if (inputValue && correctValue) { // с коректным значением - ок
                setCorrectnessInputs(true)
            } else setCorrectnessInputs(false) // с некоректным или без значения - не ок
        }
    }, [inputValue])
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
            {isDate && !isBlocked ? <CalendarDropdown
                inputState={inputState}
                className={styles.alternativeInput}
            />
                : isDropdawn && !isBlocked
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