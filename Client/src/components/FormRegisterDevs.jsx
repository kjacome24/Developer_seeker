import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormRegisterDevs = ({dataCountries, setLogin}) => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        stageOfCompletion: "1",
        errorForm : {}
    });


    const updateState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/developers/new",state).then(
            response => {
                localStorage.setItem("token", response.data.token);
                setLogin(true)
                setState(
                    {
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        country: "",
                        stageOfCompletion: "1",
                        errorForm : {}
                    }
                )
                navigate('/dashboard');
            }
        

        ).catch(
            error => {
                setState({...state, errorForm: error.response.data.errors})
            }
        );
    }

    return(
        <form className="row" onSubmit={registerUser}>
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">First Name:</label>
                <input 
                    type="text" 
                    className="form-control text-white bg-dark" 
                    name="firstName" 
                    id="firstName" 
                    value={state.firstName} onChange={updateState}
                />
                {state.errorForm.firstName && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.firstName.message}</p>}

            </div>
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Last Name:</label>
                <input 
                    type="text" 
                    className="form-control text-white bg-dark" 
                    name="lastName" 
                    id="lastName" 
                    value={state.lastName}  onChange={updateState}
                />
                {state.errorForm.lastName && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.lastName.message}</p>}

            </div>
            <div className="col-md-12">
                <label htmlFor="email" className="form-label">Email:</label>
                <input 
                    type="email" 
                    className="form-control text-white bg-dark" 
                    name="email" 
                    id="email" 
                    value={state.email}  onChange={updateState}
                />
                {state.errorForm.email && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.email.message}</p>}

            </div>
            <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password:</label>
                <input 
                    type="password" 
                    className="form-control text-white bg-dark" 
                    name="password" 
                    id="password" 
                    autoComplete="password"
                    value={state.password} onChange={updateState}
                />
                {state.errorForm.password && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.password.message}</p>}

            </div>
            <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input 
                    type="password" 
                    className="form-control text-white bg-dark" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    autoComplete="password"
                    value={state.confirmPassword} onChange={updateState}
                />
                {state.errorForm.confirmPassword && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.confirmPassword.message}</p>}

            </div>
            <div className="col-md-12">
                <label htmlFor="country" className="form-label">Country:</label>
                <select 
                    id="country" 
                    className="form-control text-white bg-dark" 
                    name="country" 
                    value={state.country} onChange={updateState}
                >
                    {
                        dataCountries.map((country)=>(
                            <option value={country.name} key={country.name}>{country.name}</option>
                        ))
                    }
                </select>
                {state.errorForm.country && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.country.message}</p>}

            </div>
            <div className="col-md-12">
                <button type="submit" className="btn btn-dark">Register</button>
            </div>
        </form>
    );
}


export default FormRegisterDevs;