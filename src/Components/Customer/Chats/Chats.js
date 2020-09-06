import React, { Component } from 'react'
import fire from '../../config/fire'
import SingleUser from './SingleUser'
import './Chats.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import MessageContainer from './MessageContainer'
import Modal from '../../Modal/Modal'

class Chats extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             usersData:{},
             search:'',
             chats:{},
             isChatsModal:false,
             currentChatModalKey:'',
             currentOtherKey:''
        }
    }

    updateUsers=()=>{

        
        if(this.props.loggedinCustomer)
        {
            const ref=fire.database().ref('Users/Artist');
            ref.on('value',(s)=>{
                this.setState({usersData:{}})
                console.log(s);
                s.forEach((cs)=>{
                        //console.log(cs.val()+" "+cs.key)
                        const {email,name,profilePic,userId}= cs.val()
                        this.setState(prevState => ({
                            usersData: {
                                ...prevState.usersData,
                                [cs.key]:{email,name,profilePic,userId}
                            }
                          }));
                        //images.push(cs.val().toString())
                        
                })
    
            })

        }
        else{
            const artistID=fire.auth().currentUser.uid;
            const ref=fire.database().ref('Chats');

            ref.on('value',(s)=>{
                this.setState({usersData:{}})

                s.forEach(cs=>{
                    if(cs.key.includes(artistID))
                    {
                        console.log(cs);
                        let customerID=cs.key.replace(artistID,'');

                        let ref2=fire.database().ref('Users/Customer/'+customerID);

                        ref2.on('value',(cs)=>{
                            
                            
                                //console.log(cs.val()+" "+cs.key)
                                const {email,name,profilePic,userId}= cs.val()
                                this.setState(prevState => ({
                                    usersData: {
                                        ...prevState.usersData,
                                        [customerID]:{email,name,profilePic,userId}
                                    }
                                  }));
                                //images.push(cs.val().toString())
                                
                             
                
                        })


                    }
                });

            });
        


            // s.forEach((cs)=>{
            //         console.log(cs.key)

            //         if(cs.key.includes(currentUserID))
            //         {
        }
       

    }



    updateChats=()=>{

        const ref=fire.database().ref('Chats');
        const currentUserID=fire.auth().currentUser.uid;

        ref.on('value',(s)=>{
            this.setState({chats:{}})
            console.log(s);
            s.forEach((cs)=>{
                   // console.log(cs.val()+" "+cs.key)
                    if(cs.key.includes(currentUserID))
                    {
                        this.setState(prevState => ({
                            chats: {
                                ...prevState.chats,
                                [cs.key]:cs.val()
                            }
                          }));
                    }
                   
                    //images.push(cs.val().toString())
                    
            })

        })

    }

    getLastMessageData=(data)=>{
        if(data)
            return data[Object.keys(data).sort().pop()]
        else
            return false
    }



    changeSearch=(e)=>{
        this.setState({search:e.target.value});
    }





    show=(conversationKey,otherKey)=>{

        this.setState({isChatsModal:true,currentChatModalKey:conversationKey,currentOtherKey:otherKey});
    }

    onClose=()=>{
        this.setState({isChatsModal:false,currentChatModalKey:'',currentOtherKey:''});
    }




    componentDidMount()
    {
        this.updateUsers()
        this.updateChats()
    }
    




    render() {
        //let users=this.state.
        const {currentOtherKey,chats,currentChatModalKey}=this.state

        const {loggedinCustomer}=this.props

        let usersData=this.state.usersData;
        const currentUserID=fire.auth().currentUser.uid;

        let user = this.state.search.trim().toLowerCase();
        user=user.replace(/ /g, '')
       // 

        if (user.length > 0) {
            usersData =  Object.values(usersData).filter(val => val.name.replace(/ /g, '').toLowerCase().match(user));
          }

        //console.log(usersData[currentOtherKey])



        return (
            <div className='chats'>
                <div className="serach-container">
                    <input type='text' value={this.state.search} onChange={this.changeSearch} className='search-btn' placeholder='Search' />
                    
                    <FontAwesomeIcon icon={faSearch}/>
                </div>

                <div className="users-container">
                    {
                        Object.values(usersData).map(userdata=>{

                            //const chatKey=fire.auth().currentUser.uid+userdata.userId 
                            const otherUserID=userdata.userId;

                            const chatKey=loggedinCustomer?currentUserID + otherUserID:otherUserID +currentUserID;
                            
                            let lastmessagedata=this.getLastMessageData(chats[chatKey])

                            return (<SingleUser key={chatKey} userdata={userdata} loggedinCustomer={loggedinCustomer} lastmessagedata={lastmessagedata} chatKey={chatKey} show={this.show} />)
                        })
                    }
                </div>

                {this.state.isChatsModal?
                    <Modal onClose={this.onClose} show={this.state.isChatsModal}>
                        {/* <div></div> */}
                        <div className="single-user">
                            <img src={usersData[currentOtherKey].profilePic} className='person-pic' style={{margin:'auto',display:'block'}}/>
                            
                            <p className='person-name' style={{margin:'auto',textAlign:'center',display:'block',position:'relative'}}>{usersData[currentOtherKey].name}</p>
                            

                        </div>

                        <MessageContainer key={currentOtherKey} otherUserID={currentOtherKey} loggedinCustomer={loggedinCustomer} chatData={chats[currentChatModalKey]}  />

                    </Modal>
                    :null
                }


                
            </div>
        )
    }
}


export default Chats
