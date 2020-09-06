import React, { Component } from 'react'
// import Modal from '../../Modal/Modal';
// import MessageContainer from "./MessageContainer";
import fire from '../../config/fire';

class SingleUser extends Component {




    


    render() {

       // console.log()

       const{chatData}=this.props

        let lastMessageData=this.props.lastmessagedata

        const {
            userdata:{
                name,
                profilePic,
                userId
            },
            chatKey,
            show
            
        }=this.props

        // if(chatData)
        // {
            let seen=false;
            let nomessages=false;

            let currentUserID=fire.auth().currentUser.uid
            if(lastMessageData)
            {
               // nomessages=false
                if(lastMessageData.senderID==currentUserID)
                {
                    seen=true
                }
                else if(lastMessageData.read)
                {
                    seen=true
                }
                else{
                    seen=false
                }

            }
            else{
                seen=true
                nomessages=true
            }
            


            return (
                <>
                <div className={!seen?'chat-single-unseen':'chat-single'} onClick={()=>show(chatKey,userId)}>

                    <img src={profilePic} className='person-pic'/>
                    
                    <p className='person-name'>{name}</p>
                
                    <div className='lastText' >
                            {nomessages?"":lastMessageData.message}
                    </div>
                    <div className='lastTime'>
                       {nomessages?"":lastMessageData.time} 
                    </div>
                    
                </div>          
                </>
    
            )

        // }
       

        // else
        // {
        //     return(
        //         <>
        //         <div className={'single-artist'} onClick={this.showHoverMessages}>
        //             <img src={profilePic} className='a-pic'/>
        //             <div className="artist-name">
        //                     <p className='a-name'>{name}</p>
        //                 </div>
        //             <div className='lastText' >
                            
        //             </div>
        //             <div className='lastTime'>
                       
        //             </div>
                    
        //         </div>
    
        //         <Modal onClose={this.onClose} show={this.state.showHover}>
        //             <div className="single-user">
        //                 <img src={profilePic} className='a-pic' style={{margin:'auto',display:'block'}}/>
        //                 <div className="artist-name">
        //                         <p className='a-name' style={{margin:'auto',textAlign:'center',display:'block',position:'relative'}}>{name}</p>
        //                 </div>
    
        //             </div>
        //             <MessageContainer otherUserID={userId} loggedinCustomer={this.props.loggedinCustomer} chatData={chatData} noMessages={true} />
        //             <></>
                   
                    
        //         </Modal>
        //         </>
        //     )
        // }
            
    }
}

export default SingleUser
