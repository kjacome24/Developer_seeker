import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormLoginOrg = ({setLogin})=> {
    const [state, setState] = useState({
        email: "",
        password: "",
        errorForm : {}
    });

    const updateState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();

    const userLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/employers/login', state).then(
            response => {
                localStorage.setItem("token", response.data.token);
                setLogin(true)
                setState(
                    {
                        email: "",
                        password: "",
                        errorForm : {}
                    }
                )
                navigate('/dashboard');
            }
        ).catch(
            error => {
                setState({...state, errorForm: error.response.data.errors})}
        );
    }
    return(
        <form className="form-control " style={{backgroundColor: "transparent", color: "white", border:"transparent"}} onSubmit={userLogin}>
        <h2 style={{color: "rgb(237, 208, 134)"}}>Hello Recruiters!!!</h2>
        <p>We are glad you are back, please log in and get the best out of our comunity. If you are new in the page please click on the register button and you will be invited to submit the details of your company or organization.</p>
            <div className="form-group" style={{backgroundColor: "transparent" }}>
                <label htmlFor="email">Email</label>
                <input type="email"  className="form-control text-white bg-dark" id="email" name="email" autoComplete="email"  onChange={updateState} />
                {state.errorForm.email && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.email.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"  className="form-control text-white bg-dark" id="password" name="password" autoComplete="current-password" onChange={updateState} />
                {state.errorForm.password && <p style={{color:"rgb(249, 157, 194)"}}>{state.errorForm.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-dark">Sign in</button>

        </form>

    );
}

export default FormLoginOrg;