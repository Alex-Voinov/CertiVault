import { FC, useEffect, useState, useContext } from 'react'
import Header from '../../Components/Header/Header'
import DCCCertificate from '../../DCCSignature/Mandatory/DCCCertificate/DCCCertificate'
import styles from './GeneratorDCC.module.css'
import Navigation from '../../Components/Navigation/Navigation'
import { GlobalData } from '../..'


const GeneratorDCC: FC = () => {
    const [activeStep, setActiveStep] = useState(<div />);
    const { store } = useContext(GlobalData);
    const toStep = (stepName: string, stepElement: JSX.Element) => {
        store.addNavigatePoint(stepName, stepElement)
        setActiveStep(stepElement);
    }
    useEffect(() => {
        store.setupNewPositionMap(setActiveStep, <DCCCertificate toStep={toStep} />);
        setActiveStep(<DCCCertificate toStep={toStep} />);
    }, [])
    return (
        <section className={styles.wrapper}>
            <Header />
            {activeStep}
            <Navigation />
        </section>
    )
}

export default GeneratorDCC