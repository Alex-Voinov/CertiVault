import { FC, useState, ChangeEvent, useContext, useRef, useEffect } from 'react'
import { GlobalData } from '../../..';
import styles from './Signature.module.css'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

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
    const [downloadedFiels, setDownloadedFiels] = useState<string[]>([]);
    useEffect(() => {
        if (store.isAuth) {
            const nameReq = store.getAllNameSigFiels();
            nameReq.then(
                names => setDownloadedFiels(names)
            )
        }
    }, [store.isAuth])
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.name.endsWith('.sig')) {
                setSignature(file);
                store.uploadSigFiles(fileName, file).then(
                    () => {
                        setDownloadedFiels([`${fileName}.sig`, ...downloadedFiels ])
                    }
                ).catch(
                    er => store.makeErNtf('Не удачно', er)
                )
                //store.setValueByPath(path, nameKey, '123');
            }
            else store.setNotification(
                'Недопустимый файл',
                'Поддерживаемый формат ввода: .sig'
            )
        }
    };

    return (
        <section className={styles.wrapper} onClick={
            () => {
                if (!(isActive && fileName && !signature)) setActive(!isActive)
                else store.setNotification(
                    'Данные не сохранены',
                    'Вы задали имя, но не прикрепили файл. Нажмите на скрепку и выбирите файл.'
                )
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
                                if (/^[a-zA-Z0-9_]{0,20}$/.test(e.target.value))
                                    setFileName(e.target.value);
                                else store.setNotification(
                                    'Недопустимое имя',
                                    'Введите до 20 латинских букв, цифр или _.',
                                )
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
                <div
                    className={styles.oldFiels}
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
                    {downloadedFiels.length > 0
                        ? <div className={styles.filesBar}>
                            {downloadedFiels.map(
                                fName => <div className={styles.filesBarRow}>
                                    <h2>{fName}</h2>
                                    <img src="/img/svg/oldFileLogo.svg" alt="old file" />
                                </div>
                            )}
                        </div>
                        : store.isAuth
                            ? <div className={styles.setOldFiels}>
                                OP
                            </div>
                            : <div className={styles.unAuth}>
                                <p>
                                    <Link to='/authorization/'>
                                        Авторизуйтесь
                                    </Link>, чтобы иметь доступ к ранее загруженным файлам.
                                </p>
                            </div>
                    }
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

export default observer(Signature)