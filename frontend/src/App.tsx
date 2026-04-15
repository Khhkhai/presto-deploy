import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { StarterPage } from './pages/StarterPage';
import { PresentationPage } from './pages/PresentationPage';


function App() {
  const navigate = useNavigate();
  const fn = (token: string) => {
    localStorage.setItem('token', token);
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
