import { CSSProperties, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from './StartPage.module.css';
import { defineTimeInterval, curentTimeDMY } from '../../Utilities/date';
import { motion } from 'framer-motion';
import Header from '../../Components/Header/Header';


enum AnimateStep {
    preparation,
    appearanceLine,
    appearanceText,
    shiftText,
    completion,
}

const delayByAppearanceMain = 1;
const firstStepDelay = 1;
const secondStepDelay = 2000;
const thirdStepDelay = 2000;
const textAppearanceDelay = 400;

const additionalDelayPerAnimation = firstStepDelay + secondStepDelay + thirdStepDelay + textAppearanceDelay * 2.5;
const toolsSet = [
    {
        title: 'Создать',
        keyName: 'create',
    },
    {
        title: 'Загрузить',
        keyName: 'upload',
    },
    {
        title: 'Скачать',
        keyName: 'download',
    },
    {
        title: 'Отправить',
        keyName: 'Share',
    },
]

const repoSvg = <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.repo}>
    <g filter="url(#filter0_f_776_2375)" className={styles.repoGroup}>
        <path d="M100.833 174.167V82.5H36.6668V174.167H100.833ZM100.833 64.1667V36.6667C100.833 34.2355 101.799 31.9039 103.518 30.1849C105.237 28.4658 107.569 27.5 110 27.5H192.5C194.931 27.5 197.263 28.4658 198.982 30.1849C200.701 31.9039 201.667 34.2355 201.667 36.6667V183.333C201.667 185.764 200.701 188.096 198.982 189.815C197.263 191.534 194.931 192.5 192.5 192.5H27.5002C25.069 192.5 22.7374 191.534 21.0183 189.815C19.2993 188.096 18.3335 185.764 18.3335 183.333V73.3333C18.3335 70.9022 19.2993 68.5706 21.0183 66.8515C22.7374 65.1324 25.069 64.1667 27.5002 64.1667H100.833ZM119.167 45.8333V174.167H183.333V45.8333H119.167ZM45.8335 146.667H91.6668V165H45.8335V146.667ZM128.333 146.667H174.167V165H128.333V146.667ZM128.333 119.167H174.167V137.5H128.333V119.167ZM128.333 91.6667H174.167V110H128.333V91.6667ZM45.8335 119.167H91.6668V137.5H45.8335V119.167Z" fill="white" fillOpacity="0.3" />
    </g>
    <defs>
        <filter id="filter0_f_776_2375" x="10.3335" y="19.5" width="199.333" height="181" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_776_2375" />
        </filter>
    </defs>
</svg>

const toolsSvg = <svg viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.tools}>
    <g filter="url(#filter0_f_776_2378)" className={styles.toolsGroup}>
        <path d="M13.5986 176.419C10.2995 179.979 8.50348 184.687 8.58885 189.552C8.67422 194.417 10.6343 199.059 14.0562 202.5C17.4781 205.94 22.0946 207.911 26.9332 207.997C31.7717 208.083 36.4545 206.277 39.995 202.96L101.255 141.366L74.8581 114.825L13.5986 176.419Z" fill="white" fillOpacity="0.3" />
        <path d="M167.081 62.3994L193.928 48.4325L207.999 21.1699L194.889 8L167.749 22.1346L153.846 49.0617L121.195 81.9026L134.431 95.2404L167.081 62.3994Z" fill="white" fillOpacity="0.3" />
        <path d="M172.936 133.145H170.394C165.965 133.17 161.577 133.99 157.437 135.565L80.609 58.4155C82.1295 54.2877 82.9054 49.9221 82.9005 45.5224L82.6505 43.0189C82.3031 36.9237 80.4605 31.0082 77.2857 25.7963C74.111 20.5843 69.7021 16.2366 64.4494 13.1381C59.1967 10.0396 53.2622 8.28583 47.1713 8.03209C41.0804 7.77835 35.021 9.03246 29.5295 11.6834L54.5276 36.7185C55.7838 37.9997 56.75 39.5365 57.3607 41.2248C58.0579 43.1336 58.2803 45.1838 58.009 47.198C57.7376 49.2123 56.9806 51.1301 55.8033 52.7857C54.626 54.4413 53.0638 55.7848 51.2518 56.7003C49.4398 57.6158 47.4325 58.0756 45.4033 58.04C43.9739 57.9954 42.5635 57.6988 41.2369 57.1638C39.563 56.5477 38.0319 55.5965 36.7373 54.3682L11.7391 29.3331C9.06696 34.8317 7.79205 40.906 8.0276 47.0166C8.26316 53.1272 10.0019 59.0851 13.0894 64.3609C16.1768 69.6368 20.5175 74.0674 25.7259 77.2593C30.9343 80.4512 36.8491 82.3056 42.9451 82.6578L45.4033 83.075C49.8321 83.0498 54.2205 82.2301 58.3607 80.655L135.397 157.513C133.771 161.719 132.924 166.187 132.897 170.698L133.147 173.201C133.839 182.633 138.06 191.456 144.965 197.907C151.87 204.358 160.951 207.962 170.394 208C175.957 207.995 181.445 206.71 186.435 204.245L161.436 179.21C160.267 177.956 159.361 176.48 158.77 174.87C158.108 172.995 157.901 170.989 158.168 169.017C158.434 167.046 159.166 165.167 160.302 163.536C161.438 161.904 162.947 160.567 164.702 159.636C166.457 158.705 168.408 158.206 170.394 158.18C171.823 158.225 173.234 158.521 174.56 159.056C176.26 159.619 177.802 160.577 179.06 161.852L204.058 186.887C206.82 181.378 208.169 175.268 207.983 169.106C207.798 162.945 206.084 156.927 202.996 151.595C199.908 146.263 195.543 141.784 190.295 138.563C185.047 135.342 179.081 133.48 172.936 133.145Z" fill="white" fillOpacity="0.3" />
    </g>
    <defs>
        <filter id="filter0_f_776_2378" x="0" y="0" width="216" height="216" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_776_2378" />
        </filter>
        <filter id="filter0_f_776_2300" x="0" y="0" width="220" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_776_2300" />
        </filter>
    </defs>
</svg>

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
                    <Header wrapperStyles={{ backgroundColor: 'transparent' }} />
                    <img src="/img/svg/tile.svg" alt="tile-background" className={`${styles.tile} ${styles.leftTile}`} />
                    <img src="/img/svg/tile.svg" alt="tile-background" className={`${styles.tile} ${styles.rightTile}`} />
                    <div className={styles.toolsWrapper}>
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
                                        <img src={`/img/svg/tools-${pointData.keyName}-logo.svg`} alt={pointData.keyName} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link to='/repository/'>
                        <div className={styles.repoWrapper}>
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