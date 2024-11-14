import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Header } from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Profilo } from './components/Profilo';
import { LoginPage } from './components/LoginPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       
        <Routes>
          <Route path = '/' element = {<LoginPage/>} />
          <Route path='/profilo' element = {<Profilo/>}/>
        </Routes>

    </BrowserRouter>
      
        


    </>
  )
}

export default App
