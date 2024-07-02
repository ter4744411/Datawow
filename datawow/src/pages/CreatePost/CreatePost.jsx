import React,{useState} from 'react'
import './CreatePost.scss'
import { RiHome6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const CreatePost = () => {
  const navigate = useNavigate();
  const handlePost = async () => {
    const username = localStorage.getItem('username');
    const community = {
        history: historycheck,
        food: foodcheck,
        pets: petscheck,
        health: healthcheck,
        fashion: fashioncheck,
        exercise: exercisecheck,
        other: othercheck
    };

    const post = {
        username,
        title,
        content,
        community,
    };

    try {
        const response = await axios.post('http://localhost:5000/posts', post);
        console.log('Post created:', response.data);
        navigate("/")
    } catch (error) {
        console.error('Failed to create post:', error);
    }
  };
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [opencommunity,setOpencommunity] = useState(false);
    const [historycheck,setHistorycheck] = useState(false);
    const [foodcheck,setFoodcheck] = useState(false);
    const [petscheck,setPetcheck] = useState(false);
    const [healthcheck,setHealthcheck] = useState(false);
    const [fashioncheck,setFashioncheck] = useState(false);
    const [exercisecheck,setExercisecheck] = useState(false);
    const [othercheck,setOthercheck] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  return (
    <div className="createpost">
      <div className="left">
        <div className="left-box">
                <span><RiHome6Line style={{fontSize:"20px"}}/> Home</span>
                <span><HiOutlinePencilSquare style={{fontSize:"20px"}}/> Our Blog</span>
            </div>
      </div>
      <div className="right">
        <div className="right-box">
            <div className="postnav">
                <span>Create Post</span>
                <Link to ="/"><div className="x">X</div></Link>
            </div>
            <div onClick={()=>setOpencommunity(!opencommunity)} className="community">
                <div>Choose a community</div>
                <div><IoIosArrowDown /></div>
            </div>
            
            <input placeholder="Title" className="title-box" onChange={(e)=>setTitle(e.target.value)}/>
            <input placeholder="What's on your mind...." className="content-box" onChange={(e)=>setContent(e.target.value)}/>
            <div className="footer-btn">
                <Link to ="/"><button className="cancle-btn" >Cancel</button></Link>
                <button className="post-btn" onClick={handlePost}>Post</button>
            </div>
            {opencommunity? 
                    <div className={isMobile ? 'dropdown-menu-mobile' : 'dropdown-menu'} aria-labelledby="dropdownMenuButton">
                      <a className={ isMobile? (historycheck ? `aftercheckmobile` : `beforecheckmobile`) : (historycheck ? `aftercheck` : `beforecheck`)} onClick={()=>setHistorycheck(!historycheck)}>History {historycheck? <TiTick /> : <></>}</a>
                      <a className={ isMobile? (foodcheck ? `aftercheckmobile` : `beforecheckmobile`) : (foodcheck ? `aftercheck` : `beforecheck`)} onClick={()=>setFoodcheck(!foodcheck)}>Food {foodcheck? <TiTick /> : <></>}</a>
                      <a className={ isMobile? (petscheck ? `aftercheckmobile` : `beforecheckmobile`) : (petscheck ? `aftercheck` : `beforecheck`)} onClick={()=>setPetcheck(!petscheck)}>Pets {petscheck? <TiTick /> : <></>}</a>
                      <a className={ isMobile? (healthcheck ? `aftercheckmobile` : `beforecheckmobile`) : (healthcheck ? `aftercheck` : `beforecheck`)} onClick={()=>setHealthcheck(!healthcheck)}>Health {healthcheck? <TiTick /> : <></>}</a>
                      <a className={ isMobile? (fashioncheck ? `aftercheckmobile` : `beforecheckmobile`) : (fashioncheck ? `aftercheck` : `beforecheck`)} onClick={()=>setFashioncheck(!fashioncheck)}>Fashion {fashioncheck? <TiTick /> : <></>}</a>
                      <a className={ isMobile? (exercisecheck ? `aftercheckmobile` : `beforecheckmobile`) : (exercisecheck ? `aftercheck` : `beforecheck`)} onClick={()=>setExercisecheck(!exercisecheck)}>Exercise {exercisecheck? <TiTick /> : <></>}</a>
                      <a className={ isMobile? (othercheck ? `aftercheckmobile` : `beforecheckmobile`) : (othercheck ? `afterothercheck` : `beforeothercheck`)} onClick={()=>setOthercheck(!othercheck)}>Others {othercheck? <TiTick /> : <></>}</a>
                  </div> : <></>}
        </div>
      </div>
    </div>
  )
}

export default CreatePost
