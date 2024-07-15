import { FC } from 'react'
import styles from './AdministrativeData.module.css'
import TransitionFields from '../../../Fields/TransitionFields';
import SoftwareUsed from '../SoftwareUsed/SoftwareUsed';

interface IAdministrativeData {
    path?: string[];
}

const AdministrativeData: FC<IAdministrativeData> = ({ path = ['dcc:administrativeData'] }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <TransitionFields
                    title='Основные данные калибровки'
                    content={[]}
                    imageName='mainDataField'
                    toField={<div />}

                />
                <TransitionFields
                    title='Идентификация заказчика калибровки'
                    content={[]}
                    imageName='personalcard'
                    toField={<div />}

                />
                <TransitionFields
                    title='Идентификация калибровочной лаборатории'
                    content={[]}
                    imageName='defineLib'
                    toField={<div />}

                />
                <TransitionFields
                    title='Идентификация лиц отвечающих за калибровку'
                    content={[]}
                    imageName='defineFace'
                    toField={<div />}

                />
            </div>
            <div className={styles.row}>
                <TransitionFields
                    title='Утверждения'
                    content={[]}
                    imageName='statements'
                    toField={<div />}
                    isOptional={true}
                />
                <TransitionFields
                    title='Идентификация элементов калибровки'
                    content={[]}
                    imageName='questionField'
                    toField={<div />}
                />
                <TransitionFields
                    title='Используемое программное обеспечение'
                    content={[]}
                    imageName='pkWithSearchLoupe'
                    toField={<SoftwareUsed />}
                />
                <TransitionFields
                    title='Основные данные калибровки'
                    content={[]}
                    imageName='statements'
                    toField={<div />}
                    isOptional={true}
                />
            </div>
        </div>
    )
}

export default AdministrativeData