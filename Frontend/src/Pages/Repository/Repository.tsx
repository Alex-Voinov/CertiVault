import {FC} from 'react'
import WidgetPanel from '../../Components/WidgetPanel/WidgetPanel';
import RepositoryTable from './RepositoryTable/RepositoryTable';
import styles from './Repository.module.css';

const Repository: FC = () => {
    return (
        <section className={styles.skin}>
            <header className={styles.skin__header}>
                <h1>DCC CERTIFICATE</h1>
                <WidgetPanel side='min(2.5vw, 4.44444vh)' gap='1.30208vw' />
            </header>
            <RepositoryTable />
        </section>
    )
}

export default Repository;