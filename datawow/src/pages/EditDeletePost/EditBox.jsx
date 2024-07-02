import React,{useState} from 'react'
import './EditBox.scss'
import { RiHome6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { TiTick } from "react-icons/ti";

const EditBox = ({handleCloseEditBox}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [opencommunity,setOpencommunity] = useState(false);
    const [historycheck,setHistorycheck] = useState(false);
    const [foodcheck,setFoodcheck] = useState(false);
    const [petscheck,setPetcheck] = useState(false);
    const [healthcheck,setHealthcheck] = useState(false);
    const [fashioncheck,setFashioncheck] = useState(false);
    const [exercisecheck,setExercisecheck] = useState(false);
    const [othercheck,setOthercheck] = useState(false);
  return (
    <div className="createpost">
      <div className="right">
        <div className="right-box">
            <div className="postnav">
                <span>Edit Post</span>
                <div className="x" onClick={handleCloseEditBox}>X</div>
            </div>
            <div onClick={()=>setOpencommunity(!opencommunity)} className="community">
                <div>Choose a community</div>
                <div><IoIosArrowDown /></div>
            </div>
            
            <input placeholder="Title" className="title-box"/>
            <input placeholder="What's on your mind...." className="content-box"/>
            <div className="footer-btn">
                <button className="cancle-btn" onClick={handleCloseEditBox}>Cancel</button>
                <button className="post-btn">Post</button>
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

export default EditBox
