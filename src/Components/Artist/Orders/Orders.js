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
        let aId=fire.auth().currentUser.uid
        let dataref=fire.database().ref('Users/Artist/'+aId+'/Orders');
        
        dataref.on('value',(snap)=>{
            console.log(snap.val())
            this.setState({orders:[]})
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
            <div>
                {
                    this.state.orders.map(order=>{
                        return(
                            <SingleOrder order={order}/>
                        )
                    })
                } 
            </div>
        )
    }
}

export default Orders
