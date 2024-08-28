import styles from '../css/RegistrationPickingLanguages.module.css'; // Importing the CSS module
import { useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const RegistrationPickingLanguages = ({logOut, setLogin, dataApiSkills,setDataApiSkills}) => {
    const navigate = useNavigate();
    const {email} = useParams();
    const [state, setState] = useState(
        {
            languages : [],
            bio: '',
            github: '',
            stageOfCompletion: 2,
            errorApiSkills: {}
        }
    );
    console.log(state.errorApiSkills.languages);


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

    const updateState = (e) => {
        const { name, value } = e.target;
        setState((prev) => {return {...prev, [name]: value}});
    };
    
    const updateDeveloper = (e) => {
        e.preventDefault();
        if (state.languages.length === 0) {
            setState((prev) => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, languages: {message: 'Please select at least one language'} }
            }));
        }
        if (!state.bio) {
            setState((prev) => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, bio: {message: 'Please complete your bio'} }
            }));
        }
        if (!state.github) {
            setState((prev) => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, github: {message: 'Please complete your github'} }
            }));
        }
        if (state.languages.length === 0 || !state.bio || !state.github) {
            return;
        }
        const url = `http://localhost:8080/api/developers/${email}`;
        axios.put(url, state
        , {headers: {
            'user_token': localStorage.getItem('token')
        }}
        ).then((response) => {
            localStorage.setItem("token", response.data.token);
            setState(
                {
                    languages : [],
                    bio: '',
                    github: '',
                    stageOfCompletion: 2,
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
                        <div className={`${styles.progressBar} progressbar`} style={{ width: '33%' }}>
                            33%
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBody} card-body`}>
                    <div className={styles.cardBody1}>
                        <div className={styles.cardBody1a}>
                            <h3 >Pick Your Languages</h3>
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
                                {dataApiSkills.skillsApiArray.filter(skill=> skill.languageOrFramework==="language").map((skill, index) => {
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
                            <label style={{ textAlign: 'left' }} htmlFor="bio" className="form-label">
                                Short Bio:
                                
                            </label>
                            {state.errorApiSkills.bio && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorApiSkills.bio.message}</p>}
                            <textarea
                                className="form-control text-white bg-dark"
                                id="bio"
                                name="bio"
                                cols="35"
                                rows="3"
                                placeholder="Please write a short bio about your professional background!"
                                value={state.bio}
                                onChange={updateState}
                                
                            ></textarea>
                            <br/>
                            <label style={{ textAlign: 'left'}} htmlFor="github" className="form-label">
                                Github user:
                            </label>
                            {state.errorApiSkills.github && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorApiSkills.github.message}</p>}
                            <input
                                type="text"
                                className="form-control text-white bg-dark"
                                name="github"
                                id="github" 
                                value={state.github}
                                onChange={updateState}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardFooter} card-footer text-body-secondary`}>
                    <div className={styles.cardFooter1}>
                        <button className="btn btn-dark" onClick={logOut} >Skip this Step</button>
                    </div>
                    <div className={styles.cardFooter2}>
                        <button className="btn btn-dark" style={{color:"rgb(237, 208, 134)"}} onClick={e=> updateDeveloper(e)}>NEXT STEPS Framework & Libraries</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPickingLanguages;

