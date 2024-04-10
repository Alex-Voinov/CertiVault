import { useState } from 'react'
import styles from './DropDown.module.css'

const generatePossibleList = (enteredText, setPossibleValue, type) => {
    if (type === 'countryCode') {
        const findCountry = setPossibleValue.filter(country =>
            country.name.toLowerCase().includes(enteredText) || country.code.toLowerCase().includes(enteredText)
        );
        return findCountry.map(country => `${country.name} (${country.code})`)
    }
    //type default
    const setPossibleValueLowerCase = setPossibleValue.map(element => element.toLowerCase())
    return setPossibleValue.filter(possibleValue => setPossibleValueLowerCase.includes(possibleValue));
}



const DropDown = ({ reciveData, inputState, className = '' }) => {
    const { type, data } = reciveData;
    const [inputValue, setInputValue] = inputState;
    const [possibleList, setPossibleList] = useState([]);
    return (
        <>
            {possibleList.length > 0 && <div
                className={styles.outside}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setPossibleList([])
                }
                }
            />}
            <div className={`${styles.wrapper} ${className}`}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={
                        (e) => {
                            setInputValue(e.target.value);
                            setPossibleList(generatePossibleList(e.target.value.toLowerCase(), data, type))
                        }}
                    onClick={
                        (e) => {
                            setPossibleList(generatePossibleList(e.target.value.toLowerCase(), data, type))
                        }}
                />
                {possibleList.length > 0 && <div
                    className={styles.dropDonw}
                    style={{
                        height: `calc(${possibleList.length * 5}vh + min(0.15625vw, 0.27778vh))`
                    }}
                >
                    {possibleList.map(possibleOption => <div
                        key={possibleOption}
                        onClick={() => {
                            setPossibleList([]);
                            setInputValue(possibleOption);
                        }}
                    >
                        {possibleOption}
                    </div>)}
                </div>}
            </div>
        </>
    )
}

export default DropDown;
