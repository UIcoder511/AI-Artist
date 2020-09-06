import React,{useEffect} from 'react'
import fire from "../config/fire";

export default function ProfileOps(props) {

    const logout=(e)=>{
        e.preventDefault()
        fire.auth().signOut();  
    }

    const checker=(e)=>{
        if (!document.getElementById('profile-ops-id').contains(e.target)){
            props.checker();
          } 
        
    }

    useEffect(() => {
        window.addEventListener('mousedown',checker);
        return () => {
            console.log('removed');
            window.removeEventListener('mousedown',checker);
        }
    }, [])


    return (
            <div className='profile-ops' id="profile-ops-id">

                <img className='profile-pic-lg' src={props.dp} style={{height:'70px',width:'70px'}} />

                <div className="user-name">
                    {props.name}
                </div>

                <button id='logout-btn' onClick={logout} className='lout'>Logout</button>
            </div>
    )
}
