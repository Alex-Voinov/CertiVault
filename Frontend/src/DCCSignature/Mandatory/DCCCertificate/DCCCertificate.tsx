import { FC, Dispatch, SetStateAction } from 'react'
import styles from './DCCCertificate.module.css'
import AdministrativeData from '../AdministrativeData/AdministrativeData'
import MeasurementResults from '../MeasurementResults/MeasurementResults'
import Document from '../../Optional/Document/Document'
import Signature from '../../Optional/Signature/Signature'
import Comment from '../../Optional/Comment/Comment'

interface IDCCCertificate {
    toStep: Dispatch<SetStateAction<JSX.Element>>
    path?: string[];
}

const DCCCertificate: FC<IDCCCertificate> = ({ path = [], toStep }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={styles.mandatoryWrapper} onClick={
                    () => toStep(<AdministrativeData />)}
                >
                    <h1>Административная информация</h1>
                    <div className={styles.content}>
                        <div className={styles.animateLine} />
                        <h1>Основные данные калибровки</h1>
                        <h1>Идентификация заказчика калибровки</h1>
                        <h1>Идентификация калибровочной лаборатории</h1>
                        <h1>Идентификация лиц отвечающих калибровку</h1>
                        <h1>...</h1>
                    </div>
                    <img src="/img/svg/administrativeHandle.svg" alt="administrative handle" />
                    <div className={styles.nextStep}>
                        <h1>Открыть</h1>
                        <img src="/img/svg/transition.svg" alt="transition" />
                    </div>
                </div>
                <div className={styles.mandatoryWrapper}>
                    <MeasurementResults path={path} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.optionalWrapper}>
                    <Comment path={path} />
                </div>
                <div className={styles.optionalWrapper}>
                    <Document path={path} />
                </div>
                <div className={styles.optionalWrapper}>
                    <Signature path={path} />
                </div>
            </div>
        </div>
    )
}

export default DCCCertificate