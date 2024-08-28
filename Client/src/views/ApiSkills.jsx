import { useEffect } from "react";
import axios from "axios";

const ApiSkills = ({setDataApiSkills}) => {

    useEffect(() => {
        getSkills();
        console.log('ApiSkills was render');
    }, []);

    const getSkills = () => {
        const url = 'http://localhost:8080/api/skills/';
        axios.get(url).then(
            response => {
                setDataApiSkills((prev) => { return { ...prev, skillsApiArray: response.data } });
            }
        ).catch(
            error => {
                setDataApiSkills((prev) => { return { ...prev, errorApiSkills: error } });
            }
        );
    };
}

export default ApiSkills;