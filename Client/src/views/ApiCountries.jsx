import { useEffect } from "react";
import axios from "axios";

const ApiCountries = ({setDataCountries}) => {
    useEffect(
        ()=>{
            getCountries();
        }
        , []);

    const getCountries = ()=>{
        const url= 'https://restcountries.com/v3.1/all';
        axios.get(url).then(
            response => {
                const countries = response.data.map(countries => {
                    return {
                        name: countries.name.common,
                        flag: countries.flags.png
                    };
                
                }
            );
            setDataCountries(countries);
            }
        ).catch();
    }
};

export default ApiCountries;
