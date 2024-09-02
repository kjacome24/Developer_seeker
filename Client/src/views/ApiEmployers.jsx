import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApiEmployers = ({ setDataApiEmployers, setLogin, login }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (login) {
            getData();
            console.log('ApiEmployers was rendered');
        }
    }, [login]);

    const getData = () => {
        const url = 'http://localhost:8080/api/employers'; // Assuming your employers API endpoint
        axios.get(url, {
            headers: {
                'user_token': localStorage.getItem('token')
            }
        }).then(
            response => {
                setDataApiEmployers((prev) => { return { ...prev, employersApiArray: response.data } });
            }
        ).catch(
            error => {
                setDataApiEmployers((prev) => { return { ...prev, errorApiEmployers: error } });
                localStorage.removeItem('token');
                setLogin(false);
                navigate('/employers'); // Assuming you have a route for employers
            }
        );
    };

    return null; // No need to render anything, this component only handles data fetching
}

export default ApiEmployers;
