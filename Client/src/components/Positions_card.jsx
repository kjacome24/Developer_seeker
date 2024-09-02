import styles from '../css/Positions_card.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Positions_card = ({ dataApiPositions,dataCountries, dataApiDevelopers }) => {
    const { id } = useParams();
    const [position, setPosition] = useState({});
    const [ developersWithMatch, setDevelopersWithMatch] = useState([...dataApiDevelopers.developersApiArray]);

    useEffect(() => {
        getPosition();
        console.log('Positions_card was rendered');
    }, []);

    useEffect(() => {
        if (position.languages && dataApiDevelopers.developersApiArray.length > 0) {
            const matchedDevelopers = dataApiDevelopers.developersApiArray.map((developer) => {
                return { ...developer, match: calculateMatch(developer) };
            });
            const sortedDevelopers = matchedDevelopers.sort((a, b) => b.match - a.match);
            setDevelopersWithMatch(sortedDevelopers);
        }
        console.log('Developers with match was updated');
    }, [position, dataApiDevelopers]);

    const getPosition = () => {
        const foundPosition = dataApiPositions.positionsApiArray.find((position) => position._id === id);
        console.log(foundPosition);
        setPosition(foundPosition);
    }

    const calculateMatch = (developer) => {
        let match = 0;
        if (developer.languages) {
            const developerLanguages = developer.languages.map((lang) => lang.name);
            const positionLanguages = position.languages.map((lang) => lang.name);
            developerLanguages.forEach((lang) => {
                if (positionLanguages.includes(lang)) {
                    match += 1;
                }
            });
        }
        return Math.round((match / position.languages.length) * 100);
    }






    return (
        <div className={`${styles.dashboard} card text-white`} style={{ width: "70rem" }}>
            <div className={`${styles.cardHeader} card-header`}>
                <h1>{position.namePosition} at{" "}
                    <Link to={`/companies/${position.company?.email}`} style={{ color: "rgb(249, 157, 194)" }}>
                        {position.company?.orgName}
                    </Link>
                    
                    </h1>
            </div>
            <div className={`${styles.cardBody} card-body text-white`}>
                <div className={`${styles.cardBody1} card text-white`} style={{ backgroundColor: "transparent" }}>
                    <div className={`${styles.cardBody1b} card-body`}>
                    <h4>Position Information:</h4>
                        <p>
                            <strong style={{ color: "rgb(249, 157, 194)" }}>Position Name:</strong> {position.namePosition} <br />
                        </p>
                        <p>
                            <strong style={{ color: "rgb(249, 157, 194)" }}>Job Description:</strong> {position.jobDescription} <br />
                        </p>
                        <p>
                            <strong style={{ color: "rgb(249, 157, 194)" }}>Languages:</strong>
                            <br />
                            {position.languages?.map((lang, index) => (
                                <img className={styles.icon} key={index} src={`data:image/jpeg;base64,${lang.image}`} 
                                    alt={`${lang.name} Icon`} style={{width: "50px"}}/>))}
                        </p>
                        <p>
                            <strong style={{ color: "rgb(249, 157, 194)" }}>Posted on:</strong> {new Date(position.createdAt).toLocaleString()} <br />
                        </p>
                        <p>
                            <strong style={{ color: "rgb(249, 157, 194)" }}>Updated on:</strong> {new Date(position.updatedAt).toLocaleString()} <br />
                        </p>

                    </div>

                </div>
                <div className={`${styles.cardBody2} card text-white`} style={{ backgroundColor: "transparent" }}>
                    <div className={`${styles.cardBody2a} card-header`}>
                        <h4>List Developers with Match:</h4>
                    </div>
                    <div className={`${styles.cardBody2b} card-body`}>
                        {developersWithMatch.map((developer, index) => (
                                <div key={index} className={`${styles.cardDevs} card text-white bg-dark`} style={{border: "1px solid rgb(237, 208, 134)"}}>
                                <div className={`${styles.cardHeader} card-header`}>
                                    <div className={styles.cardHeader1}>
                                        <h5 className="card-title">{developer.firstName} {developer.lastName}</h5>
                                    </div>
                                    <div className={styles.cardHeader2}>
                                        {dataCountries.filter((country)=>country.name === developer.country).map((country, index) => (
                                            <img key={index} src={country.flag} alt={country.name} style={{width: "2rem", border:"2px solid white"}}/>
                                        ))}
                                    </div>

                                </div>
                                <div className={`${styles.cardBody2} card-body`}>
                                    <div className={`${styles.progress} progress bg-dark`} role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div className={`${styles.progressBar} progressbar`} style={{ width: `${developer.match}%` }}>
                                            {developer.match}%
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.cardFooter} card-footer`}>
                                    <Link to={`/developers/${developer.email}`} className="btn btn-dark" style={{border: "2px solid white"}}>View Profile</Link>
                                </div>
                            </div>
                            ))}

                    </div>
                    <div className={`${styles.cardFooter} card-footer`}>
                    
                        <Link to={"/skills/new"}>
                            <button className="btn btn-warning" style={{ border: "2px solid white" }}>Create a skill</button>
                        </Link>

                        <Link to={"/registrations_job"}>
                            <button className="btn btn-warning" style={{ border: "2px solid white" }}>Create a New Position</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`${styles.cardFootert} card-footer`}>
        
                <h4>Company Information:</h4>
                <p>
                    <strong style={{ color: "rgb(249, 157, 194)" }}>Company Name:</strong> {position.company?.orgName} 
                </p>
                <p>
                    <strong style={{ color: "rgb(249, 157, 194)" }}>Contact Person:</strong> {position.company?.firstName} {position.company?.lastName} 
                </p>
                <p>
                    <strong style={{ color: "rgb(249, 157, 194)" }}>Contact Email:</strong> {position.company?.email} 
                </p>
            </div>
        </div>
    );
}

export default Positions_card;


