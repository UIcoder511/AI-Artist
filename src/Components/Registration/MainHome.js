import React, { Component } from 'react'
import ModalForm from '../Registration/ModalForm'
import './mainHome.css'
import customerimg from '../../customer.png'
import artistimg from '../../artist.png'
// import {sho} from "../Modal/ModalStateHandlers";


class MainHome extends Component {

    constructor(props) {
        super(props)
        //this.openArtistReg=this.openArtistReg.bind(this)
        //this.openArtistReg=this.openCustoreg.bind(this)
        this.state = {
            who:'',
            showModal:false
        }
    }
    


    openArtistReg=()=>{

        this.setState({
            who:'Artist'
        })
        this.showModal()
    }

    openCustoreg=()=>{
        this.setState({
            who:'Customer'
        })
        this.showModal()
    }

    showModal=()=>
    {
        this.setState({
            showModal:!this.state.showModal
        })
    }

   
   
    render() {
        return (
            <div>
                <div className='mainNav'>
                    <div className='titleMainHome'>AI Artist</div>
                    <div className='logo-left'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/Logo%2FAI_artistLogo3.svg?alt=media&token=a4cf9e22-d724-4eae-b752-c06d1ffb5390' className='logo-svg' style={{width:'59px'}}/>
                    </div>
                </div>
               
                <div className='displayGrid'>
                <div className='mainDiv mainartist' style={{backgroundImage:`url(${artistimg})`,backgroundSize:'cover'}} >
                    {/* <p>Are you an<br/> <span>Artist?</span></p> */}
                    <button style={{backgroundColor:'#dd2600'}} onClick={this.openArtistReg} className='btn'>Get started</button><br/>
                </div>
                <div className='mainDiv maincustomer' style={{backgroundImage:`url(${customerimg})`,backgroundSize:'cover'}} >
                    {/* <p>Looking for amazing <br/> <span>Paintings?</span></p> */}
                    <button style={{backgroundColor:/*'#2067ba'*/'#dd2600'}} onClick={this.openCustoreg} className='btn'>Get started</button>
                </div>
                </div>
                
                
                <ModalForm who={this.state.who} onClose={this.showModal} show={this.state.showModal}/>
            </div>
        )
    }
}

export default MainHome
