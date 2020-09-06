import React, { Component } from 'react'
import SingleOrder from './SingleOrder'
import fire from '../../config/fire'

class Orders extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             orders:[]
        }
    }

    updateOrders=()=>{
        let userID=fire.auth().currentUser.uid

        let dataref=this.props.loggedinCustomer?
            fire.database().ref('Users/Customer/'+userID+'/Orders'):
            fire.database().ref('Users/Artist/'+userID+'/Orders');

        this.setState({orders:[]})
        dataref.on('value',(snap)=>{
            console.log(snap.val())
            
            snap.forEach((childsnap)=>{
                console.log(childsnap.val())

                let dataref2=fire.database().ref('Orders/'+childsnap.val());

                dataref2.on('value',(snap)=>{
                    console.log(snap.val())
                    this.setState((prev)=>({
                        orders:[...prev.orders,snap.val()]
                    }))
                })

            })
        })
    }




    componentDidMount(){

        this.updateOrders();

    }
    

    render() {
        return (
            <div className='orders'>
                {
                    this.state.orders.map(order=>{
                        return(
                            <SingleOrder order={order} loggedinCustomer={this.props.loggedinCustomer}/>
                        )
                    })
                } 
            </div>
        )
    }
}

export default Orders
