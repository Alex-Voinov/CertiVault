import { useState, useRef, useEffect } from 'react'
import styles from './Generator.module.css'
import { postDataSend } from '../../utilities/serverRequest'
import GeneratorGist from './GeneratorGist'
import { motion, AnimatePresence } from 'framer-motion';

const activeButton = {
    backgroundColor: '#317187',
    cursor: 'pointer',
    color: 'white',
}

const passiveButton = {
    backgroundColor: '#7CA3B3',
    cursor: 'not-allowed',
    color: '#E7EDF3',
    '--select': '#7CA3B3'
}

const windowHeight = window.innerHeight;

const Generator = () => {

    const [hint, setHint] = useState(null);
    const [activeStep, setStep] = useState(0);
    const [isCorrectStep, setCorrectStep] = useState(false);
    const progressPoints = [];
    const hintText = useRef(null);
    const [hintTextHeight, setHintTextHeight] = useState(null);

    const adjustHeight = () => {
        if (hintText.current) {
            const hintTextHeight = parseFloat(hintText.current.clientHeight);
            setHintTextHeight(hintTextHeight + windowHeight * 0.0444444);
        }
    };

    useEffect(() => {
        adjustHeight();
        window.addEventListener('resize', adjustHeight);
        return () => {
            window.removeEventListener('resize', adjustHeight);
        };
    }, [hint]);

    for (let i = 0; i < 5; i++) {
        const newPoint = <div
            className={styles.menuPoint}
            style={{
                left: 17.5 + i * 15 + '%',
            }}>
            {i < activeStep
                ? <img
                    src={`/img/svg/complete.svg`}
                    alt={`complete point №${i + 1}`}
                />
                : i === activeStep && <div className={styles.selectStepPoint} />
            }
        </div>
        progressPoints.push(newPoint);
    }

    const canBack = activeStep > 0;
    const canForward = isCorrectStep && activeStep < 5;


    // Обработчик изменения значения инпута
    // Обработчик отправки формы
    const previousStep = (e) => {
        e.preventDefault()
        setStep(activeStep - 1);
    }

    const nextStep = (e) => {
        e.preventDefault();
        setStep(activeStep + 1);
    }
    return (
        <section className={styles.skin}>
            <header className={styles.header}>
                <h1>DCC CERTIFICATE</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.innerMain}>
                    <GeneratorGist step={activeStep} setComplete={setCorrectStep} setHint={setHint} />
                </div>
                <AnimatePresence>
                    {hint && <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.helperBlock}
                        style={{
                            height: hintTextHeight ? hintTextHeight + 'px' : '',
                            marginTop: hint.y * windowHeight + windowHeight * 0.04629625 - hintTextHeight * hint.y + 'px',
                        }}
                    >
                        <header>
                            <h1>Подробнее</h1>
                            <img src="/img/svg/additionaly.svg" alt="additionaly" />
                        </header>
                        <main ref={hintText} >
                            <h1>{hint.title}</h1>
                            <p>{hint.descriptionHint}</p>
                            <p className={styles.forExample}>Например: {hint.example}.</p>
                        </main>
                    </motion.div>}
                </AnimatePresence>
            </main>
            <footer className={styles.footer}>
                <button onClick={previousStep} disabled={!canBack} style={canBack ? activeButton : passiveButton}>
                    ПРЕДЫДУЩИЙ ШАГ
                </button>
                <div className={styles.progressBar}>
                    <div className={styles.backLine} />
                    <div className={styles.frontLine} style={{ width: activeStep < 5 ? 17.5 + activeStep * 15 + '%' : '100%' }} />
                    {progressPoints}
                </div>
                <button onClick={nextStep} disabled={!canForward} style={canForward ? activeButton : passiveButton}>
                    СЛЕДУЮЩИЙ ШАГ
                </button>
            </footer>
        </section>
    )
}

export default Generator