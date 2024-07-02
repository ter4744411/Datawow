import React, { useEffect, useState } from 'react'
import './Header.scss'
import {useMediaQuery} from 'react-responsive'
import { IoMenu } from "react-icons/io5";
import { RiHome6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuopen,setMenuopen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [username, setUsername] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <div className="app-header">
      <div className="app-header-box">
        <span>a Board</span>
        {isMobile ? (
  <button className="button-icon" onClick={() => setMenuopen(!menuopen)}>
    <IoMenu />
  </button>
) : (
  username ? (
    <div style={{display:"flex" ,gap:"8px" , alignContent:"center",justifyContent:"center",alignItems:"center"}}>
    <span>{username}</span>
    <Link to ="/signin"><button onClick={handleLogout}>Logout</button></Link>
    </div>
  ) : (
    <button className="button-signin">Sign In</button>
  )
)}
      </div>
      {menuopen? 
      <div className="sidebar">
        <div className="inside-sidebar">
          <div><FaArrowRight style={{fontSize:"20px", cursor:"pointer"}} onClick={()=>setMenuopen(false)}/></div>
          <div className="homeandblog">
            <span><RiHome6Line style={{fontSize:"20px"}}/> Home</span>
            <span><HiOutlinePencilSquare style={{fontSize:"20px"}}/> Our Blog</span>
          </div>
        </div>
      </div> : <></>}
    </div>
  )
}

export default Header
