import { FC } from 'react'
import { useLocation } from 'react-router-dom';

const SEmailConfirmation: FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const surName = searchParams.get('surName');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const correctness = name && surName && accessToken && refreshToken;
    return (
        <div>{`${name}, ${surName}, ${accessToken}, ${refreshToken}`}</div>
    )
}

export default SEmailConfirmation