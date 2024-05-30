import { CSSProperties, FC, useContext, useState, useEffect, useRef } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { GlobalData } from '../..'
import { motion, AnimatePresence } from 'framer-motion'


interface IHeader {
    visibleAuthLogo?: boolean;
    visibleModalGround?: boolean;
    wrapperStyles?: CSSProperties;
}


const Header: FC<IHeader> = ({ wrapperStyles = {}, visibleAuthLogo = true, visibleModalGround = true }) => {
    const { store } = useContext(GlobalData);
    const [hasFocus, setFocus] = useState<boolean>(false);
    const modalWindow = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalWindow.current && !modalWindow.current.contains(event.target as Node)) {
                setFocus(false)
            }
        };

        if (hasFocus) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hasFocus]);
    return (
        <header className={styles.mainHeader} style={wrapperStyles}>
            <h1>DCC CERTIFICATE</h1>
            {visibleAuthLogo && (store.user.name
                ? <div
                    className={styles.authLabel}
                    onClick={
                        () => {
                            setFocus(!hasFocus);
                        }
                    }
                >
                    <h1>{store.user.name}</h1>
                    <img src="/img/svg/authUserLogo.svg" alt="authorization user" />
                </div>
                : <Link to="/authorization">
                    <svg
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.authLogo}
                    >
                        <path
                            d="M19.0007 9.34166C20.8373 9.34166 22.3257 10.83 22.3257 12.6667C22.3257 14.5033 20.8373 15.9917 19.0007 15.9917C17.164 15.9917 15.6757 14.5033 15.6757 12.6667C15.6757 10.83 17.164 9.34166 19.0007 9.34166ZM19.0007 23.5917C23.7111 23.5917 28.659 25.8954 28.659 26.9167V28.6583H9.34232V26.9167C9.34232 25.8954 14.2902 23.5917 19.0007 23.5917ZM19.0007 6.33333C15.5015 6.33333 12.6673 9.1675 12.6673 12.6667C12.6673 16.1579 15.5015 19 19.0007 19C22.4998 19 25.334 16.1579 25.334 12.6667C25.334 9.1675 22.4998 6.33333 19.0007 6.33333ZM19.0007 20.5833C14.7811 20.5833 6.33398 22.6971 6.33398 26.9167V31.6667H31.6673V26.9167C31.6673 22.6971 23.2202 20.5833 19.0007 20.5833Z"
                            fill="#E7EDF3"
                        />
                    </svg>
                </Link>
            )}
            <AnimatePresence>
                {hasFocus && <motion.div
                    className={styles.modalWindow}
                    ref={modalWindow}
                    initial={{
                        height: '0vh',
                    }}
                    animate={{
                        height: '7.68519vh'
                    }}
                    exit={{
                        height: '0vh',
                    }}
                    transition={{
                        delay: 0.3
                    }}
                    style={
                        !visibleModalGround
                            ? { backgroundImage: 'none', borderColor: 'transparent' }
                            : {}
                    }
                >
                    <div className={styles.modalInnerWrapper}>
                        <h2>
                            <Link to='/authorization/'>
                                Сменить аккаунт
                            </Link>
                        </h2>
                        <h2>
                            <Link to='/logout/'>
                                Выйти
                            </Link>
                        </h2>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </header>
    )
}

export default observer(Header)
