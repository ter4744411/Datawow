import React, { useState } from 'react'
import './EditDeletePost.scss'
import { RiHome6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import EditDeletePostBox from '../../assets/Components/PostBox/EditDeletePostBox'
import { TiTick } from "react-icons/ti";
import { useMediaQuery } from 'react-responsive';
import EditBox from './EditBox';
import DeleteBox from './DeleteBox';
import { useEffect } from 'react';
import axios from 'axios'

const EditDeletePost = () => {
  const [posts,setPosts] = useState([])
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [opencommunity,setOpencommunity] = useState(false);
  const [historycheck,setHistorycheck] = useState(false);
  const [foodcheck,setFoodcheck] = useState(false);
  const [petscheck,setPetcheck] = useState(false);
  const [healthcheck,setHealthcheck] = useState(false);
  const [fashioncheck,setFashioncheck] = useState(false);
  const [exercisecheck,setExercisecheck] = useState(false);
  const [othercheck,setOthercheck] = useState(false);
  const [createpost,setCreatepost] = useState(false);
  const [openedit,setOpenedit] = useState(false);
  const [opendelete,setOpendelete] = useState(false);
  
  const handleDelete = ()=>{
    setOpendelete(true);
  }
  const handleEdit = () =>{
      setOpenedit(true);
  }
  const handleCloseEditBox = ()=>{
    setOpenedit(false);
  }
  const handleCloseDeleteBox = ()=>{
    setOpendelete(false);
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const username = localStorage.getItem('username');  // Get the username from localStorage
        if (!username) {
          console.error('Username not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:5000/currentuserposts', {
          params: { username }  
        });
        if (response.data.error) {
          console.error(response.data.message);
        } else {
          setPosts(response.data.data); 
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="homepage">
      <div className="left">
        <div className="left-box">
            <span><RiHome6Line style={{fontSize:"20px"}}/> Home</span>
            <span><HiOutlinePencilSquare style={{fontSize:"20px"}}/> Our Blog</span>
        </div>
      </div>
      <div className="right">
        <div className="right-box">
            <div className="top-right">
                <div className="search-box">
                    <IoSearchSharp style={{fontSize:"20px",color:"gray"}}/>
                    <input placeholder="Search"/>
                </div>
                <div className="top-right-right">
                  <span className="community" onClick={()=>setOpencommunity(!opencommunity)}>Community <IoIosArrowDown /></span>
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
                  <button>Create +</button>
                </div>
            </div>
            <div className="right-post">
            {posts.map((post) => (
                <EditDeletePostBox
                  key={post._id}
                  post={post} 
                  handleEdit={() => handleEdit(post)} 
                  handleDelete={() => handleDelete(post)}  
                />
              ))}
                
            </div>
            {openedit && (
              <div className="editbox">
                <EditBox handleCloseEditBox={handleCloseEditBox}/>
              </div>)}
              {opendelete && (
              <div className="deletebox">
                <DeleteBox handleCloseDeleteBox={handleCloseDeleteBox}/>
              </div>)}
        </div>
      </div>
    </div>
  )
}

export default EditDeletePost
