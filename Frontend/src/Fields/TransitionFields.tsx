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
            <img
                src={`/img/svg/${imageName}.svg`}
                alt="field-logo"
                style={{
                    right: imageMarginRight,
                    width: imageSide,
                }}
            />
        </section>
    )
}

export default TransitionFields