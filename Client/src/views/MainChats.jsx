import styles from '../css/FormDevelopers.module.css';
import { useState } from 'react';
import FormLoginDev from '../components/FormLoginDev';
import FormRegisterDevs from '../components/FormRegisterDevs';


const FormDevelopers = ({dataCountries,setLogin,setToken}) => {
    const [showForm, setShowform] = useState(false);

    return(
        <div>
            <div className={`${styles.cardFormDevelopers} card text-white`} style={{ width: "70rem" }}>
            </div>
        </div>
    );
}

export default FormDevelopers;