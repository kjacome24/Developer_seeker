import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './views/Content'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'




function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    // if (token) {
    //   setLogin(true);
    // }


  }, []); // Empty dependency array ensures this effect runs once on component mount

  const logOut = () => {
    localStorage.removeItem('token');
    setLogin(false);
    navigate('/aboutUs');
    
  }

  return (
    <>
      < Header login={login} logOut={logOut}/>
      < Content login={login} setLogin={setLogin} logOut={logOut} />
      < Footer />
    </>
  )
}

export default App
