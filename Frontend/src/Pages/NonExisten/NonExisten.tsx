import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header'
import styles from './NonExisten.module.css'

const NonExisten: FC = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.wrapper}>
            <Header visibleAuthLogo={false} wrapperStyles={{ backgroundColor: 'transparent' }} />
            <img src="/img/svg/non_existen_back.svg" alt="non existen" />
            <h1>Страница не найдена</h1>
            <button onClick={(e) => {
                e.preventDefault();
                navigate('/')
            }}>
                На главную
            </button>
        </section>
    )
}

export default NonExisten