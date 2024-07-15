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
                    content={[
                        'Государство',
                        'Идентификатор',
                        'Дата начала',
                        'Дата окончания',
                        '...',
                    ]}
                    contentHeight='30vh'
                    imageName='mainDataField'
                    toField={<div />}

                />
                <TransitionFields
                    title='Идентификация заказчика калибровки'
                    content={[
                        'Наименование',
                        'Локация',
                        'Электронная почта',
                        'Номер телефона',
                        '...',
                    ]}
                    imageName='personalcard'
                    toField={<div />}

                />
                <TransitionFields
                    title='Идентификация калибровочной лаборатории'
                    content={[
                        'Идентификатор',            
                        'Метка времени',
                        'Контакты',
                        'Подпись',
                        'Печать',
                    ]}
                    imageName='defineLib'
                    toField={<div />}

                />
                <TransitionFields
                    title='Идентификация лиц отвечающих за калибровку'
                    content={[
                        'Контакты и информация',
                        'Ответственное лицо',
                        'Роль или должность',
                        'Описание',
                        '...',
                    ]}
                    imageName='defineFace'
                    toField={<div />}

                />
            </div>
            <div className={styles.row}>
                <TransitionFields
                    title='Утверждения'
                    content={[
                        'Допустимый диапазон',
                        'Список статусов',
                        'Соответсвие',
                        'Прослеживаемость',
                        '...',
                    ]}
                    imageName='statements'
                    toField={<div />}
                    isOptional={true}
                    contentHeight='30vh'
                />
                <TransitionFields
                    title='Идентификация элементов калибровки'
                    content={[
                        'Калибровочный элемент',
                        'Наименование системы',
                        'Производитель',
                        'Владелец',
                        '...',
                    ]}
                    imageName='questionField'
                    toField={<div />}
                />
                <TransitionFields
                    title='Используемое программное обеспечение'
                    content={[
                        'Наименование ПО',
                        'Описание ПО',
                        'Версия ПО',
                        'Тип ПО',
                    ]}
                    imageName='pkWithSearchLoupe'
                    toField={<SoftwareUsed />}
                />
                <TransitionFields
                    title='Спецификация типов ссылок используемых в DCC'
                    content={[
                        'Именное пространство',
                        'Тип ссылки',
                        'Ссылка',
                        'Выпуск',
                        '...',
                    ]}
                    imageName='linkLogoField'
                    toField={<div />}
                    isOptional={true}
                />
            </div>
        </div>
    )
}

export default AdministrativeData