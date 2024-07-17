import { FC, useState, useRef } from 'react'
import styles from './TextFields.module.css'
import { AnimatePresence, motion } from 'framer-motion';


interface ITextFields {
    title: string;
    imageName: string;
    description: string;
    example: string;
    isOptional?: boolean;
    pliteWidth?: string;
    imageMarginRight?: string;
    imageSide?: string;
    contentHeight?: string;
    contentWidth?: string;
}

const TextFields: FC<ITextFields> = (
    {
        title,
        imageName,
        description,
        example,
        isOptional = false,
        pliteWidth = '20.3125vw',
        imageMarginRight = 'min(1.04167vw, 1.85185vh)',
        imageSide = '8.02083vw',
        contentHeight = '28vh',
        contentWidth = '9.375vw',
    }
) => {
    const [hasFocus, setFocus] = useState(false);
    const inputRef = useRef<null | HTMLInputElement>(null);
    return (
        <div
            onClick={() => {
                if (!hasFocus)
                    setTimeout(() => inputRef.current?.focus(), 1)
                setFocus(!hasFocus);
            }}
            className={
                `${styles.skin}  ${isOptional
                    ? styles.optional
                    : styles.mandatory
                } ${hasFocus
                    ? styles.hasFocus
                    : ''
                }`

            }
            style={{
                width: pliteWidth
            }}
        >
            <h1>{title}</h1>
            <AnimatePresence>
                {hasFocus && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.content}
                    style={{
                        height: contentHeight,
                        width: contentWidth
                    }}
                >
                    <p>{description}</p>
                    <input type="text" ref={inputRef} />
                    <p>Пример ввода: {example}.</p>
                </motion.div>}
            </AnimatePresence>
            <div
                className={styles.animatedLine}
                style={{
                    height: contentHeight,
                    opacity: hasFocus ? 1 : ''
                }}
            />
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