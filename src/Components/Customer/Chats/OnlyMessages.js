import React, { useEffect } from 'react'
import SingleMessage from './SingleMessage';
import $ from "jquery"
import fire from '../../config/fire';

export default function OnlyMessages({chatData,otherUserID,loggedinCustomer}) {

    const uid=fire.auth().currentUser.uid;
    //const{chatData}=this.props
    console.log(chatData)

    useEffect(() => {

      
            $('.only-messages').scrollTop($('.only-messages')[0].scrollHeight);
            //checkReadMessage()
        
        
        return () => {
            
        }
    }, [chatData])

    useEffect(() => {

        if(chatData !== undefined)
        {
            $('.only-messages').scrollTop($('.only-messages')[0].scrollHeight);
            checkReadMessage()
        }
        
        return () => {
            
        }
    }, [])






    const checkReadMessage=()=>{
        console.log('ccc')

        let currentUserID=fire.auth().currentUser.uid;
       // const {otherUserID,loggedinCustomer}=this.props
        

        let parent=loggedinCustomer?currentUserID + otherUserID:otherUserID +currentUserID;


        Object.entries(chatData).map(([key,data])=>{

            if(otherUserID!=data.recieverID && data.read==false)
            {  
                
                let ref=fire.database().ref('Chats/'+parent+'/'+key);
                ref.update({
                    read:true
                })
            }
        })
     }





    return (
        <>
            {
                    chatData !== undefined ?
                    <div className="only-messages">
                        {
    
                            Object.values(chatData).map(data =>{
                                    //console.log(fire.auth().currentUser.uid==data.senderID)
                                    const whoMessage=uid==data.senderID?'you-message':'other-message';
                                   
                                        return(
                                            <SingleMessage whoMessage={whoMessage} data={data} />
                                        )
                                        
                            })
    
                        }
                    </div>
                    :
                    <div className="only-messages"></div>

                }
            
        </>
    )
}
