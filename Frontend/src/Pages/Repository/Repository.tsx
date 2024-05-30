import { FC } from 'react'
import RepositoryTable from './RepositoryTable/RepositoryTable';
import styles from './Repository.module.css';
import Header from '../../Components/Header/Header';

const Repository: FC = () => {
    return (
        <section className={styles.wrapper}>
            <Header wrapperStyles={{ backgroundColor: 'transparent' }} visibleModalGround={false}/>
            <section className={styles.tabletWrapper}>
                <RepositoryTable />
            </section>
            <img src="/img/svg/tile.svg" alt="tile-background" className={`${styles.tile} ${styles.leftTile}`} />
            <img src="/img/svg/tile.svg" alt="tile-background" className={`${styles.tile} ${styles.rightTile}`} />
        </section>
    )
}

export default Repository;