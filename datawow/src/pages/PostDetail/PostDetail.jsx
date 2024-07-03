import React, { useState } from 'react'
import './PostDetail.scss'
import { RiHome6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PostBox from '../../assets/Components/PostBox/PostBox';
import { TiTick } from "react-icons/ti";
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios"

const PostDetail = () => {
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        console.log(response.data);
  
        // Access the `data` property from the response
        if (response.data && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);  // Extract the posts from `data`
        } else {
          console.error('Unexpected data format:', response.data);
          setPosts([]);  // Ensure posts is always an array
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);  // Ensure posts is always an array
      }
    };
  
    fetchPosts();
  }, []);
  
  return (
    <div className="homepage">
      <div className="left">
        <div className="left-box">
            <span><RiHome6Line style={{fontSize:"20px"}}/> Home</span>
            <Link to ="/EditDeletePost"><span><HiOutlinePencilSquare style={{fontSize:"20px"}}/> Our Blog</span></Link>
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
                  <Link to ="/createpost"><button>Create +</button></Link>
                </div>
            </div>
            <div className="right-post">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostBox
                  key={post._id}
                  username={post.username}
                  title={post.title}
                  content={post.content}
                  comments={post.comments || []}
                />
              ))
            ) : (
              <p>No posts available</p>
            )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
