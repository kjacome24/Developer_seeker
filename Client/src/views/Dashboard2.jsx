import styles from '../css/Dashboard.module.css';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Dashboard2 = ({ setLogin, dataApiPositions, dataApiDevelopers, dataCountries, login }) => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [developer, setDeveloper] = useState({});
    const [positionsWithMatch, setPositionsWithMatch] = useState([]);
    const [filter, setFilter] = useState('');

    // Extract user information from token and redirect based on login status and stage of completion
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const { stageOfCompletion } = decodedToken;
                if (!login) {
                    navigate(stageOfCompletion === 5 ? '/organizations' : '/developers');
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, [login]);

    // Load developer data and calculate matches on component mount
// Update the useEffect to trigger recalculation whenever dataApiDevelopers or positionsWithMatch change
useEffect(() => {
    const foundDeveloper = dataApiDevelopers.developersApiArray.find((dev) => dev.email === email);

    setDeveloper(foundDeveloper || {});

    if (foundDeveloper?.languages && dataApiPositions.positionsApiArray.length > 0) {
        const matchedPositions = dataApiPositions.positionsApiArray.map((position) => {
            const match = calculateMatch(position, foundDeveloper.languages);
            return { ...position, match };
        });
        const sortedPositions = matchedPositions.sort((a, b) => b.match - a.match);
        setPositionsWithMatch(sortedPositions);
    }
}, [email, dataApiPositions, dataApiDevelopers.developersApiArray]);


    // Calculate match percentage between developer and position
    const calculateMatch = (position, developerLanguages) => {
        let match = 0;
        if (position.languages) {
            const positionLanguages = position.languages.map((lang) => lang.name);
            developerLanguages.forEach((lang) => {
                if (positionLanguages.includes(lang.name)) {
                    match += 1;
                }
            });
        }
        return position.languages.length > 0
            ? Math.round((match / position.languages.length) * 100)
            : 0;
    };

    // Filter developers based on the search query
    const filteredDevelopers = dataApiDevelopers.developersApiArray.filter(
        (dev) =>
            dev.stageOfCompletion === 4 &&
            dev.languages.some((lang) =>
                lang.name.toLowerCase().includes(filter.toLowerCase())
            )
    );

    return (
        <div className={`${styles.dashboard} card text-white`} style={{ width: '70rem' }}>
            <div>
                <h1>{developer.firstName}'s Dashboard</h1>
            </div>
            <div className={`${styles.cardBody} card-body`}>
                <div className={`${styles.cardBody1} card`} style={{ backgroundColor: 'transparent' }}>
                    <div className={`${styles.cardBody1a} card-header`}>
                        <label htmlFor="search" className="form-label text-white">
                            Search for developers by typing a skill:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for developers"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <div className={`${styles.cardBody1b} card-body`}>
                        {filteredDevelopers.map((dev, index) => (
                            <div
                                key={index}
                                className={`${styles.cardDevs} card text-white bg-dark`}
                                style={{ border: '1px solid rgb(237, 208, 134)' }}
                            >
                                <div className={`${styles.cardHeader} card-header`}>
                                    <div className={styles.cardHeader1}>
                                        <h5 className="card-title">
                                            {dev.firstName} {dev.lastName}
                                        </h5>
                                    </div>
                                    <div className={styles.cardHeader2}>
                                        {dataCountries
                                            .filter((country) => country.name === dev.country)
                                            .map((country, index) => (
                                                <img
                                                    key={index}
                                                    src={country.flag}
                                                    alt={country.name}
                                                    style={{ width: '2rem', border: '2px solid white' }}
                                                />
                                            ))}
                                    </div>
                                </div>
                                <div className={`${styles.cardBody1} card-body`}>
                                    <p className="card-text">GitHub: {dev.github}</p>
                                </div>
                                <div className={`${styles.cardFooter} card-footer`}>
                                    <Link
                                        to={`/developers/${dev.email}`}
                                        className="btn btn-dark"
                                        style={{ border: '2px solid white' }}
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${styles.cardBody2} card text-white`} style={{ backgroundColor: 'transparent' }}>
                    <div className={`${styles.cardBody2a} card-header`}>
                        <h4>Listed Positions:</h4>
                    </div>
                    <div className={`${styles.cardBody1b} card-body`}>
                        {positionsWithMatch.map((position, index) => (
                            <div key={index} className={`${styles.cardPositions} card`}>
                                <Link
                                    to={`/positions/${position._id}`}
                                    className="btn btn-dark"
                                    style={{ border: '2px solid white' }}
                                >
                                    {position.namePosition} at {position.company.orgName}
                                </Link>
                                <div
                                    className={`${styles.progress} progress bg-dark`}
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div
                                        className={`${styles.progressBar} progressbar`}
                                        style={{ width: `${position.match}%` }}
                                    >
                                        {position.match}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;



