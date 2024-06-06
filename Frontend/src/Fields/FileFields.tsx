import { FC, useState, ChangeEvent, useContext, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { GlobalData } from '..';
import styles from './FileFields.module.css'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

interface ISignature {
    titleField: string;
    imgName: string;
    handleFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    fieldState: [File | null, Dispatch<SetStateAction<File | null>>];
    selectedFileState: [number, Dispatch<SetStateAction<number>>];
    fileNameState: [string, React.Dispatch<React.SetStateAction<string>>];
    downloadFielsState: [string[], Dispatch<SetStateAction<string[]>>];
    fetchOldFiels: () => Promise<string[]>;
}

export const NOT_SELECTED = 0;
export const NUMBER_NEW_FILE = 1;

const FileFields: FC<ISignature> = ({
    titleField,
    imgName,
    handleFileInputChange,
    fieldState,
    selectedFileState,
    fetchOldFiels,
    fileNameState,
    downloadFielsState
}) => {
    const { store } = useContext(GlobalData);
    const [signature, setSignature] = fieldState;
    const [isActive, setActive] = useState(false);
    const [fileName, setFileName] = fileNameState;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [downloadedFiels, setDownloadedFiels] = downloadFielsState;
    const [selectedFile, setSelectedFile] = selectedFileState;
    useEffect(() => {
        if (store.isAuth) {
            const nameReq = fetchOldFiels();
            nameReq.then(
                names => setDownloadedFiels(names)
            )
        }
    }, [store.isAuth])

    return (
        <section
            key={titleField}
            className={styles.wrapper}
            onClick={
                () => {
                    if (!(isActive && fileName && !signature)) setActive(!isActive)
                    else store.setNotification(
                        'Данные не сохранены',
                        'Вы задали имя, но не прикрепили файл. Нажмите на скрепку и выбирите файл.'
                    )
                }
            }
        >
            <h1 className={styles.title}>
                {titleField}
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
                        src='/img/svg/paperClip.svg'
                        alt="upload"
                        onClick={
                            e => {
                                e.stopPropagation();
                                if (fileName)
                                    if (
                                        !downloadedFiels.map(
                                            fileWithExtensions => fileWithExtensions.substring(0, fileWithExtensions.lastIndexOf('.'))
                                        ).includes(fileName)
                                    )
                                        fileInputRef.current?.click();
                                    else store.setNotification(
                                        'Пожалуйста',
                                        'Введите уникальное имя для файла.'
                                    )
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
                                (fName, number) => <div
                                    className={styles.filesBarRow}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedFile(number + NUMBER_NEW_FILE);
                                    }}
                                >
                                    <h2>{fName}</h2>
                                    {
                                        number === selectedFile - NUMBER_NEW_FILE
                                            ? <img src="/img/svg/selectedFileLogo.svg" alt="selected file" />
                                            : <img src="/img/svg/oldFileLogo.svg" alt="old file" />
                                    }
                                </div>
                            )}
                        </div>
                        : store.isAuth
                            ? <div className={styles.setOldFiels}>
                                <p>{store.user.name}, тут будут отображаться все ранее загруженные вами файлы</p>
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
                src={`/img/svg/${imgName}.svg`}
                alt="signature logo"
                className={styles.signatureLogo}
            />
            <div className={styles.nextStep}>
                <h2>{isActive ? 'Сохранить' : 'Заполнить'}</h2>
                <img src="/img/svg/bluePointerTransition.svg" alt="next" />
            </div>
            {Boolean(selectedFile) && <img
                src="/img/svg/selectedFileLogo.svg"
                alt="correct"
                className={styles.correctnessStatus}
            />}
        </section>
    )
}

export default observer(FileFields)