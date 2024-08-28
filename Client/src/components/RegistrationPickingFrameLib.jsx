import styles from '../css/RegistrationPickingLanguages.module.css'; // Importing the CSS module
import { useState } from 'react';
import ApiSkills from '../views/ApiSkills';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


const RegistrationPickingFrameLib = ({logOut, setLogin,dataApiSkills,setDataApiSkills}) => {
    const navigate = useNavigate();
    const {email} = useParams();

    const [dataApiDeveloper, setDataApiDeveloper] = useState({
        dataApiOne: {
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            id: "",
            stageOfCompletion: "",
            languages: [],
            bio: "",
            github: ""
        },
        errorApiOne: null 
    }
)

useEffect(() => {
    setDataApiDeveloper((prev)=>{return {...prev, errorApiOne: null}});
    getData();
}, [email]);

const getData = ()=>{
    const url = `http://localhost:8080/api/developers/${email}`;
    axios.get(url,
        {headers: {
            'user_token': localStorage.getItem('token')
        }}
    )
        .then((response) => {

            setDataApiDeveloper((prev)=>{return {...prev, dataApiOne: response.data}});
        })
        .catch((error) => {
            setDataApiDeveloper((prev)=>{return {...prev, errorApiOne: error}});
            setLogin(false);
            navigate('/developers');
        });
}


    const [state, setState] = useState(
        {
            languages : [],
            stageOfCompletion: 3,
            errorApiSkills: {}
        }
    );


    const addToSkills = (e) => {    
        const skill = state.languages.find(skill => skill.name === e.target.name);
        if (skill) {
            const newState = state.languages.filter(skill => skill.name !== e.target.name);
            setState((prev) => {return {...prev, languages: newState}});
        } else {
            const newSkill = dataApiSkills.skillsApiArray.find(skill => skill.name === e.target.name);
            setState((prev) => {return {...prev, languages: [...prev.languages, newSkill]}});
        }
    };


    
    const updateDeveloper = (e) => {
        e.preventDefault();
        if (state.languages.length === 0) {
            setState((prev) => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, languages: {message: 'Please select at least one framework or library'} }

            })
        );
        return;
        }
        const dataIncludinglanguages = {
            languages: [...state.languages, ...dataApiDeveloper.dataApiOne.languages],
            stageOfCompletion: state.stageOfCompletion
        }
        console.log(dataIncludinglanguages);
        const url = `http://localhost:8080/api/developers/${email}`;
        axios.put(url, dataIncludinglanguages
        , {headers: {
            'user_token': localStorage.getItem('token')
        }}
        ).then((response) => {
            localStorage.setItem("token", response.data.token);
            setState(
                {
                    languages : [],
                    stageOfCompletion: 3,
                    errorApiSkills: {}
                }
            )
            navigate('/dashboard');
        }
        ).catch((error) => {
            setDataApiSkills((prev) => { return { ...prev, errorApiSkills: error } });
            setLogin(false);
            navigate('/developers');
        });
    }

    return (
        <div>
            <div className={`${styles.cardFormDevelopers} card text-white`} style={{ width: '70rem' }}>
                <div className={`${styles.card_header} card-header`}>
                    <div className={styles.cardHeader1}>
                        <h2 style={{color:"rgb(249, 157, 194)"}}>
                            Add your skills
                        </h2>
                    </div>
                    <div className={`${styles.progress} progress bg-dark`} role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div className={`${styles.progressBar} progressbar`} style={{ width: '67%' }}>
                            67%
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBody} card-body`}>
                    <div className={styles.cardBody1}>
                        <div className={styles.cardBody1a}>
                            <h3 >Pick Your Top Frameworks and Libraries</h3>
                        </div>
                        <div className={`${styles.cardBody1b} card bg-dark`}>
                            
                            <div id={styles.added_skills}>
                                {state.languages.map((skill, index) => (
                                    <img 
                                        key={index} 
                                        src={`data:image/jpeg;base64,${skill.image}`}
                                        className={styles.icons} 
                                        alt={`${skill.name} Icon`} 
                                    />
                                ))}
                            </div>
                            
                        </div>

                    </div>
                    {state.errorApiSkills.languages && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorApiSkills.languages.message}</p>}
                    <div className={styles.cardBody2}>
                        <div id={styles.cardBody2a} className="card  bg-dark">
                            <div className={styles.cardBody2a1}>
                                {dataApiSkills.skillsApiArray.filter(skill=> skill.languageOrFramework==="framework").map((skill, index) => {
                                    return (
                                        <img src={`data:image/jpeg;base64,${skill.image}`} key={index} alt={`${skill.name} Icon` } 
                                            className={`${styles.icons} ${state.languages.find(sk => sk.name === skill.name) ? styles.shadowx : ''}`} 
                                            id={skill.name} name={skill.name} onClick={(e)=>addToSkills(e)}/> 
                                    )
                                })    
                                }
                                
                            </div>

                        </div>

                        <div className={styles.cardBody2b}>
                        <p>"Developer Seeker" serves as a centralized platform connecting employers with adept developers, refining the hiring process. User registration completion discloses language and framework competencies, enhancing job compatibility and optimizing the recruitment experience for both employers and developers.</p>
                        <p>The app benefits both developers and employers, offering a platform to showcase coding skills upon registration. This reflects the user's commitment and contributes to the platform's reliability, allowing employers to find suitable skill matches and fostering a trustworthy professional environment. By showcasing language and framework mastery, registration completion plays a vital role in a competitive job market, expediting hiring processes and facilitating precise matches for mutual benefit.</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardFooter} card-footer text-body-secondary`}>
                    <div className={styles.cardFooter1}>
                        <button className="btn btn-dark" onClick={logOut} >Skip this Step</button>
                    </div>
                    <div className={styles.cardFooter2}>
                        <button className="btn btn-dark" style={{color:"rgb(237, 208, 134)"}} onClick={e=> updateDeveloper(e)}>Almost there! Click here to finish!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPickingFrameLib;

