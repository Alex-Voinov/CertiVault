import { FC, useState, useContext } from 'react'
import styles from './Authorization.module.css'
import Header from '../../Components/Header/Header'
import { useNavigate, Link } from 'react-router-dom'
import checkPassword from '../../Utilities/password'
import { GlobalData } from '../..'
import { LoginStauts } from '../../Store/store'

const Authorization: FC = () => {
    const { store } = useContext(GlobalData);
    const navigate = useNavigate();
    const [logOrMail, setLogOrMail] = useState('');
    const [pass, setPas] = useState('');
    const [isLoading, setLoading] = useState(false);
    const statusError = !(logOrMail && pass) ? 'Необходимо заполнить все поля.' : checkPassword(pass);
    return (
        <section className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={{ backgroundColor: 'transparent' }} />
            <form className={styles.content}>
                <img
                    src="/img/svg/formClose.svg"
                    alt="close"
                    className={styles.close}
                    onClick={() => {
                        if (window.history.length > 2) navigate(-1);
                        else navigate('/')
                    }}
                />
                <h1>Вход в систему</h1>
                <h2>Логин / почта</h2>
                <input
                    type="text"
                    placeholder='example@mail.ru'
                    value={logOrMail}
                    onChange={(e) => setLogOrMail(e.target.value)}
                    autoComplete='new-password'
                />
                <h2>Пароль</h2>
                <input
                    type="password"
                    placeholder='Qwerty123'
                    value={pass}
                    onChange={(e) => setPas(e.target.value)}
                    autoComplete='new-password'
                />
                <button
                    className={
                        !statusError
                            ? styles.active
                            : styles.disable
                    }
                    onClick={
                        e => {
                            e.preventDefault();
                            if (!statusError) {
                                setLoading(false)
                                store.login(logOrMail, pass).then(
                                    status => {
                                        if (status === LoginStauts.correct) return navigate('/repository/')
                                        if (status === LoginStauts.confirmEmail) {
                                            navigate(`/registration/?activate=true`)
                                        }
                                    }
                                ).finally(
                                    () => setLoading(false)
                                )
                            }
                        }
                    }
                    onMouseEnter={
                        () => {
                            if (statusError) {
                                store.setNotification(
                                    'Некорректные поля',
                                    statusError
                                )
                            }
                        }
                    }
                >
                    Вход
                </button>
                <div>
                    <p>Нет аккаунта?</p>
                    <Link to='/registration/'>
                        Зарегестрируйтесь
                    </Link>
                </div>
            </form>
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
        </section>
    )
}

export default Authorization