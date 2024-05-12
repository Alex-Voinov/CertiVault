import { CSSProperties, FC, useEffect, useRef, useState, Dispatch, SetStateAction, Fragment, useContext } from 'react'
import styles from './Authorization.module.css'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom';
import UserService from '../../Servies/UserServise';
import checkPassword from '../../Utilities/password';
import { GlobalData } from '../..';


const modificateHeaderStyle: CSSProperties = {
    backgroundColor: 'transparent',
}

const inputsData = [
    {
        title: 'Фамилия',
        placeholder: 'Иванов',
        type: 'text'
    },
    {
        title: 'Имя',
        placeholder: 'Иван',
        type: 'text'
    },
    {
        title: 'Почта',
        placeholder: 'example@mail.ru',
        type: 'mail'
    },
    {
        title: 'Логин',
        placeholder: 'IvanovIvan',
        type: 'text'
    },
    {
        title: 'Пароль',
        placeholder: 'Qwerty123',
        type: 'password'
    },
    {
        title: 'Повтор пароля',
        placeholder: 'Qwerty123',
        type: 'password'
    },
]

enum InputRow {
    surName,
    name,
    mail,
    login,
    password,
    repeatPassword
}

const Authorization: FC = () => {
    const { store } = useContext(GlobalData);
    const navigate = useNavigate();
    const usernamesUsed = useRef<string[]>([]);
    const inputsSet = Array(inputsData.length).fill('').map(useState) as [string, Dispatch<SetStateAction<string>>][];
    useEffect(() => {
        UserService.getAllLogin().then(
            result => {
                usernamesUsed.current = result.data;
            }
        ).catch(
            er => {
                console.log(er)
            }
        )
    }, []);
    const isUniqeLogin = inputsSet[InputRow.login][0] && !usernamesUsed.current.includes(inputsSet[InputRow.login][0])
    const fillingMandatoryField = inputsSet[InputRow.name][0].length >= 2 && inputsSet[InputRow.name][0].length <= 20 && inputsSet[InputRow.surName][0].length >= 2 && inputsSet[InputRow.surName][0].length <= 20 && inputsSet[InputRow.login][0].length >= 2 && inputsSet[InputRow.login][0].length <= 20;
    const statusEtnteredPassword = checkPassword(inputsSet[InputRow.password][0]);
    const equlEnteredPass = inputsSet[InputRow.password][0] === inputsSet[InputRow.repeatPassword][0];
    const correctField = !statusEtnteredPassword && equlEnteredPass && fillingMandatoryField && isUniqeLogin;
    return (
        <div className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={modificateHeaderStyle} />
            <div className={styles.contentBlock}>
                <form>
                    <div className={styles.closeWrapper}>
                        <img src="/img/svg/formClose.svg" alt="close" onClick={() => navigate(-1)} />
                    </div>
                    <h1>Регистрация пользователя</h1>
                    {inputsData.map((inputData, indexRow) => {
                        const [text, setText] = inputsSet[indexRow];
                        return <Fragment key={`input-row-${indexRow}`}>
                            <h1>{inputData.title}</h1>
                            <input
                                type={inputData.type}
                                placeholder={inputData.placeholder}
                                value={text}
                                onChange={(e) => {
                                    if (
                                        !(e.target.value && [InputRow.name, InputRow.surName].includes(indexRow) && /\d/.test(e.target.value))
                                    ) setText(e.target.value);
                                }}
                            />
                        </Fragment>
                    })}
                    <button
                        disabled={!correctField}
                        className={correctField ? styles.active : styles.blocked}
                        onClick={(e) => {
                            e.preventDefault();
                            store.registration(inputsSet.map(state => state[0]));
                        }}
                    >
                        Регистрация
                    </button>
                </form>
                <img src="/img/svg/authorization_back_logo.svg" alt="Authorization" />
            </div>
        </div>
    )
}

export default Authorization