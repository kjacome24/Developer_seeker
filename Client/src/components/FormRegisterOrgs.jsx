import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormRegisterOrgs = ({dataCountries, setLogin}) => {
    const [state, setState] = useState({
        orgName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        orgAddress : "",
        image: "",
        errorForm : {}
    });


    const updateState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // Convert the file to a Base64 encoded string
        const reader = new FileReader();
        reader.onloadend = () => {
            setState(previous => ({ ...previous, image: reader.result.split(',')[1] })); // Remove the "data:image/jpeg;base64," part
        };
        reader.readAsDataURL(selectedFile);
    };

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/employers/new",state).then(
            response => {
                localStorage.setItem("token", response.data.token);
                setLogin(true)
                setState(
                    {
                        orgName: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        country: "",
                        orgAddress : "",
                        image: "",
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
                <label htmlFor="orgName" className="form-label">Org Name:</label>
                <input 
                    type="text" 
                    className="form-control text-white bg-dark" 
                    name="orgName" 
                    id="orgName" 
                    value={state.orgName}  onChange={updateState}
                />
                {state.errorForm.orgName && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.orgName.message}</p>}
            </div>
            <div className="col-md-6">
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
            <div className="col-md-6">
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
            <div className="col-md-6">
                <label htmlFor="orgAddress" className="form-label">Company Address:</label>
                <input 
                    type="text" 
                    className="form-control text-white bg-dark" 
                    name="orgAddress" 
                    id="orgAddress" 
                    autoComplete="orgAddress"
                    value={state.orgAddress} onChange={updateState}
                />
                {state.errorForm.orgAddress && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.orgAddress.message}</p>}
            </div>
            <div className="col-md-12">
                <label htmlFor="image" className="form-label">Company Logo:</label>
                <input 
                    type="file" 
                    className="form-control text-white bg-dark" 
                    name="image" 
                    id="image" 
                    onChange={handleFileChange}
                />
            </div>
            <div className="col-md-12">
                <button type="submit" className="btn btn-dark">Register</button>
            </div>
        </form>
    );
}


export default FormRegisterOrgs;