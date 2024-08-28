import styles from '../css/FormDevelopers.module.css';
import { useState } from 'react';
import FormLoginDev from '../components/FormLoginDev';
import FormRegisterDevs from '../components/FormRegisterDevs';


const FormDevelopers = ({dataCountries,setLogin,setToken}) => {
    const [showForm, setShowform] = useState(false);

    return(
        <div>
            <div className={`${styles.cardFormDevelopers} card text-white`} style={{ width: "70rem" }}>
                <FormLoginDev setLogin={setLogin}/>
                <p>If you are new in the page please click on the register button and you will be invited to submit your details and create your profile.</p>
                <button className='btn btn-dark' onClick={() => setShowform(!showForm)}>
                    {showForm ? "Already registered" : "Not registered? Click here to register"}
                </button>
                {showForm && <FormRegisterDevs dataCountries={dataCountries} setLogin={setLogin} setToken={setToken}/>} 
            </div>
        </div>
    );
}

export default FormDevelopers;