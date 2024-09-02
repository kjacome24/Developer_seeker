import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/SkillUpload.module.css';
import { useNavigate } from 'react-router-dom';

const SkillUpload = ({setDataApiSkills}) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        skillName: '',
        languageOrFramework: '',
        base64: ''
    });

    const updateState = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    }


    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // Convert the file to a Base64 encoded string
        const reader = new FileReader();
        reader.onloadend = () => {
            setState(previous => ({ ...previous, base64: reader.result.split(',')[1] })); // Remove the "data:image/jpeg;base64," part
        };
        reader.readAsDataURL(selectedFile);
    };

    // Handle form submission////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleUpload = () => {
        if (!state.skillName || !state.base64) {
            alert('Please enter a skill name and select an image.');
            return;
        }

        const skillData = {
            name: state.skillName.toLowerCase(),
            image: state.base64,
            languageOrFramework: state.languageOrFramework
        };
        // Send the skill data to the server
        axios.post('http://localhost:8080/api/skills/new', skillData)
            .then(response => {
                alert('Skill uploaded successfully');
                setDataApiSkills(previous => ({ ...previous, skillsApiArray: [...previous.skillsApiArray, response.data] }));
                setState(
                    previous => ({  
                        ...previous, 
                        skillName: '',
                        languageOrFramework: '',
                        base64: ''
                    })
                ); // Reset the form
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Error uploading skill', error);
                alert('Failed to upload skill');
            });
    };

    return (
        <div className={`${styles.uploadingSkills} container my-5`}>
            <div className="card text-white mx-auto" style={{ width: '70rem', backgroundColor: "transparent" }}>
                <div className="card-header text-center" >
                    <h2>Hello Employer!!!</h2>
                    <h3>Upload a New Skill</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="skillName" className="form-label">Skill Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="skillName"
                            placeholder="Enter skill name"
                            value={state.skillName}
                            onChange={(e) => updateState(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="languageOrFramework" className="form-label">Type</label>
                        <select
                            id="languageOrFramework"
                            className="form-select"
                            value={state.languageOrFramework}
                            onChange={(e) => updateState(e)}
                        >
                            <option value="language">Language</option>
                            <option value="framework">Framework</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fileUpload" className="form-label">Upload Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="fileUpload"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button
                        className="btn btn-primary"
                        onClick={handleUpload}
                        disabled={!state.skillName || !state.base64}
                    >
                        Upload Skill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillUpload;