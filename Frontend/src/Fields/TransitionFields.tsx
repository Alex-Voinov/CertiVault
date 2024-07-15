import { FC, useContext } from 'react'
import styles from './TransitionFields.module.css'
import { GlobalData } from '..';


interface ITransitionFields {
    title: string;
    content: string[];
    imageName: string;
    toField: JSX.Element;
    pliteWidth?: string;
    maxWidthTitle?: string;
    imageMarginRight?: string;
    imageSide?: string;
    contentHeight?: string;
    isOptional?: boolean;
}

const TransitionFields: FC<ITransitionFields> = (
    {
        title,
        imageName,
        content,
        toField,
        pliteWidth = '20.3125vw',
        maxWidthTitle = '18.22917vw',
        imageMarginRight = 'min(1.04167vw, 1.85185vh)',
        isOptional = false,
        imageSide = '8.02083vw',
        contentHeight = '28vh',
    }
) => {
    const { store } = useContext(GlobalData);
    return (
        <section
            onClick={() => {
                store.navigateNewPoint(
                    title,
                    toField
                );
            }}
            className={`
                ${styles.skin}
                 ${isOptional
                    ? styles.optional
                    : styles.mandatory
                }
                 `}
            style={{
                width: pliteWidth,
            }}
        >
            <h1
                style={{
                    maxWidth: maxWidthTitle,
                }}
            >
                {title}
            </h1>
            <div
                className={styles.contentMap}
                style={{
                    height: contentHeight
                }}
            >
                {content.map(
                    namePoint => <h2>
                        {namePoint}
                    </h2>)
                }
            </div>
            <div
                className={styles.animatedLine}
                style={{
                    height: contentHeight
                }}
            />
            <img
                src={`/img/svg/${imageName}.svg`}
                alt="field-logo"
                style={{
                    right: imageMarginRight,
                    width: imageSide,
                }}
            />
            <div className={styles.nextStep}>
                <h1>Открыть</h1>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6155 0.833008H9.33264L13.9946 9.29455L14.3831 9.99967L13.9946 10.7048L9.33264 19.1663H11.6155L16.2775 10.7048L16.666 9.99967L16.2775 9.29455L11.6155 0.833008Z"  />
                    <path d="M6.28283 0.833008H4L8.662 9.29455L9.0505 9.99967L8.662 10.7048L4 19.1663H6.28283L10.9448 10.7048L11.3333 9.99967L10.9448 9.29455L6.28283 0.833008Z"/>
                </svg>
            </div>
        </section>
    )
}

export default TransitionFields