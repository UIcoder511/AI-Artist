import React,{useState} from 'react'
import ProfileOps from './ProfileOps';

const ProfilePic=({dp,name}) => {

    const [isOpenProfileProps, setIsOpenProfileProps] = useState(false)

    
    const openProfileOptions=()=>{
            // console.log(isOpenProfileProps)
            

            setIsOpenProfileProps(prev=>!prev);
                
            
    }

    
        return (
            <>
               <img className='profile-pic'  src={dp} onClick={openProfileOptions} />
               {isOpenProfileProps?<ProfileOps dp={dp} name={name} checker={openProfileOptions}  />:null} 
            </>
        )
    
}

export default ProfilePic

