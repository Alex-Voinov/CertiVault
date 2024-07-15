import { FC } from 'react'
import styles from './TextFields.module.css'

interface ITextFields {
    title: string;
    imageName: string;
    isOptional?: boolean;
    pliteWidth?: string;
    imageMarginRight?: string;
    imageSide?: string;
}

const TextFields: FC<ITextFields> = (
    {
        title,
        imageName,
        isOptional = false,
        pliteWidth = '20.3125vw',
        imageMarginRight = 'min(1.04167vw, 1.85185vh)',
        imageSide = '8.02083vw',
    }
) => {
    return (
        <div
            className={
                `${styles.skin}  ${isOptional
                    ? styles.optional
                    : styles.mandatory
                }`

            }
            style={{
                width: pliteWidth
            }}
        >
            <h1>{title}</h1>
            <img
                src={`/img/svg/${imageName}.svg`}
                alt={`${title}-logo`}
                style={{
                    right: imageMarginRight,
                    width: imageSide,
                }}
            />
        </div>
    )
}

export default TextFields