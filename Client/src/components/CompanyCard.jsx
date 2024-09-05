import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../css/CompanyCard.module.css';

const CompanyCard = ({ dataApiEmployers,chat }) => {
    const { email } = useParams();
    const company = dataApiEmployers.employersApiArray.find(org => org.email === email);

    if (!company) {
        return <div className={styles.notFound}>Company not found</div>;
    }



    return (
        <div className={`${styles.companyCard} card text-white`} style={{ width: "70rem" }}>
            <div className={`${styles.cardHeader} card-header`}>
                <h2>{company.orgName}</h2>
                <button className={`${styles.chatButton} btn bg-success text-white`} onClick={()=>chat(email)}>Connect with {company.orgName}</button>
            </div>
            <div className={`${styles.cardBody} card-body`}>
                <div className={`${styles.imageContainer}`}>
                    <img 
                        src={`data:image/png;base64,${company.image}`} 
                        alt={`${company.orgName} Logo`} 
                        className={styles.companyLogo}
                    />
                </div>
                <p>
                    <strong>Name:</strong> {company.firstName} {company.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {company.email}
                </p>
                <p>
                    <strong>Address:</strong> {company.orgAddress}, {company.country}
                </p>
                <p>
                    <strong>Created At:</strong> {new Date(company.createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Updated At:</strong> {new Date(company.updatedAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default CompanyCard;
