import { useState } from 'react'
import styles from './RepositoryTable.module.css'
import WidgetPanelVertical from '../../../Components/WidgetPanelVertical/WidgetPanelVertical';

const category = [
    'Номер сертификата',
    'Организация',
    'Дата каллибровки',
    'Средства измерений',
    'Номер СИ'
]

const amountColumn = category.length;

const amountRow = 20;

const RepositoryTable = () => {
    const [isActiveColumn, setActiveColumn] = useState(-1);
    const [isActiveRow, setActiveRow] = useState(-1);
    const titleCategory = category.map(categoryText => <div
        className={styles.category}
        style={{ width: `calc(100% / ${amountColumn})` }}
    >
        {categoryText}
    </div>)
    const mainContent = []
    for (let i = 0; i < amountRow; ++i) {
        const rowContent = [];
        for (let j = 0; j < amountColumn; ++j) {
            const tabletElement = <>
                <div
                    className={styles.tabletElement}
                    style={{
                        width: `calc( 83.33333vw / ${amountColumn}${j === amountColumn - 1 ? ' - 0.625vw' : ''}`,
                        backgroundColor: isActiveRow === i && isActiveColumn === j ? 'rgba(178, 207, 220,0.5)' : isActiveRow === i || isActiveColumn === j ? 'rgba(204, 222, 230, 0.40)' : '',
                    }}
                    onMouseEnter={() => {
                        setActiveColumn(j);
                        setActiveRow(i)
                    }}
                >

                </div>
                {j !== amountColumn - 1 && <div
                    className={styles.hLine}
                    style={{
                        height: isActiveRow === i ? '100%' : ''
                    }}
                />}
            </>
            rowContent.push(tabletElement)
        }
        const vLineElements = [];
        for (let j = 0; j < amountColumn; ++j) {
            const vLineDiv = <div className={styles.vLine}
                style={{
                    width: `calc( ${(i === isActiveRow || i === (isActiveRow - 1)) ? 83.33333 : 80}vw / ${amountColumn}${j === amountColumn - 1 ? ' - 0.625vw' : ''}`
                }}
            />


            vLineElements.push(vLineDiv)
        }
        const row = <> <div className={styles.tabletRow}>
            {rowContent}
        </div>
            {i !== amountRow - 1 && <div className={styles.vLines}>
                {vLineElements}
            </div>}
        </>
        mainContent.push(row);
    }
    return (
        <section className={styles.skin}>
            <section className={styles.wrapperTablet} onMouseLeave={() => {
                setActiveColumn(-1);
                setActiveRow(-1)
            }}>
                <section className={styles.title}>
                    {titleCategory}
                </section>
                <main className={styles.mainContent}>
                    <div className={styles.scrollable}>
                        {mainContent}
                    </div>
                </main>
            </section>
            <WidgetPanelVertical side='min(4.16667vw, 7.40741vh)' gap='1.85185vh' />
        </section>
    )
}

export default RepositoryTable