import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './views/Content'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


function App() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');



  useEffect(() => {
    // Check if token exists in localStorage
    
    if (!token) {
      setLogin(false);
      navigate('/aboutUs');
    }


  }, []); // Empty dependency array ensures this effect runs once on component mount

  const logOut = () => {
    localStorage.removeItem('token');
    setLogin(false);
    navigate('/aboutUs');
    
  }

  const chat = (email2) => {
    const decodedToken = jwtDecode(token);
    const { email } = decodedToken;
    const data = {
      participants: [email, email2]};
    const url = 'http://localhost:8080/api/chats/new';
    axios.post(url,data
    ,{
      headers: {
        'user_token': token,
      },
    }
    ).then(
      (response) => {
        console.log('Chat created:', response.data);
        navigate(`/chats/${response.data._id}/${email2}`);
      }
    ).catch(error => 
      console.error('Failed to create chat:', error)
    );
}

  return (
    <>
      < Header login={login} logOut={logOut} chat={chat}/>
      < Content login={login} setLogin={setLogin} logOut={logOut} chat={chat}/>
      < Footer />
    </>
  )
}

export default App
