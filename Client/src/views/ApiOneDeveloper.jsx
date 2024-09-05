import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from '../css/ApiOneDeveloper.module.css';

const ApiOneDeveloper = ({setLogin,dataCountries,chat}) => {
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

    return (
        <div className={`${styles.developerCard} card text-white`} style={{ width: "70rem" }}>
                <div className={`${styles.cardHeader} card-header`}>
                    <h1>Welcome to {dataApiDeveloper.dataApiOne.firstName}'s card:</h1>
                    <button className={`${styles.chatButton} btn bg-success text-white`} onClick={()=>chat(email)}>Connect with {dataApiDeveloper.dataApiOne.firstName}</button>
                </div>
                <div className={`${styles.cardBody} card-body`}>
                    <div className={styles.cardBodyA}>
                        <img src={`data:image/jpeg;base64,${dataApiDeveloper.dataApiOne.image}`} alt="Profile" className={styles.profileImage}/>
                        <br/>
                        <p className="card-title"><span style={{ color:"rgb(249, 157, 194)" }}>Full Name:</span> {dataApiDeveloper.dataApiOne.firstName} {dataApiDeveloper.dataApiOne.lastName}</p>
                        <p className="card-text"><span style={{ color:"rgb(249, 157, 194)" }}>Email:</span> {dataApiDeveloper.dataApiOne.email}</p>
                        <p className="card-text"><span style={{ color:"rgb(249, 157, 194)" }}>Bio:</span> {dataApiDeveloper.dataApiOne.bio}</p>
                        <p className="card-text"><span style={{ color:"rgb(249, 157, 194)" }}>Country:</span> {dataApiDeveloper.dataApiOne.country}</p>
                        <p className="card-text"><span style={{ color:"rgb(249, 157, 194)" }}>ID:</span> {dataApiDeveloper.dataApiOne._id}</p>
                        {dataCountries.filter((country)=>country.name === dataApiDeveloper.dataApiOne.country).map((country, index) => (
                            <img key={index} src={country.flag} alt={country.name} style={{width: "50px"}}/>
                        ))}
                    </div>
                    <div className={styles.cardBodyB}>
                        <h4 style={{ color:"rgb(249, 157, 194)" }}>Github:</h4>
                        <a href={dataApiDeveloper.dataApiOne.github} target="_blank" rel="noreferrer">{dataApiDeveloper.dataApiOne.github}</a>
                        <br></br>
                        <h4 style={{ color:"rgb(249, 157, 194)" }}>Languages: </h4>
                        <div className={styles.cardBodyB1}>
                            {dataApiDeveloper.dataApiOne.languages.filter(skill => skill.languageOrFramework==="language").map((language, index) => 
                                <img className={styles.icon} key={index} src={`data:image/jpeg;base64,${language.image}`} 
                                alt={`${language.name} Icon`} style={{width: "50px"}}/>)}
                        </div>
                        <br></br>
                        <h4 style={{ color:"rgb(249, 157, 194)" }}>Libraries and frameworks: </h4>
                        <div className={styles.cardBodyB2}>
                        {dataApiDeveloper.dataApiOne.languages.filter(skill => skill.languageOrFramework==="framework").map((language, index) => 
                                <img className={styles.icon} key={index} src={`data:image/jpeg;base64,${language.image}`} 
                                alt={`${language.name} Icon`} style={{width: "50px"}}/>)}
                        </div>
                    </div>
                </div>

                <div className={`${styles.cardFooter} card-footer`}>

                </div>
            
        </div>
    );
}

export default ApiOneDeveloper;