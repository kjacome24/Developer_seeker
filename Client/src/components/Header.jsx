import styles from '../css/Header.module.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const Header = ({login,logOut})=> {
    return (
        <div className={styles.header}>
            <header>
                <div className={styles.header1}>
                    <h1 style={{color: "white"}}><span style={{color: "rgb(249, 157, 194)"}}>Dev</span>el<span style={{color:  "rgb(237, 208, 134)"}}>oper</span> See<span style={{color: "#0d6efd"}}>ker</span></h1>
                </div>
                <div className={styles.header2}>
                    {!login && 
                        <Link to='/developers' style={{textDecoration: 'none', color: 'white'}}>
                            <button className='btn btn-dark '>¿Are you a Developer?</button>
                        </Link>
                    }
                    {!login && 
                        <Link to='/organizations' style={{textDecoration: 'none', color: 'white'}}>
                            <button className='btn btn-dark'>¿Are you an organization?</button>
                        </Link>
                    }
                    {!login && 
                        <Link to='/aboutUs' style={{textDecoration: 'none', color: 'white'}}>
                            <button className='btn btn-dark' >Abaut Us</button>
                        </Link>
                    }
                    {login &&                      
                        <button className='btn btn-danger' onClick={logOut}>Log out</button>
                    }
                    
                    {
                        login && 
                        <Link to='/dashboard' style={{textDecoration: 'none', color: 'white'}}>
                            <button className='btn btn-dark'>Dashboard</button>
                        </Link>
                    }
                    <button className='btn btn-dark'>Contact Us</button>
                </div>
            </header>

        </div>
    );
}

export default Header;