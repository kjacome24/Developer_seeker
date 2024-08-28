import styles from '../css/RegistrationPickingLanguages.module.css'; // Importing the CSS module
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const RegistrationFinal = ({setDataApiDevelopers}) => {
    const { email } = useParams();
    const navigate = useNavigate();
    
    const updateDeveloper = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8080/api/developers/${email}`;
            const response = await axios.put(url, { stageOfCompletion: 4 }, {
                headers: {
                    'user_token': localStorage.getItem('token')
                }
            });
    
            console.log("Vamos a ver que trae el response");
            console.log(response.data);
    
            setDataApiDevelopers((previous) => {
                return {
                    ...previous,
                    developersApiArray: previous.developersApiArray.map(dev => 
                        dev.email === response.data.developerUpdated.email
                        ? response.data.developerUpdated
                        : dev
                    )
                };
            });
    
            localStorage.setItem("token", response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <div>
            <div className={`${styles.cardFormDevelopers} card text-white`} style={{ width: '70rem' }}>
                <div className={`${styles.card_header} card-header`}>
                    <div className={styles.cardHeader1}>
                        <h2 style={{color:"green"}}>
                        Your Skills were added!!
                        </h2>
                    </div>
                    <div className={`${styles.progress} progress bg-dark`} role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div className={`${styles.progressBar} progressbar`} style={{ width: '100%' }}>
                            100%
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBody} card-body`}>
                    <p>Congratulations developer, you are doing great! Your profile was succesfully created and now you are in the right path to match up with your future employer!!!!!</p>
                </div>
                <div className={`${styles.cardFooter} card-footer text-body-secondary`}>
                    <div className={styles.cardFooter2}>
                        <button className="btn btn-dark" style={{color:"green"}} onClick={e=> updateDeveloper(e)}>You are finally done, click here to go to the dashboard!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationFinal;

