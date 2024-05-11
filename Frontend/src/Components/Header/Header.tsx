import {FC} from 'react'
import styles from './Header.module.css'

const Header: FC = () => {
    return (
        <header className={styles.mainHeader}>
            <h1>DCC CERTIFICATE</h1>
        </header>
    )
}

export default Header