import { FC, useState, ChangeEvent, useContext, useRef } from 'react'
import { GlobalData } from '../../..';
import styles from './Signature.module.css'

interface ISignature {
    path: string[];
    nameKey?: string;
}

const Signature: FC<ISignature> = ({ path, nameKey = 'ds:Signature' }) => {
    const { store } = useContext(GlobalData);
    const [signature, setSignature] = useState<File | null>(null);
    const [isActive, setActive] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSignature(file);
            store.downloadSigFiles('name1', file)
            store.setValueByPath(path, nameKey, '123');
        }
    };

    return (
        <section className={styles.wrapper} onClick={
            () => {
                setActive(!isActive);
            }
        }>
            <h1 className={styles.title}>
                Цифровая подпись
            </h1>
            <div className={styles.interactionBlock}>
                <div className={styles.fileNameWrapper}
                    style={
                        isActive
                            ? {
                                width: '13.02083vw',
                                backgroundColor: '#D9E5F0'
                            }
                            : {
                                borderRightColor: 'transparent'
                            }
                    }
                >
                    <input
                        type="text"
                        value={fileName}
                        placeholder='Введите имя файла'
                        onClick={e => e.stopPropagation()}
                        onChange={
                            (e) => {
                                setFileName(e.target.value);
                            }
                        }
                    />
                    <img
                        src="/img/svg/paperClip.svg"
                        alt="upload"
                        onClick={
                            e => {
                                e.stopPropagation();
                                if (fileName)
                                    fileInputRef.current?.click();
                                else store.setNotification(
                                    'Пожалуйста',
                                    'Введите название файла до его загрузки.'
                                )
                            }
                        }
                        style={{
                            cursor: fileName ? 'pointer' : 'not-allowed'
                        }}
                    />
                </div>

                <input
                    onClick={e => e.stopPropagation()}
                    type="file"
                    className={styles.fileData}
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                />
            </div>
            <img
                src="/img/svg/signatureFileLogo.svg"
                alt="signature logo"
                className={styles.signatureLogo}
            />
            <div className={styles.nextStep}>
                <h2>{isActive ? 'Сохранить' : 'Заполнить'}</h2>
                <img src="/img/svg/bluePointerTransition.svg" alt="next" />
            </div>
        </section>
    )
}

export default Signature