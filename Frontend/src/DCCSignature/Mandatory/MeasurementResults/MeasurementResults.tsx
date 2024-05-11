import { FC } from 'react'

interface IMeasurementResults {
    path: string[];
}

const MeasurementResults: FC<IMeasurementResults> = ({ path }) => {
    return (
        <div>MeasurementResults</div>
    )
}

export default MeasurementResults