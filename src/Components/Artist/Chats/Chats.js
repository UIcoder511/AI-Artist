import React, { Component } from 'react'
import fire from '../../config/fire';
import SingleUser from './SingleUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'



class Chats extends Component {



    constructor(props) {
        super(props)
    
        this.state = {
            customers:[],
          //  customerIDs:[],
             search:'',
             chats:{}
        }
    }


    // updateCustomers=()=>{

    //     //console.log('updated////////')
    //     const ref=fire.database().ref('Users/Customer');

    //     this.state.customerIDs.map(cid=>{

    //         let ref=fire.database().ref('Users/Customer/'+cid);

    //         ref.on('value',(s)=>{
    //             this.setState({customers:[]})
    //             console.log(s);
    //            /* s.forEach((cs)=>{
                       
    //                     //images.push(cs.val().toString())
                        
    //             })*/

    //             console.log(s.val()+" "+s.key)
    //             this.setState(prevState => ({
    //                 customers: [...prevState.customers, s.val()]
    //               }));
    
    //         })


    //     })

        

    // }
    
    changeSearch=(e)=>{
        this.setState({search:e.target.value});
    }





    showCustomerChats=()=>{

        let currentUserID=fire.auth().currentUser.uid;
        const {loggedinCustomer}=this.props


        const ref=fire.database().ref('Chats');
        ref.on('value',(s)=>{
            this.setState({customers:[],chats:{}})
           // console.log(s);


            s.forEach((cs)=>{
                    console.log(cs.key)

                    if(cs.key.includes(currentUserID))
                    {
                        let customerID=cs.key.replace(currentUserID,'');

                        console.log(customerID)

                        let ref2=fire.database().ref('Users/Customer/'+customerID);

                        ref2.on('value',(s)=>{
                            //this.setState({customers:[]})
                            console.log(s);
                           /* s.forEach((cs)=>{
                                   
                                    //images.push(cs.val().toString())
                                    
                            })*/
            
                            console.log(s.val()+" "+s.key)
                            this.setState(prevState => ({
                                customers: [...prevState.customers, s.val()]
                                // chats: {
                                //     ...prevState.chats,
                                //     [cs.key]:cs.val()
                                // }
                              }));
                
                        })


                        this.setState(prevState => ({
                            // customerIDs:[
                            //     ...prevState.customerIDs,
                            //     customerID
                            // ],
                            chats: {
                                ...prevState.chats,
                                [cs.key]:cs.val()
                            }
                          }));

                    }

                  /* */
                    //images.push(cs.val().toString())
                    
            }) 

        })

    }


    componentDidMount()
    {
        this.showCustomerChats();
        //this.updateCustomers();
    }

    componentDidUpdate()
    {

    }

    render() {
        let users=this.state.customers

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
                            let chatKey=user.userId+fire.auth().currentUser.uid
                            return (<SingleUser userdata={user} loggedinCustomer={false} chatData={this.state.chats[chatKey]} chatKey={chatKey} />)
                        })
                    }
                </div>
                
            </div>
        )
    }
}

export default Chats
