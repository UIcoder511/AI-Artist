import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'

import $ from "jquery"

import fire from "../../config/fire";

class MessageContainer extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             typedMessage:''
        }
    }


    getMonthName=(d)=>{
       // let d=new Date();
        
        var m=d.getMonth();
            
        const mNames=['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC']

        return mNames[m]
        
    }


    typeMessageHandler=(e)=>{

        this.setState({
            typedMessage:e.target.value
        })
    }

    sendToDatabase=()=>{

        

        let here=this;

        let currentUserID=fire.auth().currentUser.uid;
        const {otherUserID,loggedinCustomer}=this.props

        if(loggedinCustomer)
        {
            var parent=currentUserID + otherUserID
        }
        else{
            var parent=otherUserID +currentUserID
        }

        
        console.log(parent)

        var d=new Date();

        let ref=fire.database().ref('Chats/'+parent);//+'/'+d.getTime());

        ref.update({
            [d.getTime()]:
            {
                senderID:currentUserID,
                recieverID:otherUserID,
                message:this.state.typedMessage,
                date:d.getDate()+" "+here.getMonthName(d)+" "+d.getFullYear(),
                time:d.getHours()+":"+d.getMinutes(),
                read:false
            }
        }).then(()=>{
            here.setState({typedMessage:''})
        })

    }


    checkReadMessage=()=>{
        console.log('ccc')

        let currentUserID=fire.auth().currentUser.uid;
        const {otherUserID,loggedinCustomer}=this.props
        

        if(loggedinCustomer)
        {
            var parent=currentUserID + otherUserID
        }
        else{
            var parent=otherUserID +currentUserID
        }


        Object.entries(this.props.chatData).map(([key,data])=>{

            if(otherUserID!=data.recieverID && data.read==false)
            {  
                
                let ref=fire.database().ref('Chats/'+parent+'/'+key);


                ref.update({
                    read:true
                })
            }
        })
    }









    componentDidMount(){
        console.log(this.props.noMessages)
        if(!this.props.noMessages)
        {
            $('.only-messages').scrollTop($('.only-messages')[0].scrollHeight);
            this.checkReadMessage()
        }
        
    }

    componentDidUpdate(){
        if(!this.props.noMessages)
        {
            $('.only-messages').scrollTop($('.only-messages')[0].scrollHeight);
            this.checkReadMessage()
        }
       
    }
    


    render() {

        const{chatData}=this.props

        if(chatData)
        {

            return (
                <div className='messages-container'>
    
                    <div className="only-messages">
    
                        {
    
                            Object.values(chatData).map(data =>{
                                    //console.log(fire.auth().currentUser.uid==data.senderID)
                                    if(fire.auth().currentUser.uid==data.senderID)
                                    {
    
                                        return(
                                            <div className="chat-message-list">
                                                <div className="message-row you-message">
                                                    <div className="message-text">{data.message}</div>
                                                    <div className="message-time">{data.time+" "+data.date}</div>
                                                </div>
                                            </div>
                                        )
    
                                    }
                                        
                                    else
                                    {
    
                                        return(
                                            <div className="chat-message-list">
                                                <div className="message-row other-message">
                                                    <div className="message-text">{data.message}</div>
                                                    <div className="message-time">{data.time+" "+data.date}</div>
                                                </div>
                                            </div>
                                        )
    
                                    }
                                        
                            })
    
                        }
    
                        
    
                    </div>
    
                    <div className="bottom-send-button">
                        <input type='text' className='typeMessage' placeholder='type a message' onChange={this.typeMessageHandler} value={this.state.typedMessage} />
                        <div className='send-message-btn' onClick={this.sendToDatabase}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </div>
                        
                    </div>
    
                </div>
            )

            // var chatWindow= document.getElementsByClassName('only-messages')[0]
            // var xH = chatWindow.scrollHeight;
            // chatWindow.scrollTo(0, xH);
            

        }
       
        else
        {
            return (
                <div className='messages-container'>
    
                    <div className="only-messages">
                    </div>
    
                    <div className="bottom-send-button">
                        <input type='text' className='typeMessage' placeholder='type a message' onChange={this.typeMessageHandler} value={this.state.typedMessage} />
                        <div className='send-message-btn' onClick={this.sendToDatabase}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </div>
                        
                    </div>
    
                </div>
            )
        }
    }
}

export default MessageContainer
