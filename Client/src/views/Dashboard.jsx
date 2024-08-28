import styles from '../css/Dashboard.module.css';
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from 'react';
import ApiDevelopers from './ApiDevelopers';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({setLogin,dataApiPositions,dataApiDevelopers,dataCountries,login }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [filter, setFilter] = useState('');



    useEffect(() => {
        if (!login ) {
            if(user.stageOfCompletion === 5){
                navigate('/organizations')
        }
        else{
            navigate('/developers')
        }
        }
        extractingDataToken();
        console.log('Dashboard was render');
    }, [login]);

    const extractingDataToken = () => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                // Decode the token
                const decodedToken = jwtDecode(token);
                // Extract user info from the decoded token
                const { firstName, lastName, email, id, stageOfCompletion, orgName } = decodedToken;
                
                // Set the user state with the decoded info
                setUser({ firstName, lastName, email, id, stageOfCompletion, orgName });
                if (stageOfCompletion === 1) {
                    navigate(`/registrations_step2/${email}`);
                }
                if (stageOfCompletion === 2) {
                    navigate(`/registrations_step3/${email}`);
                }
                if (stageOfCompletion === 3) {
                    navigate(`/registrations_step4/${email}`);
                }
                if(stageOfCompletion === 4){
                    navigate(`/dashboard2/${email}`);
                }
                
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }

    const filteredDevelopers = dataApiDevelopers.developersApiArray.filter(developer => 
        developer.stageOfCompletion === 4 &&
        developer.languages.some(lang => 
            lang.name.includes(filter.toLowerCase())
        )
    );
    

    return (
        <div className={`${styles.dashboard} card text-white`} style={{ width: "70rem" }}>
                <div>
                {user.stageOfCompletion === 5? <h1>{user.orgName}'s Dashboard</h1> :<h1>{user.firstName}'s Dashboard</h1>}
                    {user.stageOfCompletion === 5? <p>Welcome to your dashboard:</p> :<p>Welcome to your dashboard, {user.firstName} {user.lastName}</p>}
                    
                </div>
                <div className={`${styles.cardBody} card-body`}> 
                    <div className={`${styles.cardBody1} card` } style={{backgroundColor:"transparent"}} >
                        <div className={`${styles.cardBody1a} card-header`}>
                            <label htmlFor="search" className="form-label text-white">Search for developers by typing a skill: </label>
                            <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search for developers"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />

                        </div>
                        <div className={`${styles.cardBody1b} card-body` } >
                            {filteredDevelopers.filter(developer => developer.stageOfCompletion===4).map((developer, index) => (
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
                                    <div className={`${styles.cardBody1} card-body`}>
                                        <p className="card-text">GitHub: {developer.github}</p>
                                    </div>
                                    <div className={`${styles.cardFooter} card-footer`}>
                                        <Link to={`/developers/${developer.email}`} className="btn btn-dark" style={{border: "2px solid white"}}>View Profile</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className={`${styles.cardBody2} card text-white` } style={{backgroundColor:"transparent"}}>
                        <div className={`${styles.cardBody2a} card-header`} >
                            <h4>Listed Positions: </h4>
                        </div>
                            <div className={`${styles.cardBody1b} card-body` } >
                                {dataApiPositions.positionsApiArray.map((position, index) => (
                                        <div  key={index} className={`${styles.cardPositions} card`}>
                                            <Link to={`/positions/${position._id}`} className="btn btn-dark" style={{border: "2px solid white"}}>{position.namePosition} at {position.company.orgName}</Link>

                                        </div>

                                ))}
                            </div>
                            <div className={`${styles.cardFooter} card-footer`}>
                                {user.stageOfCompletion === 5? <Link to={"/skills/new"}> <button className="btn btn-warning" style={{border: "2px solid white"}}>Create a new Skill</button> </Link> : null}
                                {user.stageOfCompletion === 5? <Link to={"/registrations_job"}> <button className="btn btn-warning" style={{border: "2px solid white"}}>Create a new position</button> </Link> : null}
                            </div>
                    </div>

                </div>

        </div>
);
}

export default Dashboard;