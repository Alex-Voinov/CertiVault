import { useState, ChangeEvent, useContext, useEffect, useRef } from 'react'
import { GlobalData } from '../../..';
import { observer } from 'mobx-react-lite';
import FileFields, { NOT_SELECTED, NUMBER_NEW_FILE } from '../../../Fields/FileFields';


const Signature = () => {
    const { store, dcc } = useContext(GlobalData);
    const signatureState = useState<File | null>(null);
    const setSignature = signatureState[1];
    const fileNameState = useState('');
    const [fileName, setFileName] = fileNameState;
    const downloadFielsState = useState<string[]>([]);
    const [downloadedFiels, setDownloadedFiels] = downloadFielsState;
    const selectedFileState = useState(NOT_SELECTED);
    const [selectedFile, setSelectedFile] = selectedFileState;
    const hasMounted = useRef<boolean>(false);
    useEffect(() => {
        if (hasMounted.current)
            if (selectedFile !== NOT_SELECTED) dcc.initial['sig'] = downloadedFiels[selectedFile - NUMBER_NEW_FILE];
            else delete dcc.initial.sig
    }, [selectedFile])

    useEffect(() => {
        if (!hasMounted.current) {
            const selectedFileName = dcc.initial['sig'];
            if (selectedFileName && selectedFileName.length > 0) {
                store.getAllNameSigFiels.bind(store)().then(
                    fileNameSet => {
                        const selectedNumber = fileNameSet.indexOf(selectedFileName) + NUMBER_NEW_FILE;
                        setSelectedFile(selectedNumber);
                    }
                );
            }
        }
        hasMounted.current = true;
    }, [])

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.name.endsWith('.sig')) {
                setSignature(file);
                store.uploadSigFiles(fileName, file).then(
                    (result) => {
                        if (result) {
                            setDownloadedFiels([`${fileName}.sig`, ...downloadedFiels]);
                            setSelectedFile(NUMBER_NEW_FILE);
                            setFileName('');
                        }
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
        <FileFields
            titleField='Цифровая подпись'
            imgName='signatureFileLogo'
            handleFileInputChange={handleFileInputChange}
            fieldState={signatureState}
            selectedFileState={selectedFileState}
            fetchOldFiels={store.getAllNameSigFiels.bind(store)}
            fileNameState={fileNameState}
            downloadFielsState={downloadFielsState}
        />
    )
}

export default observer(Signature)