import { FC } from 'react'
import styles from './SoftwareUsed.module.css'
import TransitionFields from '../../../Fields/TransitionFields'
import TextFields from '../../../Fields/TextFields'

const SoftwareUsed: FC = () => {
    return (
        <div className={styles.skin}>
            <div className={styles.row}>
                <TextFields
                    title="Версия програмного обеспечения"
                    description='Укажите текущую версию програмного обеспечения, используемого для создания и проверки цифрового сертификата. Оно необходимо для обеспечения совместимости между различными системами и подтверждения актуальности использованных методов шифрования и алгоритмов безопасности.'
                    example=' v7.7.1'
                    imageName='softwareVersion'
                    pliteWidth='42.70833vw'
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
                    contentWidth='24.84375vw'
                />
                <TextFields
                    title="Наименование ПО"
                    description='Укажите название программного обеспечения, которое используется для создания и проверки цифрового сертификата. Это позволит идентифицировать конкретное програмное обеспечение, проводящее обработку и защиту данных, и будет способствовать совместимости между различными системами.'
                    example='CryptoGuard Certify'
                    imageName='softwareName'
                    pliteWidth='42.70833vw'
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
                    contentWidth='24.84375vw'
                />
            </div>
            <div className={styles.row}>
                <TextFields
                    description='Укажите категорию или предназначение программного обеспечения, используемого для работы с цифровым сертификатом. Это может быть, например, программное обеспечение для управления сертификатами, шифрования данных или обеспечения сетевой безопасности.'
                    example='система управления цифровыми сертификатами'
                    title="Тип программного обеспечения"
                    imageName='softwareType'
                    pliteWidth='42.70833vw'
                    isOptional={true}
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
                    contentWidth='24.84375vw'
                />
                <TransitionFields
                    title='Описание программного обеспечения'
                    content={[
                        'Наименование элемента',
                        'Дополнительное описание элемента',
                        'Файлы',
                        'Формулы',
                    ]}
                    isOptional={true}
                    pliteWidth='42.70833vw'
                    imageName='softwareDescription'
                    maxWidthTitle='none'
                    toField={<div />}
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
                    contentHeight='30vh'
                />
            </div>
        </div>
    )
}

export default SoftwareUsed