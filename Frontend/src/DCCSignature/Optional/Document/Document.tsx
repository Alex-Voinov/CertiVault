import { FC } from 'react'

interface IDocument {
    path: string[];
}

const Document: FC<IDocument> = ({ path }) => {
    return (
        <div>Document</div>
    )
}

export default Document