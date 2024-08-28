import React, { useState, useEffect } from 'react';
import styles from '../css/RegistrationPickingLanguages.module.css';
import ApiSkills from '../views/ApiSkills';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const RegistrationNewJob = ({ setLogin , dataApiSkills , setDataApiSkills, setDataApiPositions }) => {
    const navigate = useNavigate();
    const [dataCompany, setDataCompany] = useState({}); // State to store the company data
    const [state, setState] = useState({
        email: '',
        languages: [],
        jobDescription: '',
        namePosition: '',
        errorApiSkills: {}
    });


    // Extract user info from the decoded token when the component mounts
    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setDataCompany(decodedToken);

                if (decodedToken.stageOfCompletion !== 5) {
                    navigate('/dashboard');
                } else {
                    setState(prev => ({ ...prev, email: decodedToken.email }));
                }
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const addToSkills = (e) => {
        const skill = state.languages.find(skill => skill.name === e.target.name);
        if (skill) {
            const newState = state.languages.filter(skill => skill.name !== e.target.name);
            setState(prev => ({ ...prev, languages: newState }));
        } else {
            const newSkill = dataApiSkills.skillsApiArray.find(skill => skill.name === e.target.name);
            setState(prev => ({ ...prev, languages: [...prev.languages, newSkill] }));
        }
    };

    const updateState = (e) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const updateDeveloper = (e) => {
        e.preventDefault();
        if (state.languages.length === 0) {
            setState(prev => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, languages: { message: 'Please select at least one language, framework or library' } }
            }));
        }
        if (!state.jobDescription) {
            setState(prev => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, jobDescription: { message: 'Please complete the job description' } }
            }));
        }
        if (!state.namePosition) {
            setState(prev => ({
                ...prev,
                errorApiSkills: { ...prev.errorApiSkills, namePosition: { message: 'Please complete the name of Position' } }
            }));
        }
        if (state.languages.length === 0 || !state.jobDescription || !state.namePosition) {
            return;
        }
        const url = `http://localhost:8080/api/positions/new`;
        axios.post(url, state, {
            headers: {
                'user_token': localStorage.getItem('token')
            }
        }).then((response) => {
            setDataApiPositions(prev => ({ ...prev, positionsApiArray: [...prev.positionsApiArray, response.data] }));
            setState({
                email: '',
                languages: [],
                jobDescription: '',
                namePosition: '',
                errorApiSkills: {}
            });
            navigate('/dashboard');
        }).catch((error) => {
            setDataApiSkills(prev => ({ ...prev, errorApiSkills: error }));
            // setLogin(false);
            // navigate('/organizations');
        });
    };

    return (
        <div>
            <div className={`${styles.cardFormDevelopers} card text-white`} style={{ width: '70rem' }}>
                <div className={`${styles.card_header} card-header`}>
                    <div className={styles.cardHeader1}>
                        <h2 style={{ color: "rgb(249, 157, 194)" }}>
                            Add a New Position:
                        </h2>
                    </div>
                </div>
                <div className={`${styles.cardBody} card-body`}>
                    <label style={{ textAlign: 'left' }} htmlFor="namePosition" className="form-label">
                        Position's name:
                    </label>
                    {state.errorApiSkills.namePosition && <p style={{ color: "rgb(249, 157, 194)" }}>{state.errorApiSkills.namePosition.message}</p>}
                    <input
                        type="text"
                        className="form-control text-white bg-dark"
                        name="namePosition"
                        id="namePosition"
                        value={state.namePosition}
                        onChange={updateState}
                    />
                    <br />
                    <label style={{ textAlign: 'left' }} htmlFor="jobDescription" className="form-label">
                        Job Description:
                    </label>
                    {state.errorApiSkills.jobDescription && <p style={{ color: "rgb(249, 157, 194)" }}>{state.errorApiSkills.jobDescription.message}</p>}
                    <textarea
                        className="form-control text-white bg-dark"
                        id="jobDescription"
                        name="jobDescription"
                        cols="35"
                        rows="3"
                        placeholder="Please write the job Description!"
                        value={state.jobDescription}
                        onChange={updateState}
                    ></textarea>
                    <br />
                    <h3>Pick the requested languages, frameworks and libraries:</h3>
                    <div className={styles.cardBody1}>
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
                    {state.errorApiSkills.languages && <p style={{ color: "rgb(249, 157, 194)" }}>{state.errorApiSkills.languages.message}</p>}
                    <div className={styles.cardBody2}>
                        <div id={styles.cardBody2a} className="card  bg-dark">
                            <div className={styles.cardBody2a1}>
                                {dataApiSkills.skillsApiArray.map((skill, index) => (
                                    <img
                                        src={`data:image/jpeg;base64,${skill.image}`}
                                        key={index}
                                        alt={`${skill.name} Icon`}
                                        className={`${styles.icons} ${state.languages.find(sk => sk.name === skill.name) ? styles.shadowx : ''}`}
                                        id={skill.name}
                                        name={skill.name}
                                        onClick={e => addToSkills(e)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardFooter} card-footer text-body-secondary`}>
                    <div className={styles.cardFooter2}>
                        <button className="btn btn-dark" style={{ color: "rgb(237, 208, 134)" }} onClick={e => updateDeveloper(e)}>Create Position!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationNewJob;


