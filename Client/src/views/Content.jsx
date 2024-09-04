import styles from '../css/Content.module.css';
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import FormDevelopers from '../views/FormDevelopers';
import ApiCountries from './ApiCountries';
import {useState} from 'react';
import Dashboard from './Dashboard';
import ApiOneDeveloper from './ApiOneDeveloper';
import RegistrationPickingLanguages from '../components/RegistrationPickingLanguages';
import RegistrationPickingFrameLib from '../components/RegistrationPickingFrameLib';
import SkillUpload from '../components/SkillUpload';
import SkillList from '../components/SkillList';
import RegistrationFinal from '../components/RegistrationFinal';
import FormOrganizations from './FormOrganizations';
import RegistrationNewJob from '../components/RegistrationNewJob';
import ApiPositions from './ApiPositions';
import ApiDevelopers from './ApiDevelopers';
import ApiSkills from './ApiSkills';
import Positions_card from '../components/Positions_card';
import Dashboard2 from './Dashboard2';
import CompanyCard from '../components/CompanyCard';
import ApiEmployers from './ApiEmployers';
import Chat from './Chat';
import ChatList from './ChatList';

const Content = ({login, setLogin,logOut}) => {
    const [dataCountries, setDataCountries] = useState([]);
    const [dataApiPositions, setDataApiPositions] = useState(
        {
            positionsApiArray : [],
            errorApiPositions : null
        }
    );
    const [dataApiDevelopers, setDataApiDevelopers] = useState(
        {
            developersApiArray : [],
            errorApiDevelopers : null
        }
    );
    const [dataApiSkills, setDataApiSkills] = useState({ 
        skillsApiArray: [], 
        errorApiSkills: null });
    const [dataApiEmployers, setDataApiEmployers] = useState(
        {
            employersApiArray : [],
            errorApiEmployers : null
        }
    );

    return (
        <main>
            <ApiCountries setDataCountries={setDataCountries}/>
            <ApiPositions setDataApiPositions={setDataApiPositions} setLogin={setLogin} login={login}/>
            <ApiDevelopers setDataApiDevelopers={setDataApiDevelopers} setLogin={setLogin} login={login}/>
            <ApiSkills setDataApiSkills={setDataApiSkills} />
            <ApiEmployers setDataApiEmployers={setDataApiEmployers} setLogin={setLogin} login={login}/>
            
            <Routes>
                <Route path='/' element={<Navigate to='/aboutUs' />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/developers' element={ <FormDevelopers dataCountries={dataCountries} setLogin={setLogin} />} />
                <Route path='/organizations' element={ <FormOrganizations dataCountries={dataCountries} setLogin={setLogin} />} />
                <Route path='/dashboard' element={<Dashboard  setLogin={setLogin} dataApiPositions={dataApiPositions} dataApiDevelopers={dataApiDevelopers} dataCountries={dataCountries} login={login}/> } />
                <Route path='/dashboard2/:email' element={<Dashboard2  setLogin={setLogin} dataApiPositions={dataApiPositions} dataApiDevelopers={dataApiDevelopers} dataCountries={dataCountries} login={login}/> } />
                <Route path='/developers/:email' element={<ApiOneDeveloper setLogin={setLogin} dataCountries={dataCountries}/>} />
                <Route path='/registrations_step2/:email' element={<RegistrationPickingLanguages logOut={logOut} setLogin={setLogin} dataApiSkills={dataApiSkills} setDataApiSkills={setDataApiSkills}/>} />
                <Route path='/registrations_step3/:email' element={<RegistrationPickingFrameLib logOut={logOut} setLogin={setLogin} dataApiSkills={dataApiSkills} setDataApiSkills={setDataApiSkills}/>} />
                <Route path='/registrations_step4/:email' element={<RegistrationFinal setDataApiDevelopers={setDataApiDevelopers}/>} />
                <Route path='/registrations_job' element={<RegistrationNewJob setLogin={setLogin}  dataApiSkills={dataApiSkills} setDataApiSkills={setDataApiSkills} setDataApiPositions={setDataApiPositions}/>} />
                <Route path='/positions/:id' element={<Positions_card dataApiPositions={dataApiPositions} dataCountries={dataCountries} dataApiDevelopers={dataApiDevelopers}/>} />
                <Route path='/skills/new' element={<SkillUpload setDataApiSkills={setDataApiSkills}/>} />
                <Route path='/skills'   element={<SkillList/>}  />
                <Route path='/companies/:email' element={<CompanyCard dataApiEmployers={dataApiEmployers}/>} />
                <Route path='*' element={<Navigate to='/aboutUs' />} />
                <Route path='/chats' element={<ChatList dataApiEmployers={dataApiEmployers}  dataApiDevelopers={dataApiDevelopers}/>} />
                <Route path='/chats/:chatId' element={<Chat/>} />
            </Routes>
        </main>
    );
    }

export default Content;