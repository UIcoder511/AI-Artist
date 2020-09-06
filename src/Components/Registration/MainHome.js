import React, { Component } from 'react'
import ModalForm from '../Registration/ModalForm'
import './mainHome.css'


class MainHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            who:'',
            showModal:false
        }
    }
    


    openArtistReg=()=>{

        this.setState({
            who:'Artist'
        })
        this.show()
    }

    openCustoreg=()=>{
        this.setState({
            who:'Customer'
        })
        this.show()
    }

    show=()=>
    {
        this.setState({
            showModal:!this.state.showModal
        })
    }

   
   
    render() {
        return (
            <>
            <div className='blured'>
                <div className='mainNav'>
                    <div className='titleMainHome'>AI Artist</div>
                   
                    <img src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/Logo%2FAI_artistLogo3.svg?alt=media&token=a4cf9e22-d724-4eae-b752-c06d1ffb5390' className='logo-center' style={{width:'59px'}}/>
                    
                </div>
               
                <div className='displayGrid'>
                <div className='mainDiv mainartist'  >
                    {/* <p>Are you an<br/> <span>Artist?</span></p> */}
                    <button onClick={this.openArtistReg} className='btn'>Get started</button><br/>
                </div>
                <div className='mainDiv maincustomer'  >
                    {/* <p>Looking for amazing <br/> <span>Paintings?</span></p> */}
                    <button onClick={this.openCustoreg} className='btn'>Get started</button>
                </div>
                </div>
                
                
                
            </div>
                 {this.state.showModal?<ModalForm who={this.state.who} onClose={this.show} show={this.state.showModal}/>:null}
            </>
        )
    }
}

export default MainHome
