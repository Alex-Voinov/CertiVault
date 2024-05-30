import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from './StartPage.module.css';
import { defineTimeInterval, curentTimeDMY } from '../../Utilities/date';
import { motion } from 'framer-motion';
import Header from '../../Components/Header/Header';
import { AnimateStep, delayByAppearanceMain, firstStepDelay, secondStepDelay, thirdStepDelay, textAppearanceDelay, additionalDelayPerAnimation, defineStyleText, defintStyleLine, toolsSvg, toolsSet, repoSvg } from './data'

const StartPage = () => {
    const [currentWelcomePhrase, setWelcomePhrase] = useState(defineTimeInterval());
    const [animateStep, setAnimateStep] = useState(AnimateStep.preparation);
    const [hasFocuseWrapper, setFocuseWrapper] = useState(false);
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
                setTimeout(() => setWelcomePhrase('DCC CERTIFICATE'), firstStepDelay + secondStepDelay + thirdStepDelay + textAppearanceDelay);
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
            {
                animateStep === AnimateStep.completion && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className={styles.mainSlaise}
                >
                    <Header wrapperStyles={{ backgroundColor: 'transparent' }} visibleModalGround={false}/>
                    <img
                        src="/img/svg/tile.svg"
                        alt="tile-background"
                        className={`${styles.tile} ${styles.leftTile} ${hasFocuseWrapper ? styles.hasFocusLeft : ''}`}
                    />
                    <img
                        src="/img/svg/tile.svg"
                        alt="tile-background"
                        className={`${styles.tile} ${styles.rightTile} ${hasFocuseWrapper ? styles.hasFocusRight : ''}`}
                    />
                    <div
                        className={styles.toolsWrapper}
                        onMouseEnter={
                            () => setFocuseWrapper(true)
                        }
                        onMouseLeave={
                            () => setFocuseWrapper(false)
                        }
                    >
                        <div className={styles.innerWrapper}>
                            <h1>Инструменты</h1>
                            {toolsSvg}
                            <div className={styles.toolsBar}>
                                {toolsSet.map(
                                    pointData => <Link
                                        to={`tools/${pointData.keyName}/`}
                                        key={`startPage-point-${pointData.keyName}`}
                                        className={styles.toolsBarRow}
                                    >
                                        <h2>{pointData.title}</h2>
                                        {pointData.svgData}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link to='/repository/'>
                        <div
                            className={styles.repoWrapper}
                            onMouseEnter={
                                () => setFocuseWrapper(true)
                            }
                            onMouseLeave={
                                () => setFocuseWrapper(false)
                            }
                        >
                            <div className={styles.innerWrapper}>
                                <h1>Репозиторий</h1>
                                {repoSvg}
                                <div className={styles.repoTransition}>
                                    <h2>Перейти</h2>
                                    <img src="/img/svg/doublePointerTransition.svg" alt="transition to repo" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            }
        </section>
    )
}

export default StartPage