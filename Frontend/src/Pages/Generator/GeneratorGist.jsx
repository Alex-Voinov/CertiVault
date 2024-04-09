import React from 'react'
import styles from './GeneratorGist.module.css'
import Composition1 from './StepCompostions/Composition1/Composition1'



const GeneratorGist = ({ step, setComplete, setHint }) => {
    return (
        <section className={styles.skin}>
            <header>
                <div className={styles.leftHeader}>
                    <h1>Основная информация</h1>
                    <img src="/img/svg/generator_info.svg" alt="info" />
                </div>
            </header>
            <main>
                {step === 0 && <Composition1 setHint={setHint}/>}
            </main>
        </section>
    )
}

export default GeneratorGist