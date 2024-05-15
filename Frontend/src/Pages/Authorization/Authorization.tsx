import { FC, useState } from 'react'
import styles from './Authorization.module.css'
import Header from '../../Components/Header/Header'
import { useNavigate, Link } from 'react-router-dom'


const Authorization: FC = () => {
    const navigate = useNavigate();
    const [logOrMail, setLogOrMail] = useState('');
    const [pass, setPas] = useState('');
    const correctnes = logOrMail && pass;
    return (
        <section className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={{ backgroundColor: 'transparent' }} />
            <div className={styles.content}>
                <img
                    src="/img/svg/formClose.svg"
                    alt="close"
                    className={styles.close}
                    onClick={() => navigate(-1)}
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
                        correctnes
                            ? styles.active
                            : styles.disable
                    }
                    onClick={e => {
                        e.preventDefault();
                        //auth
                    }}
                >
                    Вход
                </button>
                <div>
                    <p>Нет аккаунта?</p>
                    <Link to='/registration/'>
                        Зарегестрируйтесь
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Authorization