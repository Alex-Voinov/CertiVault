import React from 'react'
import styles from './StartPage.module.css'
const StartPage = () => {
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
                <section className={styles.widget}>
                    <h1>Tools</h1>
                    <div>
                        <div className={styles.hLine} />
                        <div className={styles.option}>
                            <h1>Uploading</h1>
                            <img src="img/svg/uploading.svg" alt="uploading icon" />
                        </div>
                        <div className={styles.option}>
                            <h1>Importing</h1>
                            <img src="img/svg/importing.svg" alt="importing icon" />
                        </div>
                        <div className={styles.option}>
                            <h1>Exporting</h1>
                            <img src="img/svg/exporting.svg" alt="exporting icon" />
                        </div>
                        <img src="img/svg/tools.svg" alt="tools" className={styles.widgetIcon} />
                    </div>
                </section>
                <section className={styles.widget}>
                    <h1>Repository</h1>
                    <div>
                        <div className={styles.hLine}></div>
                        <img src="img/svg/db.svg" alt="repositoriy" className={styles.widgetIcon} />
                    </div>
                </section>
            </main>
        </section>
    )
}

export default StartPage