import React, { Component } from 'react'
import fire from '../../config/fire'
import SingleUser from './SingleUser'
import './Chats.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Chats extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             artists:[],
             search:'',
             chats:{}
        }
    }

    updateAtrists=()=>{

        
        const ref=fire.database().ref('Users/Artist');
        ref.on('value',(s)=>{
            this.setState({artists:[]})
            console.log(s);
            s.forEach((cs)=>{
                    console.log(cs.val()+" "+cs.key)
                    this.setState(prevState => ({
                        artists: [...prevState.artists, cs.val()]
                      }));
                    //images.push(cs.val().toString())
                    
            })

        })

    }



    updateChats=()=>{

        const ref=fire.database().ref('Chats');
        ref.on('value',(s)=>{
            this.setState({chats:[]})
            console.log(s);
            s.forEach((cs)=>{
                    console.log(cs.val()+" "+cs.key)
                    this.setState(prevState => ({
                        chats: {
                            ...prevState.chats,
                            [cs.key]:cs.val()
                        }
                      }));
                    //images.push(cs.val().toString())
                    
            })

        })

    }



    changeSearch=(e)=>{
        this.setState({search:e.target.value});
    }

    componentDidMount()
    {
        this.updateAtrists()
        this.updateChats()
    }
    

    render() {
        let users=this.state.artists

        let user = this.state.search.trim().toLowerCase();
        user=user.replace(/ /g, '')

        if (user.length > 0) {
            users = users.filter(val => val.name.replace(/ /g, '').toLowerCase().match(user));
          }

          console.log(users)



        return (
            <div className='chat-container'>
                <div className="serach-container">
                    <input type='text' value={this.state.search} onChange={this.changeSearch} className='search-btn' placeholder='Search' />
                    
                    <FontAwesomeIcon icon={faSearch}/>
                </div>

                <div className="users-container">
                    {
                        users.map(user=>{
                            let chatKey=fire.auth().currentUser.uid+user.userId
                            return (<SingleUser userdata={user} loggedinCustomer={true} chatData={this.state.chats[chatKey]} chatKey={chatKey} />)
                        })
                    }
                </div>
                
            </div>
        )
    }
}


export default Chats
