import React, { useState } from 'react';
import styles from '../css/AboutUs.module.css';

const AboutUs = () => {
    const [state,setState] = useState({
        emporwerDeveloper: false,
        unmatchedOpportunities: false,
        buildingThrivingCommunity: false
    });

    const showMessage = (e) => {
        setState({...state,
            [e.target.name]: !state[e.target.name] })
    }

    return (
        <div>
            <div className={`${styles.cardAboutUs} card text-white`} style={{ width: "70rem" }}>
                <div className="card-body">
                    <h5 className="card-title">
                        Welcome to <span style={{ color: "rgb(249, 157, 194)" }}>Dev</span>el
                        <span style={{ color: "rgb(237, 208, 134)" }}>oper</span> See
                        <span style={{ color: "#0d6efd" }}>ker</span>
                    </h5>
                    <p className="card-text">
                        At Developer Seeker, we're committed to revolutionizing the way professionals and organizations connect in the world of programming. Our platform is designed to be the central hub where skilled developers and forward-thinking companies converge, eliminating the arduous task of finding the perfect match for specific programming roles.
                    </p>
                </div>
                <div className="card-body">
                    <div className={`${styles.options} d-inline-flex gap-1`}>
                        <button className="btn btn-dark" name='emporwerDeveloper' onClick={(e)=>showMessage(e)} style={{color: "rgb(249, 157, 194)"}}>Empowering Developers</button>
                        <button className="btn btn-dark" name='unmatchedOpportunities'onClick={(e)=>showMessage(e)} style={{color: "rgb(237, 208, 134)"}}>Unmatched Opportunities for Recruiters</button>
                        <button className="btn btn-dark" name="buildingThrivingCommunity"onClick={(e)=>showMessage(e)} style={{color: "#0d6efd"}}>Building a Thriving Programming Community</button>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            {state.emporwerDeveloper && 
                                <div className="card card-body text-white bg-dark">
                                    <p className="card-title" style={{color: "rgb(249, 157, 194)"}}>For developers, our platform serves as a launchpad for showcasing their expertise, streamlining the process of finding job opportunities, and simplifying the way they present their skills. By creating comprehensive profiles, developers can effortlessly display their mastery of various programming languages. We've also integrated features to seamlessly import and centralize their main information from other platforms like GitHub, making it convenient to compile a holistic representation of their abilities in one place.</p>

                                    
                                </div>
                            }
                        </div>
                        <div className="col">
                            {state.unmatchedOpportunities &&
                                <div className="card card-body text-white bg-dark">
                                    <p className="card-title" style={{color: "rgb(237, 208, 134)"}}>On the other side, we provide a robust source of information for recruiters. Our system is designed to simplify the recruitment process by offering a pool of talented programmers. Recruiters gain access to a wide array of profiles and can effortlessly navigate through a wealth of skills and experiences. Our innovative system can intelligently match open roles with the most suitable candidates, streamlining the hiring process and ensuring that the right fit is found efficiently.</p>                                    
                                </div>
                            }
                        </div>
                        <div className="col">
                            {state.buildingThrivingCommunity &&
                                <div className="card card-body text-white bg-dark">
                                    <p className="card-title" style={{color: "#0d6efd"}}>Developer Seeker is more than a platform; it's a thriving community that enhances the programming experience. Whether you're a seasoned developer seeking new opportunities or a company looking for the perfect addition to your team, our goal is to facilitate connections that propel the tech industry forward. We believe in making the process as seamless as possible, fostering an environment where developers can thrive and companies can discover their ideal candidates hassle-free.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        Join us in creating a dynamic, forward-thinking ecosystem where skills meet opportunities, and the future of programming is shaped collaboratively. Welcome to Developer Seeker—where connections are made, and careers are forged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;


