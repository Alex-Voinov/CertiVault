import { FC, useState, ChangeEvent, useContext } from 'react'
import { GlobalData } from '../../..';


interface ISignature {
    path: string[];
    nameKey?: string;
}

const Signature: FC<ISignature> = ({ path, nameKey = 'ds:Signature' }) => {
    const { store } = useContext(GlobalData);
    const [signature, setSignature] = useState<File | null>(null);
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSignature(file);
            store.downloadSigFiles('name1', file)
            store.setValueByPath(path, nameKey, '123');
        }
    };

    return (
        <>
            <h1>Цифровая подпись</h1>
            <input type="file" onChange={handleFileInputChange} />
        </>
    )
}

export default Signature