import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/SkillUpload.module.css';

const SkillUpload = () => {
    const [skillName, setSkillName] = useState('');
    const [file, setFile] = useState(null);
    const [languageOrFramework, setLanguageOrFramework] = useState('');
    const [base64, setBase64] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Convert the file to a Base64 encoded string
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result.split(',')[1]); // Remove the "data:image/jpeg;base64," part
        };
        reader.readAsDataURL(selectedFile);
    };

    // Handle form submission
    const handleUpload = () => {
        if (!skillName || !file) {
            alert('Please enter a skill name and select an image.');
            return;
        }

        // Prepare the data to send to the server
        const skillData = {
            name: skillName.toLowerCase(),
            image: base64,
            languageOrFramework: languageOrFramework
        };

        // Send the skill data to the server
        axios.post('http://localhost:8080/api/skills/new', skillData)
            .then(response => {
                alert('Skill uploaded successfully');
                setSkillName(''); // Reset the form
                setFile(null);
                setBase64('');
            })
            .catch(error => {
                console.error('Error uploading skill', error);
                alert('Failed to upload skill');
            });
    };

    return (
        <div className={`${styles.uploadingSkills} container my-5`}>
            <div className="card bg-dark text-white mx-auto" style={{ width: '70rem', backgroundColor: "transparent" }}>
                <div className="card-header text-center">
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
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="languageOrFramework" className="form-label">Type</label>
                        <select
                            id="languageOrFramework"
                            className="form-select"
                            value={languageOrFramework}
                            onChange={(e) => setLanguageOrFramework(e.target.value)}
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
                        disabled={!skillName || !file}
                    >
                        Upload Skill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillUpload;