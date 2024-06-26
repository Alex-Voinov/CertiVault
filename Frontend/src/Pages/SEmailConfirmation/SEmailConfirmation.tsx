import { CSSProperties, FC, useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SEmailConfirmation.module.css'
import Header from '../../Components/Header/Header';
import { GlobalData } from '../..';
import Cookies from 'js-cookie';


const SEmailConfirmation: FC = () => {
    const location = useLocation();
    const [count, setCount] = useState(5); //timer
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const surName = searchParams.get('surName');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const { store } = useContext(GlobalData);
    const correctness = name && surName && accessToken && refreshToken;
    useEffect(() => {
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        if (refreshToken) Cookies.set('refreshToken', refreshToken);
        store.verify();
    }, [])
    useEffect(() => {
        if (correctness)
            if (count > 0) {
                const timerId = setTimeout(() => {
                    setCount(count - 1);
                }, 1000);
                return () => clearTimeout(timerId);
            } else {
                navigate('/repository');
            }
    }, [count, navigate]);
    return (
        <section className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={{ backgroundColor: 'transparent' }} />
            <div className={styles.content} style={{ '--h': correctness ? '16.66667vw' : '18.85417vw' } as CSSProperties}>
                <img
                    src="/img/svg/formClose.svg"
                    alt="close"
                    onClick={
                        () => {
                            if (window.history.length > 2) navigate(-1);
                            else navigate('/')
                        }
                    }
                />
                <h1>{
                    correctness
                        ? <>
                            Аккаунт успешно <br /> подтверждён
                        </>
                        : <>
                            При переходе произошла <br /> ошибка
                        </>
                }</h1>
                <p>{
                    correctness
                        ? `${surName} ${name}, ваш аккаунт успешно подтвержден. Вы будете перенаправлены на страницу входа через:`
                        : 'Проверьте не включен ли у вас VPN/прокси и попробуйте повторно авторизоваться'
                }</p>
                {
                    correctness
                        ? <div>{count}...</div>
                        : <button onClick={(e) => {
                            e.preventDefault();
                            navigate('/authorization');
                        }}>
                            Регистрация
                        </button>
                }
            </div>
            <img
                src={`/img/svg/authMenStatus${correctness
                    ? 'Seccess'
                    : 'Denied'
                    }.svg`}
                alt={correctness
                    ? 'Seccess'
                    : 'Denied'
                }
            />
        </section>
    )
}

export default SEmailConfirmation