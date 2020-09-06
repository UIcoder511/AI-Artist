import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import fire from '../../config/fire';


export default function BottomSendButton({otherUserID,loggedinCustomer}) {

    const [typedMessage, setTypedMessage] = useState('')


    const getMonthName=(d)=>{
       // let d=new Date();
        
        var m=d.getMonth();
            
        const mNames=['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC']

        return mNames[m]
        
    }




    const sendToDatabase=()=>{

        //let here=this;

        let currentUserID=fire.auth().currentUser.uid;
        //const {otherUserID,loggedinCustomer}=props

      

        let parent=loggedinCustomer?currentUserID + otherUserID:otherUserID +currentUserID;

        
        console.log(parent)

        var d=new Date();

        let ref=fire.database().ref('Chats/'+parent);//+'/'+d.getTime());

        ref.update({
            [d.getTime()]:
            {
                senderID:currentUserID,
                recieverID:otherUserID,
                message:typedMessage,
                date:d.getDate()+" "+getMonthName(d)+" "+d.getFullYear(),
                time:d.getHours()+":"+d.getMinutes(),
                read:false
            }
        }).then(()=>{
            
           // $('.only-messages').scrollTop($('.only-messages')[0].scrollHeight);
           // this.checkReadMessage()
            setTypedMessage('');
        })

    }





    return (
        <div className="bottom-send-button">
            <input type='text' className='typeMessage' placeholder='type a message' onChange={(e)=>setTypedMessage(e.target.value)} value={typedMessage} />
            <div className='send-message-btn' onClick={sendToDatabase}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </div>
                        
        </div>
    )
}
