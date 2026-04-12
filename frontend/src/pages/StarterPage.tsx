
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button'
import '../index.css'

export const StarterPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-7xl mb-9 font-bold">Welcome to Presto!</div>
      <Button onClick={() =>  navigate('/login')}>Login</Button>
      <Button onClick={() =>  navigate('/register')}>Register</Button>
    </>
  );
};