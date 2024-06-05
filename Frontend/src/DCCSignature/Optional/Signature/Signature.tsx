import { FC, useState, ChangeEvent, useContext} from 'react'
import { GlobalData } from '../../..';
import { observer } from 'mobx-react-lite';
import FileFields, { NOT_SELECTED, NUMBER_NEW_FILE } from '../../../Fields/FileFields';

interface ISignature {
    path: string[];
    nameKey?: string;
}



const Signature: FC<ISignature> = ({ path, nameKey = 'dss:Signature' }) => {
    const { store } = useContext(GlobalData);
    const signatureState = useState<File | null>(null);
    const setSignature = signatureState[1];
    const fileNameState = useState('');
    const fileName = fileNameState[0];
    const [downloadedFiels, setDownloadedFiels] = useState<string[]>([]);
    const selectedFileState = useState(NOT_SELECTED);
    const setSelectedFile = selectedFileState[1];
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.name.endsWith('.sig')) {
                setSignature(file);
                store.uploadSigFiles(fileName, file).then(
                    () => {
                        setDownloadedFiels([`${fileName}.sig`, ...downloadedFiels]);
                        setSelectedFile(NUMBER_NEW_FILE);
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
            titleField = 'Цифровая подпись'
            imgName='paperClip'
            handleFileInputChange={handleFileInputChange}
            fieldState={signatureState}
            selectedFileState={selectedFileState}
            fetchOldFiels={store.getAllNameSigFiels.bind(store)}
            fileNameState={fileNameState}
        />
    )
}

export default observer(Signature)