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
                    imageName='softwareVersion'
                    pliteWidth='42.70833vw'
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
                />
                <TextFields
                    title="Наименование ПО"
                    imageName='softwareName'
                    pliteWidth='42.70833vw'
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
                />
            </div>
            <div className={styles.row}>
                <TextFields
                    title="Тип программного обеспечения"
                    imageName='softwareType'
                    pliteWidth='42.70833vw'
                    isOptional={true}
                    imageMarginRight='min(3.02083vw, 5.37037vh)'
                    imageSide='min(10.72917vw, 19.07407vh)'
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