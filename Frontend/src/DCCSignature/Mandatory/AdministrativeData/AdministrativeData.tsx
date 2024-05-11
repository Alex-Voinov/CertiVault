import { FC } from 'react'
import styles from './AdministrativeData.module.css'


interface IAdministrativeData {
    path?: string[];
}

const AdministrativeData: FC<IAdministrativeData> = ({ path = ['dcc:administrativeData'] }) => {
    return (
        <div className={styles.wrapper}>
            AdministrativeData
        </div>
    )
}

export default AdministrativeData