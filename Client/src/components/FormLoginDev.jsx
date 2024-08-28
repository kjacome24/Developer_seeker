import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormLoginDev = ({setLogin})=> {
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
        axios.post('http://localhost:8080/api/developers/login', state).then(
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
        <h2 style={{color: "rgb(195, 208, 209)"}}>Hello Developer!!!</h2>
        <p>We are glad you are back, please log in and get the best out of our comunity. Let's Connect You To A Job!!!!!!!</p>
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

export default FormLoginDev;