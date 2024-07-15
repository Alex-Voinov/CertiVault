import { FC, useContext } from 'react'
import styles from './TransitionFields.module.css'
import { GlobalData } from '..';


interface ITransitionFields {
    title: string;
    content: string[];
    imageName: string;
    toField: JSX.Element;
    pliteWidth?: string;
    isOptional?: boolean;
}

const TransitionFields: FC<ITransitionFields> = (
    {
        title,
        imageName,
        content,
        toField,
        pliteWidth = '20.3125vw',
        isOptional = false,
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
            <h1>{title}</h1>
            <img src={`/img/svg/${imageName}.svg`} alt="field-logo" />
        </section>
    )
}

export default TransitionFields