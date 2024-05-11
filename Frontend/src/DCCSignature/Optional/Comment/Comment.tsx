import { FC } from 'react'

interface IComment{
    path: string[];
}

const Comment: FC<IComment> = ({path}) => {
    return (
        <div>Comment</div>
    )
}

export default Comment