import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkillList = () => {
    const [skills, setSkills] = useState([]);

    // Fetch skills from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/api/skills/')
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error('Error fetching skills', error);
            });
    }, []);

    return (
        <div>
            <h2>Skills List</h2>
            {skills.length > 0 ? (
                skills.map((skill, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{skill.name}</h4>
                        <img
                            src={`data:image/jpeg;base64,${skill.image}`}
                            alt={`${skill.name} icon`}
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                ))
            ) : (
                <p>No skills available</p>
            )}
        </div>
    );
};

export default SkillList;
