import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ApiDevelopers = ({setDataApiDevelopers,setLogin,login})=>{
    const navigate = useNavigate();
    useEffect(()=>{

            getData();
            console.log('ApiDevelopers was rendered');

    },[login]);

    const getData = ()=>{
        const url = 'http://localhost:8080/api/developers';
        axios.get(url,
            {headers:{
                'user_token' : localStorage.getItem('token')
            }}).then(
                response =>{
                    setDataApiDevelopers((prev)=>{ return {...prev, developersApiArray: response.data}});

                }
            ).catch(
                error =>{
                    setDataApiDevelopers((prev)=>{ return {...prev, errorApiDevelopers: error}});
                    localStorage.removeItem('token');
                    setLogin(false);
                    navigate('/developers');}
            );
    };

}

export default ApiDevelopers;