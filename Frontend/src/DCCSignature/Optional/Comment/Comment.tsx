import { FC, useState, useContext, ChangeEvent } from 'react'
import FileFields, { NOT_SELECTED } from '../../../Fields/FileFields';
import { GlobalData } from '../../..';
import { observer } from 'mobx-react-lite';


interface IComment {
    path: string[];
}

const Comment: FC<IComment> = ({ path }) => {
    const { store } = useContext(GlobalData);
    const fieldState = useState<File | null>(null);
    const selectedFileState = useState<number>(NOT_SELECTED);
    const fileNameState = useState<string>('');

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => { }

    return (
        <FileFields
            titleField='Комментарии'
            imgName='comment'
            handleFileInputChange={handleFileInputChange}
            fieldState={fieldState}
            selectedFileState={selectedFileState}
            fileNameState={fileNameState}
            fetchOldFiels={store.getAllNameCommentFiels.bind(store)}
        />
    )
}

export default observer(Comment)