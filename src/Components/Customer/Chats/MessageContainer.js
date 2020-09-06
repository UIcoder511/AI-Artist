import React from 'react'
import OnlyMessages from './OnlyMessages';
import BottomSendButton from './BottomSendButton';

const MessageContainer = (props)=>{


            return (
                <div className='messages-container'>
    
                    <OnlyMessages {...props} />

                    <BottomSendButton {...props} />
                    
                </div>
            )

  
    
}

export default MessageContainer
