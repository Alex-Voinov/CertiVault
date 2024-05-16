import { CSSProperties, FC, useEffect, useRef, useState, Dispatch, SetStateAction, Fragment, useContext } from 'react'
import styles from './Registration.module.css'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom';
import UserService from '../../Servies/UserServise';
import checkPassword from '../../Utilities/password';
import { GlobalData } from '../..';
import { capitalize } from '../../Utilities/string';
import CryptoJS from 'crypto-js';

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
        type: 'email'
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

enum UniqeData {
    login,
    email
}

const Registration: FC = () => {
    const { store } = useContext(GlobalData);
    const navigate = useNavigate();
    const usernamesUsed = useRef<[string[], string[]]>([[], []]);
    const inputsSet = Array(inputsData.length).fill('').map(useState) as [string, Dispatch<SetStateAction<string>>][];
    const [activateAccaunt, setActivateAccaunt] = useState(false);
    const [editModeEmail, setEditModeEmail] = useState(false);
    const [editEmail, setEditEmail] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        UserService.getUniqeData().then(
            result => {
                usernamesUsed.current = result.data;
            }
        ).catch(
            er => {
                store.setNotification(
                    'Ошибка уникальных полей',
                    er
                );
                console.log(er);
            }
        ).finally(
            () => { setLoading(false) }
        )
    }, []);

    const defineUncorectnessStauts = (text: string, indexRow: number): [string, string] | undefined => {
        if (!text)
            return ['Вы пропустили поле', 'Все поля обязательны для заполнения.'];
        if ([InputRow.name, InputRow.surName, InputRow.login].includes(indexRow) && (text.length < 2 || text.length > 20))
            return ['Неккоректное поле', 'Допустимая длина имени, фамилии и логина от 2 до 20 символов.'];
        if (InputRow.password === indexRow) {
            const statusPass = checkPassword(text);
            if (statusPass) return ['Ненадежный пароль', statusPass];
        }
        if (InputRow.repeatPassword === indexRow && text !== inputsSet[InputRow.password][0])
            return ['Неккоректное поле', 'Повторно введеный пароль не совпадает с изначальным.'];
        if (InputRow.mail === indexRow && usernamesUsed.current[UniqeData.email].includes(CryptoJS.SHA256(text).toString()))
            return ['Не допустимый email', 'Пользователь с таким email уже существует.'];
        if (InputRow.login === indexRow && usernamesUsed.current[UniqeData.login].includes(CryptoJS.SHA256(text).toString()))
            return ['Не допустимый логин', 'Пользователь с таким логином уже существует.'];
    }

    const statusErrorList = inputsSet.map((state, index) => defineUncorectnessStauts(state[0], index)).filter(el => el !== undefined) as ([string, string][] | undefined);

    return (
        <div className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={modificateHeaderStyle} />
            {!activateAccaunt
                ? <div className={styles.contentBlock}>
                    {!isLoading && <form>
                        <div className={styles.closeWrapper}>
                            <img src="/img/svg/formClose.svg" alt="close" onClick={() => {
                                if (window.history.length > 2) navigate(-1);
                                else navigate('/')
                            }} />
                        </div>
                        <h1>Регистрация пользователя</h1>
                        {inputsData.map((inputData, indexRow) => {
                            const [text, setText] = inputsSet[indexRow];
                            return <Fragment key={`input-row-${indexRow}`}>
                                <h1>{inputData.title}</h1>
                                <input
                                    type={inputData.type}
                                    autoComplete="new-password"
                                    placeholder={inputData.placeholder}
                                    value={text}
                                    onChange={(e) => {
                                        if (
                                            !(e.target.value && [InputRow.name, InputRow.surName].includes(indexRow) && !/^[a-zA-Zа-яА-Я\s]+$/.test(e.target.value))
                                        ) setText(capitalize(e.target.value));
                                    }}
                                    onBlur={() => {
                                        const potentionalError = defineUncorectnessStauts(text, indexRow);
                                        if (potentionalError) store.setNotification(potentionalError[0], potentionalError[1])
                                    }
                                    }
                                />
                            </Fragment>
                        })}
                        <button
                            className={!(statusErrorList && statusErrorList.length > 0) ? styles.active : styles.blocked}
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    if (!(statusErrorList && statusErrorList.length > 0)) {
                                        setLoading(true);
                                        store.registration(inputsSet.map(state => state[0])).then(
                                            (correctness) => {
                                                console.log(correctness);
                                                if (correctness) {
                                                    setActivateAccaunt(true);
                                                    setEditEmail(inputsSet[InputRow.mail][0])
                                                }
                                            }
                                        ).finally(
                                            () => setLoading(false)
                                        )
                                    }
                                }
                            }
                            onMouseEnter={() => {
                                if (statusErrorList && statusErrorList.length > 0) store.setNotification(statusErrorList[0][0], statusErrorList[0][1])
                            }}
                        >
                            Регистрация
                        </button>
                    </form>}
                    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M200.009 200.001C236.842 200.001 266.676 170.084 266.676 133.334C266.676 96.5006 236.842 66.6672 200.009 66.6672C163.176 66.6672 133.342 96.5006 133.342 133.334C133.342 170.084 163.176 200.001 200.009 200.001ZM200.009 233.334C155.592 233.334 66.6758 255.584 66.6758 300.001V313.334C66.6758 324.38 75.6301 333.334 86.6758 333.334H313.342C324.388 333.334 333.342 324.38 333.342 313.334V300.001C333.342 255.584 244.426 233.334 200.009 233.334Z" fill="#D9E5F0" />
                        {!isLoading ?
                            <path d="M203.847 169.814C203.847 173.128 201.161 175.814 197.847 175.814H197.204C193.89 175.814 191.204 173.128 191.204 169.814V169.42C191.204 166.106 193.89 163.42 197.204 163.42H197.847C201.161 163.42 203.847 166.106 203.847 169.42V169.814ZM203.847 155.157H191.204V155.128C191.204 148.311 191.204 142.424 194.036 138.301C196.239 135.563 198.981 133.287 202.098 131.608C203.506 130.724 204.834 129.885 205.95 129.013C210.845 125.299 213.046 119.106 211.564 113.214C209.22 107.72 203.254 104.603 197.294 105.757C191.334 106.911 187.026 112.018 186.989 117.974H174.346C174.346 104.283 185.667 93.1849 199.633 93.1849C209.348 93.1564 218.233 98.5516 222.535 107.092C226.398 115.793 224.871 125.891 218.598 133.12C216.691 135.192 214.551 137.045 212.217 138.644C210.176 140.024 208.313 141.643 206.671 143.465C204.35 146.913 203.35 151.055 203.847 155.157Z" fill="#1D7290" />
                            : <><circle id="animatedCircle" cx="180" cy="142" r="6" fill="#1D7290" stroke="#1D7290" strokeWidth="0.5">
                                <animate
                                    attributeName="cy"
                                    values="142;132;122;132;142"
                                    dur="1s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                                <circle id="animatedCircle" cx="200" cy="132" r="6" fill="#1D7290" stroke="#1D7290" strokeWidth="0.5">
                                    <animate
                                        attributeName="cy"
                                        values="132;142;132;122;132"
                                        dur="1s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                                <circle id="animatedCircle" cx="220" cy="122" r="6" fill="#1D7290" stroke="#1D7290" strokeWidth="0.5">
                                    <animate
                                        attributeName="cy"
                                        values="122;132;142;132;122"
                                        dur="1s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </>}
                    </svg>
                </div>
                : <section className={styles.mailConfirmationSection}>
                    <div>
                        <div className={styles.closeWrapper}>
                            <img src="/img/svg/formClose.svg" alt="close" onClick={() => {
                                if (window.history.length > 2) navigate(-1);
                                else navigate('/')
                            }} />
                        </div>
                        <h1>Регистрация пользователя <br />
                            прошла успешно</h1>
                        <p>Чтобы подтвердить регистрацию учетной записи, перейдите по ссылке в письме, отправленном на почту:</p>
                        <input
                            type="email"
                            value={editEmail}
                            disabled={!editModeEmail}
                            onChange={e => setEditEmail(e.target.value)}
                        />
                        <div className={styles.buttonBlock}>
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (editModeEmail) {
                                    if (editEmail === inputsSet[InputRow.mail][0])
                                        return store.setNotification(
                                            'Изменения отклонены',
                                            'Новая почта совпадает с предыдущей.'
                                        );
                                    if (!editEmail) {
                                        setEditEmail(inputsSet[InputRow.mail][0]);
                                        return store.setNotification(
                                            'Изменения отклонены',
                                            'Новая почта указана пустой.'
                                        );
                                    }
                                    if (usernamesUsed.current[UniqeData.login].includes(CryptoJS.SHA256(editEmail).toString())) {
                                        setEditEmail(inputsSet[InputRow.mail][0]);
                                        return store.setNotification(
                                            'Изменения отклонены',
                                            'Указанная почта уже используется.'
                                        );
                                    }
                                    UserService.editEmail(inputsSet[InputRow.login][0], inputsSet[InputRow.password][0], editEmail).then(
                                        () => {
                                            inputsSet[InputRow.mail][1](editEmail);
                                            store.setNotification("Успешно", `Проверьте новую почту: ${editEmail}`);
                                        }
                                    ).catch(error => {
                                        if (error.response) {
                                            const errorMessage = error.response.data.message || "Неизвестная ошибка";
                                            store.setNotification("Ошибка регистрации", errorMessage);
                                        } else if (error.request) {
                                            store.setNotification("Сервер не отвечает", 'Попробуйте cделать запрос позже');
                                        } else {
                                            store.setNotification("Произошла неизвестная ошибка", '...');
                                            console.log(error);
                                        }
                                    })

                                }
                                setEditModeEmail(!editModeEmail);
                            }}>
                                {
                                    editModeEmail
                                        ? 'Сохранить'
                                        : 'Изменить'
                                }
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                UserService.checkConfirmEmail(
                                    inputsSet[InputRow.login][0],
                                    inputsSet[InputRow.password][0]
                                ).then(
                                    response => {
                                        const { accessToken, refreshToken } = response.data;
                                        navigate(`/successful_email_confirmation/?name=${inputsSet[InputRow.name][0]}&surName=${inputsSet[InputRow.surName][0]}&accessToken=${accessToken}&refreshToken=${refreshToken}`)
                                    }
                                ).catch(
                                    error => {
                                        if (error.response) {
                                            const errorMessage = error.response.data.message || "Неизвестная ошибка";
                                            store.setNotification("Неудачно", errorMessage);
                                        } else if (error.request) {
                                            store.setNotification("Сервер не отвечает", 'Попробуйте cделать запрос позже');
                                        } else {
                                            store.setNotification("Произошла неизвестная ошибка", '...');
                                            console.log(error);
                                        }
                                    }
                                )
                            }}>
                                Проверить
                            </button>
                        </div>
                    </div>
                    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M200.009 200.001C236.842 200.001 266.676 170.084 266.676 133.334C266.676 96.5006 236.842 66.6672 200.009 66.6672C163.176 66.6672 133.342 96.5006 133.342 133.334C133.342 170.084 163.176 200.001 200.009 200.001ZM200.009 233.334C155.592 233.334 66.6758 255.584 66.6758 300.001V313.334C66.6758 324.38 75.6301 333.334 86.6758 333.334H313.342C324.388 333.334 333.342 324.38 333.342 313.334V300.001C333.342 255.584 244.426 233.334 200.009 233.334Z" fill="#D9E5F0" />
                        <path d="M186.791 149.176L170.256 132.307L164.625 138.011L186.791 160.625L234.375 112.079L228.784 106.375L186.791 149.176Z" fill="#1D7290" />
                    </svg>
                </section>
            }
        </div >
    )
}

export default Registration