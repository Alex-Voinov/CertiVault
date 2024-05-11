import { FC, useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import DCCCertificate from '../../DCCSignature/Mandatory/DCCCertificate/DCCCertificate'


const GeneratorDCC: FC = () => {
    const [activeStep, setActiveStep] = useState(<div />);
    useEffect(() => {
        setActiveStep(<DCCCertificate toStep={setActiveStep} />);
    }, [])
    return (
        <>
            <Header />
            {activeStep}
        </>
    )
}

export default GeneratorDCC