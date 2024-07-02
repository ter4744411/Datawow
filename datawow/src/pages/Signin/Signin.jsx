import React,{useState} from 'react'
import './Sign.scss'
import board from './board.png'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const handleLogin = async () => {
    try {
        const { data } = await axios.post('http://localhost:5000/login', { username });
        localStorage.setItem('username', data.username);
        console.log("Current User:",data.username)
        navigate("/")
    } catch (error) {
        console.error('Login failed:', error);
    }
  };
  return (
    <div className="signin">
      <div className="container">
        <div className="left">
            <div className="signin-box">
                <span>Sign in</span>
                <div className="signin-form">
                    <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                    <button onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </div>
        <div className="right">
            <img src={board} alt=""/>
            <span>a Board</span>
        </div>
      </div>
    </div>
  )
}

export default Signin
