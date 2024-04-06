import { useState } from 'react'
import InputRecord from '../../../InputRecord/InputRecord'
import styles from './Composition1SubmenuPoint1.module.css'

const recordData = [
    {
        title: 'Код страны в которой проводилась калибровка',
        isDropdawn: true,
        isMandatory: true,
        isDate: false,
    },
    {
        title: 'Язык на котором создавался DCC',
        isDropdawn: true,
        isMandatory: true,
        isDate: false,
    },
    {
        title: 'Язык использующийся при спорных ситуациях',
        isDropdawn: true,
        isMandatory: true,
        isDate: false,
    },
    {
        title: 'Уникальный идентификатор',
        isDropdawn: false,
        isMandatory: true,
        isDate: false,
    },
    {
        title: 'Дата получения объекта калибровки',
        isDropdawn: false,
        isMandatory: false,
        isDate: true,
    },
    {
        title: 'Дата начала калибровки',
        isDropdawn: false,
        isMandatory: true,
        isDate: true,
    },
    {
        title: 'Дата окончания калибровки',
        isDropdawn: false,
        isMandatory: true,
        isDate: true,
    },
    {
        title: 'Дата выдачи',
        isDropdawn: false,
        isMandatory: false,
        isDate: true,
    },
]

const recordDataAdditional = [
    {
        title: 'Организация присвоившая идентификатор',
        isDropdawn: false,
        isDate: false,
    },
    {
        title: 'Значение идентификатора',
        isDropdawn: false,
        isDate: false,
    },
    {
        title: 'Дополнительная информация об идентификаторе',
        isDropdawn: false,
        isDate: false,
    },
]

const Composition1SubmenuPoint1 = () => {
    const [isActiveAdditionalBlock, setActiveAdditionalBlock] = useState(false);
    const dropdawns = recordData.map(
        data => <InputRecord
            skinStyles={{ marginTop: '2.31481vh' }}
            title={data.title}
            isDropdawn={data.isDropdawn}
            isMandatory={data.isMandatory}
            isDate={data.isDate}
        />
    )
    const dropdawnsAdditional = recordDataAdditional.map(
        data => <InputRecord
            skinStyles={{ marginTop: '2.31481vh' }}
            title={data.title}
            isDropdawn={data.isDropdawn}
            isBlocked={!isActiveAdditionalBlock}
        />
    )
    return (
        <section className={styles.skin}>
            {dropdawns}
            <div className={styles.additionalActivater} >
                <h1>
                    Наличие дополнительных индекаторов
                </h1>
                <div onClick={() => setActiveAdditionalBlock(!isActiveAdditionalBlock)}>
                    <img
                        src="/img/svg/blackSelect.svg"
                        alt="select"
                        style={{
                            opacity: isActiveAdditionalBlock ? '1' : '0'
                        }}
                    />
                </div>
            </div>
            {dropdawnsAdditional}
        </section>
    )
}

export default Composition1SubmenuPoint1