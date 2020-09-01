import React, { Component } from 'react'
import fire from "../config/fire";
import './Customerhome.css'
//import Upload from "../ImageUpload/Upload";


import Gallery from "./Gallery/Gallery";
import Artists from "./Artists/Artists";
import Orders from "./Orders/Orders";
// import ArtworkGalleryImages from './GalleryImages';
import CustomerNav from '../Nav/Nav';

import ModalAC from "../Modal/Modal";
import ModalOrder from "./Delivery/ModalOrder";


import Chats from './Chats/Chats';

//const tf = require('@tensorflow/tfjs');

class Home extends Component {



    constructor(props) {
        super(props)
    
        this.state = {

             activeLink:'Gallery',
             displayFloat:true,
             showModalAC:false,
             floatData:{
                 contentImage:{
                     
                     url:null
                 },
                 styleImage:{
                    price:null,
                    url:null,
                    artistId:null,
                    artistpic:null,
                    artistemail:null,
                    artistname:null
                },
                 opImage:{
                    price:null,
                    url:null
                }
             }
        }





    }






    

    logout=(e)=>{
        e.preventDefault()
        fire.auth().signOut();  
    }

 

 
 



    //return <p>{images}</p>
       
    

    changeHomeView=(view)=>{
        this.setState({
            activeLink:view
        })
    }


    showModalArtContent=()=>{

        document.querySelector('body').style.overflow='hidden'
        this.setState({
            showModalAC:true
        })

    }

    closeModalArtContent=()=>{
        document.querySelector('body').style.overflow='auto'
        this.setState({
            showModalAC:false
        })
    }



    addToStyle=(artdata,uid,an,ae,ap)=>{
        // this.props.addtoStyle(artdata)
            

            this.setState((prev) => ({
                floatData:
                {
                    ...prev.floatData,
                    styleImage:
                    {
                        url:artdata.url,
                        price:artdata.basePrice,
                        artistId:uid,
                        artistpic:ap,
                        artistemail:ae,
                        artistname:an
                    }
                }
              }));

            
    }

    addToContent=(url)=>{

        this.setState((prev) => ({
            floatData:
            {
                ...prev.floatData,
                contentImage:
                {
                    url:url
                   
                }
            }
          }));

    }









   

















    render() {
        const {user}=this.props

        const {
            activeLink,
            displayFloat,
            showModalAC,
            floatData:{
                contentImage,
                styleImage,
                opImage
            }
        }=this.state

        const links=['Gallery','Artists','Orders','Chats']
        let component=null
        switch(this.state.activeLink)
            {
                case 'Gallery':
                   component= <Gallery user={user} addToContent={this.addToContent}/>
                   break;

                case 'Artists':
                   component= <Artists  user={user} addToStyle={this.addToStyle}/>
                   break;

                case 'Orders':
                    component=<Orders  user={user}/>
                    break;

                case 'Chats':
                    component=<Chats  user={user}/>
                    break;
                   
            }

       

        
        return (
            <div>
                
                <CustomerNav user={user} activeLink={activeLink} changeView={this.changeHomeView} links={links}/>




                <div className="content">
                    <p className='title-content'>{activeLink}</p>

                    {
                        component
                    }
                    
                </div>
                {
                    displayFloat?
                        <div className='float-container' onClick={this.showModalArtContent}>
                             <img className='float-image' src='https://i7.uihere.com/icons/927/231/601/apply-b0270af46b551f9f9713ed9533885806.svg' />
                        </div>
                    :null
                }

                {
                    showModalAC?
                      <div className='grid-container'>
                        <ModalAC onClose={this.closeModalArtContent} show={this.showModalArtContent} displayOrder={true} ACwidth={true}>

                                <div></div>
                                <ModalOrder contentImage={contentImage} styleImage={styleImage}/>

                                {/* <AddressPicker contentImage={this.props.contentImage} styleImage={this.props.styleImage} stylizedBase64={this.state.canvasBase64}/> */}
                      

                                
                                {/* <div className='style-image-container'>
                                    <img src={styleImage} alt='select Artwork' className='style-image' />
                                </div>
                                <div className='stylized-image-container'>
                                    <canvas src={opImage} alt='Stylized Image' className='stylized-image' /> 
                                </div> */}
                               
                            
                        </ModalAC>
                    </div>
                    :
                    null
                }
                
                
            </div>
        )
    }
}

export default Home
