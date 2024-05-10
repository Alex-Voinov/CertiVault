import { FC } from 'react'
import styles from './WidgetPanel.module.css'
import { Link } from 'react-router-dom'


const widgetItems = [
    'info',
    'questions',
    'options',
    'personalAccount',
];

const amountWidgetItems = widgetItems.length;

interface IWidgetPanel {
    side: string,
    gap: string
}

const WidgetPanel: FC<IWidgetPanel> = ({ side, gap }) => {
    const widgets = widgetItems.map(widgetName => <Link to={`/${widgetName}/`} style={{ overflow: 'visible' }}>
        <div className={styles.widget} style={{ width: side, height: side }}>
            <img src={`/img/svg/${widgetName}.svg`} alt={`${widgetName} widget`} />
        </div>
    </Link>)
    return (
        <section className={styles.skin} style={{ width: `calc(${amountWidgetItems} * ${side} + ${gap} * (${amountWidgetItems} - 1))` }}>
            {widgets}
        </section>
    )
}

export default WidgetPanel