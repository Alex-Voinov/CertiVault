import { useState, useEffect } from 'react'
import styles from './Composition1.module.css'
import Composition1SubmenuPoint1 from './Composition1SubmenuPoint1/Composition1SubmenuPoint1';
import Composition1SubmenuPoint2 from './Composition1SubmenuPoint2/Composition1SubmenuPoint2';
import Composition1SubmenuPoint3 from './Composition1SubmenuPoint3/Composition1SubmenuPoint3';

const Composition1 = ({ setHint, inputsState, setComplete }) => {
    const correctnessSubParagraphsState = useState([false, true, true]);
    const correctnessSubParagraphs= correctnessSubParagraphsState[0];
    useEffect(() => {
        setComplete(correctnessSubParagraphs.every(element => element === true))
    }, [correctnessSubParagraphs])
    const [activeSubmenu, setActiveSubmenu] = useState(0);
    return (
        <section className={styles.skin}>
            <header>
                <div
                    className={`${styles.submenu} ${activeSubmenu === 0 ? styles.active : ''}`}
                    onClick={() => { setActiveSubmenu(0) }}
                >
                    Основное
                </div>
                <div
                    className={`${styles.submenu} ${activeSubmenu === 1 ? styles.active : ''}`}
                    onClick={() => { setActiveSubmenu(1) }}
                >
                    Место проведения калибровки
                </div>
                <div
                    className={`${styles.submenu} ${activeSubmenu === 2 ? styles.active : ''}`}
                    onClick={() => { setActiveSubmenu(2) }}
                >
                    Замена, изменения, предыдущие DCC
                </div>
            </header>
            {activeSubmenu === 0 && <Composition1SubmenuPoint1 setHint={setHint} inputsState={inputsState[0]} correctnessSubParagraphsState={correctnessSubParagraphsState}/>}
            {activeSubmenu === 1 && <Composition1SubmenuPoint2 correctnessSubParagraphsState={correctnessSubParagraphsState}/>}
            {activeSubmenu === 2 && <Composition1SubmenuPoint3 correctnessSubParagraphsState={correctnessSubParagraphsState}/>}
        </section>
    )
}

export default Composition1