import { useState, useContext, ChangeEvent, useEffect, useRef } from 'react'
import FileFields, { NOT_SELECTED_SET, NUMBER_NEW_FILE } from '../../../Fields/FileFields';
import { GlobalData } from '../../..';
import { observer } from 'mobx-react-lite';


const Comment = ({ }) => {
    const { store, dcc } = useContext(GlobalData);
    const commentState = useState<File | null>(null);
    const setCommentFile = commentState[1];
    const selectedFileState = useState<number[]>(NOT_SELECTED_SET);
    const [selectedFiels, setSelectedFile] = selectedFileState;
    const downloadFielsState = useState<string[]>([]);
    const [downloadedFiels, setDownloadedFiels] = downloadFielsState;
    const fileNameState = useState<string>('');
    const [fileName, setFileName] = fileNameState;
    const hasMounted = useRef<boolean>(false);

    useEffect(() => {
        if (hasMounted.current) // если сброс значений выбранных файлов не вызван новым монтированием
            if (selectedFiels.length > NOT_SELECTED_SET.length)
                dcc.initial['comment'] = selectedFiels.map(numFile => downloadedFiels[numFile - NUMBER_NEW_FILE]);
            else delete dcc.initial.comment
    }, [selectedFiels])

    useEffect(() => {
        if (!hasMounted.current) {
            const selectedFileName = dcc.initial['comment'];
            if (selectedFileName && selectedFileName.length > 0) {
                store.getAllNameCommentFiels.bind(store)().then(
                    fileNameSet => {
                        const selectedNumber = selectedFileName.map(fileName => fileNameSet.indexOf(fileName) + NUMBER_NEW_FILE);
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
            const originalFileName = file.name;
            const extension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
            setCommentFile(file);
            store.uploadCommentFiles(`${fileName}.${extension}`, file).then(
                (result) => {
                    if (result) {
                        setDownloadedFiels([`${fileName}.${extension}`, ...downloadedFiels]);
                        setSelectedFile([...selectedFiels, NUMBER_NEW_FILE]);
                        setFileName('');
                    }
                }
            ).catch(
                er => store.makeErNtf('Не удачно', er)
            )
        }
    }

    return (
        <FileFields
            titleField='Комментарии'
            imgName='comment'
            handleFileInputChange={handleFileInputChange}
            fieldState={commentState}
            selectedFileState={selectedFileState}
            fileNameState={fileNameState}
            downloadFielsState={downloadFielsState}
            fetchOldFiels={store.getAllNameCommentFiels.bind(store)}
            multiSelect={true}
            authModified={true}
        />
    )
}

export default observer(Comment)