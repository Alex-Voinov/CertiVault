import { useState } from 'react'
import styles from './Generator.module.css'
import { postDataSend } from '../../utilities/serverRequest'

const Generator = () => {

    // Создаем состояние для хранения значений всех инпутов
    const [inputValues, setInputValues] = useState({
        county: '',
        userId: '',
        receiptDate: '',
        perfomanceDate: '',
        perfomanceDate: '',
        perfomanceLocation: '',
        issueData: '',
        endPerfomanceDate: '',
        denomination: '',
        LibMail: '',
        libPhone: '',
        libFax: '',
        libPostalCode: '',
        libCity: '',
        libStreet: '',
        libStreetNumber: '',
        libState: '',
        libCounty: '',
        сustomerName: '',
        сustomerMail: '',
        сustomerTel: '',
        сustomerFax: '',
        сustomerPoastalCode: '',
        сustomerCity: '',
        сustomerStreet: '',
        сustomerStreetNumber: '',
        сustomerState: '',
        сustomerCounty: '',
    });

    // Обработчик изменения значения инпута
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    // Обработчик отправки формы
    const handleSubmit = (event) => {
        event.preventDefault();
        postDataSend(event, 'repository-generate' ,inputValues);
    };

    return (
        <section className={styles.skin}>
            <form onSubmit={handleSubmit}>
                <h1>Основная информация</h1>
                <div className={styles.row}>
                    <h1>Код страны</h1>
                    <input type="text" name='county' value={inputValues.county} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Уникальный идентификатор*</h1>
                    <input type="text" name='userId' value={inputValues.userId} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Дата создания</h1>
                    <input type="text" name='receiptDate' value={inputValues.receiptDate} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Дата Исполнения*</h1>
                    <input type="text" name='perfomanceDate' value={inputValues.perfomanceDate} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Это временной диапозон*</h1>
                    <input type="text" name='county' value={inputValues.county} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Конечная дата*</h1>
                    <input type="text" name='endPerfomanceDate' value={inputValues.endPerfomanceDate} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Perfomance Location*</h1>
                    <input type="text" name='perfomanceLocation' value={inputValues.perfomanceLocation} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Issue Date*</h1>
                    <input type="text" name='issueData' value={inputValues.issueData} onChange={handleInputChange} />
                </div>

                <h1>Калибровочная лаборатория</h1>
                <div className={styles.row}>
                    <h1>Названиие</h1>
                    <input type="text" name='denomination' value={inputValues.denomination} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>E-mail</h1>
                    <input type="text" name='LibMail' value={inputValues.LibMail} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Телефон</h1>
                    <input type="text" name='libPhone' value={inputValues.libPhone} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Fax</h1>
                    <input type="text" name='libFax' value={inputValues.libFax} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Postal code</h1>
                    <input type="text" name='libPostalCode' value={inputValues.libPostalCode} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Город</h1>
                    <input type="text" name='libCity' value={inputValues.libCity} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>улица</h1>
                    <input type="text" name='libStreet' value={inputValues.libStreet} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>номер улицы</h1>
                    <input type="text" name='libStreetNumber' value={inputValues.libStreetNumber} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>штат</h1>
                    <input type="text" name='libState' value={inputValues.libState} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>код страны</h1>
                    <input type="text" name='libCounty' value={inputValues.libCounty} onChange={handleInputChange} />
                </div>
                <div>
                    чекбокс
                </div>

                <h1>Покупатель</h1>
                <div className={styles.row}>
                    <h1>Имя</h1>
                    <input type="text" name='сustomerName' value={inputValues.сustomerName} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>E-mail</h1>
                    <input type="text" name='сustomerMail' value={inputValues.сustomerMail} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Телефон</h1>
                    <input type="text" name='сustomerTel' value={inputValues.сustomerTel} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Fax</h1>
                    <input type="text" name='сustomerFax' value={inputValues.сustomerFax} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Postal code</h1>
                    <input type="text" name='сustomerPoastalCode' value={inputValues.сustomerPoastalCode} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>Город</h1>
                    <input type="text" name='сustomerCity' value={inputValues.сustomerCity} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>улица</h1>
                    <input type="text" name='сustomerStreet' value={inputValues.сustomerStreet} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>номер улицы</h1>
                    <input type="text" name='сustomerStreetNumber' value={inputValues.сustomerStreetNumber} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>штат</h1>
                    <input type="text" name='сustomerState' value={inputValues.сustomerState} onChange={handleInputChange} />
                </div>
                <div className={styles.row}>
                    <h1>код страны</h1>
                    <input type="text" name='сustomerCounty' value={inputValues.сustomerCounty} onChange={handleInputChange} />
                </div>
                <div>
                    чекбокс
                </div>
                <button type='submit'>ОК</button>
            </form>
        </section>
    )
}

export default Generator