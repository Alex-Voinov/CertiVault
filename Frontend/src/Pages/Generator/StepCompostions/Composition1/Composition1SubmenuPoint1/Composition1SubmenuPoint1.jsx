import { useState, useEffect } from 'react'
import InputRecord from '../../../InputRecord/InputRecord'
import styles from './Composition1SubmenuPoint1.module.css'
import { coreDataMain, coreDataAdditionaly } from '../../../../../dataSets/inputRecords.js'


const Composition1SubmenuPoint1 = ({ setHint, inputsState, correctnessSubParagraphsState }) => {
    const correctnessInputState = new Array(coreDataMain.length + coreDataAdditionaly.length).fill(false).map(useState);
    const [correctnessSubParagraphs, setCorrectnessSubParagraphs] = correctnessSubParagraphsState;
    const [isActiveAdditionalBlock, setActiveAdditionalBlock] = useState(false);
    useEffect(() => {
        const correctnes = correctnessInputState.every(value => value[0] === true)
        if (correctnes !== correctnessSubParagraphs[0]) {
            const actualityCorrectnes = [correctnes, correctnessSubParagraphs[1], correctnessSubParagraphs[2]];
            setCorrectnessSubParagraphs(actualityCorrectnes)
        }
    }, [correctnessInputState.map(state => state[0])])
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
            setCorrectnessInputs={correctnessInputState[number][1]}
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
            setCorrectnessInputs={correctnessInputState[coreDataMain.length + number][1]}
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