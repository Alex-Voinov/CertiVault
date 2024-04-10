import { useState } from 'react'
import InputRecord from '../../../InputRecord/InputRecord'
import styles from './Composition1SubmenuPoint1.module.css'
import { coreDataMain, coreDataAdditionaly } from '../../../../../dataSets/inputRecords.js'


const Composition1SubmenuPoint1 = ({ setHint, inputsState }) => {
    const [isActiveAdditionalBlock, setActiveAdditionalBlock] = useState(false);
    const dropdawns = coreDataMain.map(
        (data, number) => <InputRecord
            setHint={setHint}
            skinStyles={{ marginTop: '2.31481vh' }}
            title={data.title}
            isDropdawn={data.isDropdawn}
            isMandatory={data.isMandatory}
            isDate={data.isDate}
            descriptionHint={data.descriptionHint}
            exampleHint={data.example}
            key={`input-${data.title}`}
            inputState={inputsState[number]}
        />
    )
    const dropdawnsAdditional = coreDataAdditionaly.map(
        (data, number) => <InputRecord
            setHint={setHint}
            skinStyles={{ marginTop: '2.31481vh' }}
            title={data.title}
            isDropdawn={data.isDropdawn}
            isBlocked={!isActiveAdditionalBlock}
            key={`input-${data.title}`}
            exampleHint={data.example}
            descriptionHint={data.descriptionHint}
            inputState={inputsState[coreDataMain.length + number]}
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