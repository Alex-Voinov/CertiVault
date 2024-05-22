import { FC, useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import DCCCertificate from '../../DCCSignature/Mandatory/DCCCertificate/DCCCertificate'
import styles from './GeneratorDCC.module.css'

const GeneratorDCC: FC = () => {
    const [activeStep, setActiveStep] = useState(<div />);
    useEffect(() => {
        setActiveStep(<DCCCertificate toStep={setActiveStep} />);
    }, [])
    return (
        <section className={styles.wrapper}>
            <Header />
            {activeStep}
        </section>
    )
}

export default GeneratorDCC