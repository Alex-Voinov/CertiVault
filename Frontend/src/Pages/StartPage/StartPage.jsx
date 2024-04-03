import React, { useState } from 'react'
import styles from './StartPage.module.css'
import { Link } from 'react-router-dom';

const StartPage = () => {
    const [isActiveTools, setActiveTools] = useState(false);
    const [isActiveRepository, setActiveRepository] = useState(false);
    return (
        <section className={styles.wrapper}>
            <header className={styles.mainHeader}>
                <h1>DCC CERTIFICATE</h1>
                <div className={styles.hamburger}>
                    <div />
                    <div />
                    <div />
                </div>
            </header>
            <main className={styles.mainContent}>
                <section
                    className={styles.widget}
                    onMouseEnter={() => { setActiveTools(true) }}
                    onMouseLeave={() => { setActiveTools(false) }}
                >
                    <h1 style={{
                        top: !isActiveTools ? '25%' : '',
                        left: !isActiveTools ? 'calc(50% - 1.15em)' : '',
                        fontSize: !isActiveTools ? 'min(5vw, 8.88888vh)' : '',
                    }}>Tools</h1>
                    <div>
                        <div className={styles.hLine} style={{ opacity: !isActiveTools ? '0' : '' }} />
                        <div className={styles.option} style={{ opacity: !isActiveTools ? '0' : '' }}>
                            <h1>Uploading</h1>
                            <img src="img/svg/uploading.svg" alt="uploading icon" />
                        </div>
                        <div className={styles.option} style={{ opacity: !isActiveTools ? '0' : '' }}>
                            <h1>Importing</h1>
                            <img src="img/svg/importing.svg" alt="importing icon" />
                        </div>
                        <div className={styles.option} style={{ opacity: !isActiveTools ? '0' : '' }}>
                            <h1>Exporting</h1>
                            <img src="img/svg/exporting.svg" alt="exporting icon" />
                        </div>
                        <img
                            src="img/svg/tools.svg"
                            alt="tools"
                            className={styles.widgetIcon}
                            style={{
                                right: !isActiveTools ? 'calc(50% - var(--val) / 2)' : '',
                                bottom: !isActiveTools ? 'calc(40% - var(--val) / 2)' : '',
                            }}
                        />
                    </div>
                </section>
                <section
                    onMouseEnter={() => { setActiveRepository(true) }}
                    onMouseLeave={() => { setActiveRepository(false) }}
                    className={styles.widget}
                >
                    <h1 style={{
                        top: !isActiveRepository ? '25%' : '',
                        left: !isActiveRepository ? 'calc(50% - 2em)' : '',
                        fontSize: !isActiveRepository ? 'min(5vw, 8.88888vh)' : '',
                    }}>Repository</h1>
                    <div>
                        <div className={styles.hLine}></div>
                        <Link to="/repository">
                            <div className={styles.option} style={{ opacity: !isActiveRepository ? '0' : '' }}>
                                <h1>Open</h1>
                                <img src="img/svg/door.svg" alt="uploading icon" />
                            </div>
                        </Link>
                        <div className={styles.option} style={{ opacity: !isActiveRepository ? '0' : '' }}>
                            <h1>Create</h1>
                            <img src="img/svg/create.svg" alt="importing icon" />
                        </div>
                        <img
                            src="img/svg/db.svg"
                            alt="repositoriy"
                            className={styles.widgetIcon}
                            style={{
                                right: !isActiveRepository ? 'calc(50% - var(--val) / 2)' : '',
                                bottom: !isActiveRepository ? 'calc(40% - var(--val) / 2)' : '',
                            }}
                        />
                    </div>
                </section>
            </main>
        </section>
    )
}

export default StartPage