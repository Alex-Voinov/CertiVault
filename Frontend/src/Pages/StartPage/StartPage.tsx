import { CSSProperties, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from './StartPage.module.css';
import { defineTimeInterval, curentTimeDMY } from '../../Utilities/date';


enum AnimateStep {
    preparation,
    appearanceLine,
    appearanceText,
    shiftText,
    completion,
}

const delayByAppearanceMain = 1000;
const firstStepDelay = 2000;
const secondStepDelay = 3000;
const thirdStepDelay = 3000;

const additionalDelayPerAnimation = 7000;

const defintStyleLine = (step: number) => {
    if (step === AnimateStep.preparation)
        return {
            opacity: 0,
            left: '42vw',
        }
    if (step === AnimateStep.appearanceLine)
        return {
            opacity: 1,
            animation: `${styles.lightbeam} 0.8s 0.1s`,
        }
    if ([AnimateStep.appearanceText, AnimateStep.shiftText].includes(step))
        return { opacity: 1 }
    return { opacity: 0 } as CSSProperties
}

const defineStyleText = (step: number): CSSProperties => {
    if (step === AnimateStep.appearanceLine) return {
        color: '#fff',
        height: 'min(5.20833vw, 9.25926vh)'
    }

    return {}
}

const StartPage = () => {
    console.log(styles);
    const currentWelcomePhrase = defineTimeInterval();
    const [animateStep, setAnimateStep] = useState(AnimateStep.preparation);
    const completionDelay = useRef<number>(0);
    useEffect(() => {
        if (!completionDelay.current) {
            completionDelay.current = delayByAppearanceMain; // если уже здоровались
            const oldWelcomePhrase = localStorage.getItem('welcomePhrase');
            const currentTimeInterval = curentTimeDMY() + currentWelcomePhrase;
            if (oldWelcomePhrase !== currentTimeInterval) {
                localStorage.setItem('welcomePhrase', currentTimeInterval);
                setTimeout(() => setAnimateStep(AnimateStep.appearanceLine), firstStepDelay);
                setTimeout(() => setAnimateStep(AnimateStep.appearanceText), firstStepDelay + secondStepDelay);
                setTimeout(() => setAnimateStep(AnimateStep.shiftText), firstStepDelay + secondStepDelay + thirdStepDelay);
                completionDelay.current += additionalDelayPerAnimation;
            }
            setTimeout(() => setAnimateStep(AnimateStep.completion), completionDelay.current)
        }
    }, [])
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.animatedText} style={defineStyleText(animateStep)}>
                {currentWelcomePhrase}
            </h1>
            <div className={styles.animatedLine} style={defintStyleLine(animateStep)} />
        </section>
    )
}

export default StartPage