import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { StarterPage } from './pages/StarterPage';
import { PresentationPage } from './pages/PresentationPage';


import { useEffect, useState } from "react"

function App() {

  const [, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const maybeToken = localStorage.getItem('token');
    if (maybeToken) {
        setToken(maybeToken)
    }
  }, [])

  const fn = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/dashboard')
  }

  return (
    <>
        <Routes>
            <Route path="/" element={<StarterPage />} />
            <Route path="/login" element={<LoginPage successCallBack={fn}/>} />
            <Route path="/register" element={<RegisterPage successCallBack={fn}/>} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/presentation/:id" element={<PresentationPage />} />

        </Routes>
    </>
  )
}

export default App
