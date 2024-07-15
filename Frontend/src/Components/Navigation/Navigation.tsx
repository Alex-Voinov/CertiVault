import { FC, useContext } from 'react'
import styles from './Navigation.module.css'
import { GlobalData } from '../..';
import { observer } from 'mobx-react-lite';


const INITIAL_POINT = '...';

const Navigation: FC = () => {
    const { store } = useContext(GlobalData);
    const currentPosition = store.getPositionMap();
    const generateNavigatePoint = (
        data: string[]
    ) => data.map(
        historyPointName => {
            const isNonClickable = [INITIAL_POINT, currentPosition.at(-1)].includes(historyPointName);
            return <>
                <img src="/img/svg/navigateArrow.svg" alt="pointer" />
                <h2
                    className={
                        isNonClickable
                            ? styles.nonClickable
                            : ''
                    }
                    onClick={() => {
                        if (isNonClickable) return;
                        store.activeNavigatePoint(historyPointName);
                    }}
                >
                    {historyPointName}
                </h2>
            </>
        }
    )
    return (
        <section className={styles.wrapper}>
            <div className={styles.skin}>
                <h2
                    className={currentPosition.length > 0 ? styles.activeLink : ''}
                    onClick={
                        () => {
                            if (currentPosition.length > 0)
                                store.navigateToStartPoint();
                        }
                    }
                >
                    Заполнение сертификата
                </h2>
                {
                    generateNavigatePoint(
                        currentPosition.length > 0
                            ? currentPosition
                            : [INITIAL_POINT],
                    )
                }
            </div>
            {currentPosition.length > 0 && <div
                className={styles.backStep}
                onClick={() => {
                    store.backStep();
                }}
            >
                <div className={styles.imgContainer}>
                    <img src="/img/svg/backStepPointerNavigation.svg" alt="back pointer" />
                </div>
                <div className={styles.textContainer}>
                    Назад
                </div>
            </div>}
        </section>
    )
}

export default observer(Navigation)