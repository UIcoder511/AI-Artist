import React, { Component } from 'react'
import Modal from '../../Modal/Modal';
import MessageContainer from "./MessageContainer";
import fire from '../../config/fire';

class SingleUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showHover:false,
             messages:[]
        }
    }
    

    showHoverMessages=()=>{

            this.setState({showHover:true});
    }

    onClose=()=>{
        this.setState({showHover:false});
    }



    getLastMessageData=(data)=>{
        if(data!=undefined)
            return data[Object.keys(data).sort().pop()]
    }


    render() {

       // console.log()

       const{chatData}=this.props

        let lastMessageData=this.getLastMessageData(chatData)

        const {
            name,
            profilePic,
            userId
        }=this.props.userdata

        if(chatData)
        {
            let seen=false;
            let currentUserID=fire.auth().currentUser.uid
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


            return (
                <>
                <div className={!seen?'single-artist-unseen':'single-artist'} onClick={this.showHoverMessages}>
                    <img src={profilePic} className='a-pic'/>
                    <div className="artist-name">
                            <p className='a-name'>{name}</p>
                        </div>
                    <div className='lastText' >
                            {lastMessageData.message}
                    </div>
                    <div className='lastTime'>
                       {lastMessageData.time+" "+lastMessageData.date} 
                    </div>
                    
                </div>
    
                <Modal onClose={this.onClose} show={this.state.showHover}>
                    <div className="single-user">
                        <img src={profilePic} className='a-pic' style={{margin:'auto',display:'block'}}/>
                        <div className="artist-name">
                                <p className='a-name' style={{margin:'auto',textAlign:'center',display:'block',position:'relative'}}>{name}</p>
                        </div>
    
                    </div>
                    <MessageContainer otherUserID={userId} loggedinCustomer={this.props.loggedinCustomer} chatData={chatData} noMessages={false}  />
                    <></>
                   
                    
                </Modal>
                </>
    
            )

        }
       

        else
        {
            return(
                <>
                <div className={'single-artist'} onClick={this.showHoverMessages}>
                    <img src={profilePic} className='a-pic'/>
                    <div className="artist-name">
                            <p className='a-name'>{name}</p>
                        </div>
                    <div className='lastText' >
                            
                    </div>
                    <div className='lastTime'>
                       
                    </div>
                    
                </div>
    
                <Modal onClose={this.onClose} show={this.state.showHover}>
                    <div className="single-user">
                        <img src={profilePic} className='a-pic' style={{margin:'auto',display:'block'}}/>
                        <div className="artist-name">
                                <p className='a-name' style={{margin:'auto',textAlign:'center',display:'block',position:'relative'}}>{name}</p>
                        </div>
    
                    </div>
                    <MessageContainer otherUserID={userId} loggedinCustomer={this.props.loggedinCustomer} chatData={chatData} noMessages={true} />
                    <></>
                   
                    
                </Modal>
                </>
            )
        }
            
    }
}

export default SingleUser
