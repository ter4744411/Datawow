import React,{useState} from 'react'
import './PostBox.scss'
import { FaRegComment } from "react-icons/fa";
import img from './pic.jpg'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
const PostBox = ({username,title,content,comment}) => {

  return (
    <div className="postbox">
        <span className="profile"><img src={img} alt=""/> {username}</span>
        <span className="history">History</span>
        <span className="post-header">{title}</span>
        <span className="post-info">{content}</span>
        <span className="comment"><FaRegComment /> 0 Comments</span>
    </div>
  )
}

export default PostBox
