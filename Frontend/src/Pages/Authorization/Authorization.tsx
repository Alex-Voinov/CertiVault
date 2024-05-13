import { CSSProperties, FC, useEffect, useRef, useState, Dispatch, SetStateAction, Fragment, useContext } from 'react'
import styles from './Authorization.module.css'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom';
import UserService from '../../Servies/UserServise';
import checkPassword from '../../Utilities/password';
import { GlobalData } from '../..';
import { capitalize } from '../../Utilities/string';


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
    const [activateAccaunt, setActivateAccaunt] = useState(false);
    const [editModeEmail, setEditModeEmail] = useState(false);
    const [editEmail, setEditEmail] = useState('');
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
        if (InputRow.login === indexRow && usernamesUsed.current.includes(text))
            return ['Не допустимый логин', 'Пользователь с таким логином уже существует.'];
    }

    const statusErrorList = inputsSet.map((state, index) => defineUncorectnessStauts(state[0], index)).filter(el => el !== undefined) as ([string, string][] | undefined);

    return (
        <div className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={modificateHeaderStyle} />
            {!activateAccaunt
                ? <div className={styles.contentBlock}>
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
                                    autoComplete="off"
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
                            onClick={(e) => {
                                e.preventDefault();
                                if (!(statusErrorList && statusErrorList.length > 0))
                                    store.registration(inputsSet.map(state => state[0])).then(() => { setActivateAccaunt(true); setEditEmail(inputsSet[InputRow.mail][0]) })
                            }}
                            onMouseEnter={() => {
                                if (statusErrorList && statusErrorList.length > 0) store.setNotification(statusErrorList[0][0], statusErrorList[0][1])
                            }}
                        >
                            Регистрация
                        </button>
                    </form>
                    <img src="/img/svg/authorization_back_logo.svg" alt="Authorization" />
                </div>
                : <section className={styles.mailConfirmationSection}>
                    <div>
                        <div className={styles.closeWrapper}>
                            <img src="/img/svg/formClose.svg" alt="close" onClick={() => navigate(-1)} />
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
                                        store.setNotification(
                                            'Изменения отклонены',
                                            'Новая почта совпадает с предыдущей.'
                                        ); else {
                                        //Отправка запроса на смену почты
                                    }
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
                                //Проверка подвтерждения почты
                            }}>
                                Проверить
                            </button>
                        </div>
                    </div>
                    <img src="/img/svg/confirmeEmail.svg" alt="confirme" />
                </section>
            }
        </div>
    )
}

export default Authorization