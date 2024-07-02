import React from 'react'
import './DeleteBox.scss'
const DeleteBox = ({handleCloseDeleteBox}) => {
  return (
    <div className="deletebox">
        <div className="container">
            <div className="messagebox">
                <span className="deleteheader">Please confirm if you wish to delete the post</span>
                <p className="deleteinfo">Are you sure you want to delete the post? Once deleted, it cannot be recovered.</p>
            </div>
            <div className="cancledelete-btn">
                <button className="cancle-btn" onClick={handleCloseDeleteBox}>Cancle</button>
                <button className="delete-btn">Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteBox
