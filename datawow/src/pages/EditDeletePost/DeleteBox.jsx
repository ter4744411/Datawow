import React from 'react'
import './DeleteBox.scss'
import axios from "axios"
import { Link } from 'react-router-dom'
const DeleteBox = ({handleCloseDeleteBox,post}) => {
  const handleSubmitDelete = async () => {
    try{
      const {data} = await axios.post("http://localhost:5000/postdelete",{postid:post._id})
      console.log(data)
      handleCloseDeleteBox();
    }catch(error){
      console.log("delete failed :",error)
    }
  }
  return (
    <div className="deletebox">
        <div className="container">
            <div className="messagebox">
                <span className="deleteheader">Please confirm if you wish to delete the post</span>
                <p className="deleteinfo">Are you sure you want to delete the post? Once deleted, it cannot be recovered.</p>
            </div>
            <div className="cancledelete-btn">
                <button className="cancle-btn" onClick={handleCloseDeleteBox}>Cancle</button>
                <Link to="" refresh="true"><button className="delete-btn" onClick={handleSubmitDelete}>Delete</button></Link>
            </div>
        </div>
    </div>
  )
}

export default DeleteBox
