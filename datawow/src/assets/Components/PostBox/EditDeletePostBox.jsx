import React,{useState} from 'react'
import './PostBox.scss'
import { FaRegComment } from "react-icons/fa";
import img from './pic.jpg'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
const EditDeletePostBox = ({handleEdit,handleDelete,post}) => {
  console.log(post)
  return (
    <div className="postbox">
        <span className="profile"><img src={img} alt=""/> {post.username}</span>
        <div className="EditDelete">
          <div onClick={handleEdit}><CiEdit /></div>
          <div onClick={handleDelete}><RiDeleteBin5Line /></div>
        </div>
        <span className="history">History</span>
        <span className="post-header">{post.title}</span>
        <span className="post-info">{post.content}</span>
        <span className="comment"><FaRegComment /> 0 Comments</span>
    </div>
  )
}

export default EditDeletePostBox
