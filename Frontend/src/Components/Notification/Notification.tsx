import { useContext, useEffect, useRef } from 'react'
import styles from './Notification.module.css'
import { motion } from 'framer-motion'
import { GlobalData } from '../..'




const Notification = () => {
    const { store } = useContext(GlobalData);
    const ntfWrapper = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(ntfWrapper.current?.contains(event.target as Node))) {
                store.setNotification('', '')
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ntfWrapper]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
            ref={ntfWrapper}
        >
            <header>
                <h1>{store.notificationTitle}</h1>
                <img src="/img/svg/closeNtf.svg" alt="close" onClick={() => store.setNotification('', '')} />
            </header>
            <p>{store.notificationDesc}</p>
        </motion.div>
    )
}

export default Notification