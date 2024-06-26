import { FC } from 'react'
import styles from './WidgetPanelVertical.module.css'
import { Link } from 'react-router-dom'
const widgetSet = [
    'find',
    'create',
    'information',
    'question',
]

interface IWidgetPanelVertical {
    side: string,
    gap: string
}

const WidgetPanelVertical: FC<IWidgetPanelVertical> = ({ side, gap }) => {
    const widgets = widgetSet.map(widgetName => {
        return <Link to={`/repository/${widgetName}/`} style={{ overflow: 'visible' }}>
            <div className={styles.widget} style={{ width: side, height: side, marginBottom: gap }}>
                <img src={`/img/svg/vertical-panel-${widgetName}-logo.svg`} alt={`widget ${widgetName}`} />
            </div>
        </Link>
    })
    return (
        <section className={styles.skin}>
            {widgets}
        </section>
    )
}

export default WidgetPanelVertical