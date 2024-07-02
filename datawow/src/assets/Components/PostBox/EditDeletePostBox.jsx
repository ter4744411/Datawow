import React,{useState} from 'react'
import './PostBox.scss'
import { FaRegComment } from "react-icons/fa";
import img from './pic.jpg'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
const EditDeletePostBox = ({handleEdit,handleDelete}) => {
  
  return (
    <div className="postbox">
        <span className="profile"><img src={img} alt=""/> Wittawat</span>
        <div className="EditDelete">
          <div onClick={handleEdit}><CiEdit /></div>
          <div onClick={handleDelete}><RiDeleteBin5Line /></div>
        </div>
        <span className="history">History</span>
        <span className="post-header">The Beginning of the End of the World</span>
        <span className="post-info">The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.</span>
        <span className="comment"><FaRegComment /> 32 Comments</span>
    </div>
  )
}

export default EditDeletePostBox
