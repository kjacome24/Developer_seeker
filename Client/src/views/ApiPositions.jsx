import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ApiPositions = ({setDataApiPositions,setLogin,login })=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if (login) {
            getData();
            console.log('ApiPositions was rendered');
        }
    },[login]);

    const getData = ()=>{
        const url = 'http://localhost:8080/api/positions';
        axios.get(url,
            {headers:{
                'user_token' : localStorage.getItem('token')
            }}).then(
                response =>{
                    setDataApiPositions((prev)=>{ return {...prev, positionsApiArray: response.data}});

                }
            ).catch(
                error =>{
                    console.log(error);
                    setDataApiPositions((prev)=>{ return {...prev, errorApiPositions: error}});
                    localStorage.removeItem('token');
                    setLogin(false);
                    navigate('/Positions');}
            );
    };

}

export default ApiPositions;