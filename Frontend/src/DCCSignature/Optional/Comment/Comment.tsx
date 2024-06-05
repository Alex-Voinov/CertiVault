import { FC, useState, useContext, ChangeEvent } from 'react'
import FileFields, { NOT_SELECTED, NUMBER_NEW_FILE } from '../../../Fields/FileFields';
import { GlobalData } from '../../..';
import { observer } from 'mobx-react-lite';


interface IComment {
    path: string[];
}

const Comment: FC<IComment> = ({ path }) => {
    const { store } = useContext(GlobalData);
    const commentState = useState<File | null>(null);
    const setCommentFile = commentState[1];
    const selectedFileState = useState<number>(NOT_SELECTED);
    const setSelectedFile = selectedFileState[1];
    const downloadFielsState = useState<string[]>([]);
    const [downloadedFiels, setDownloadedFiels] = downloadFielsState;
    const fileNameState = useState<string>('');
    const fileName = fileNameState[0];


    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setCommentFile(file);
            store.uploadCommentFiles(fileName, file).then(
                () => {
                    setDownloadedFiels([fileName, ...downloadedFiels]);
                    setSelectedFile(NUMBER_NEW_FILE);
                }
            ).catch(
                er => store.makeErNtf('Не удачно', er)
            )
            //store.setValueByPath(path, nameKey, '123');
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
        />
    )
}

export default observer(Comment)