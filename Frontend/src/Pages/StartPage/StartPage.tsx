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
const firstStepDelay = 1000;
const secondStepDelay = 2000;
const thirdStepDelay = 2000;

const additionalDelayPerAnimation = 6000;

const defintStyleLine = (step: number) => {
    if (step === AnimateStep.preparation)
        return {
            opacity: 0,
            left: '32vw',
        }
    if (step === AnimateStep.appearanceLine)
        return {
            opacity: 1,
            animation: `${styles.lightbeam} 1s 1.8s`,
        }
    if ([AnimateStep.appearanceText, AnimateStep.shiftText].includes(step))
        return {
            opacity: 1,
            animation: `${styles.lightbeam} 1s 1.8s`,
        }
    if (step === AnimateStep.completion) return {
        display: 'none'
    }
    return { opacity: 0 } as CSSProperties
}

const defineStyleText = (step: number): CSSProperties => {
    if (step === AnimateStep.preparation) return {
        color: 'transparent',
        height: '0vw',
    }
    if (step === AnimateStep.appearanceLine) return {
        color: '#fff',
        height: '0vw',
        paddingTop: '5vw',
    }
    if (step === AnimateStep.appearanceText) return {
        color: '#fff',
    }
    if (AnimateStep.shiftText === step) return {
        top: '1.94444vh',
        left: '4.16667vw',
        color: '#E7EDF3',
        fontWeight: '500',
        fontSize: 'min(1.66667vw, 2.96296vh)',
        textShadow: '0 0.37037vh min(0.20833vw, 0.37037vh) rgba(0, 0, 0, 0.35)',
        width: '12.70833vw',
        overflow: 'visible'
    }
    if (step === AnimateStep.completion) return {
        display: 'none'
    }
    return {}
}

const StartPage = () => {
    const [currentWelcomePhrase, setWelcomePhrase] = useState(defineTimeInterval());
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
                setTimeout(() => setWelcomePhrase('DCC CERTIFICATE'), firstStepDelay + secondStepDelay + thirdStepDelay * 1.2);
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