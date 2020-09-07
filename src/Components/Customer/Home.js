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

import * as tf from '@tensorflow/tfjs';

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
             },
             styleNet:null,
             transformNet:null
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

       // document.querySelector('body').style.overflow='hidden'
        this.setState({
            showModalAC:true
        })

    }

    onClose=()=>{
       // document.querySelector('body').style.overflow='auto'
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


     ////////////////////////////////////


     loadModel=()=>{


        //var styleRatio=1;
       // this.initializeStyleTransfer();

        Promise.all([
            this.loadStyleModel(),
            this.loadOriginalTransformerModel(),
        ])
        .then(([styleNet, transformNet]) => {
            console.log('Loaded styleNet');
            // this.styleNet = styleNet;
            // this.transformNet = transformNet;

            this.setState({styleNet,transformNet})

            // this.enableStylizeButtons()
            
        })

    }

    
  loadStyleModel=async ()=> {
    //if (!this.StyleNet) {
      const styleNet = await tf.loadGraphModel(
        //'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/yining%2Fmanifest.json?alt=media&token=746c2121-eab8-4c95-bce6-a11432c3f96f'
        //'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/model.json?alt=media&token=5dd6d798-00fc-49db-9f51-6d30d996d983'
       //'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/zmodel.json?alt=media&token=91be1cc3-6421-4982-890b-ee5a9b8abcaf'
      // 'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/modelInV3.json?alt=media&token=e05d1d56-0ba3-4ad5-a978-755483e81bbe'
      // 'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/modelVGG19.json?alt=media&token=6258855d-b1d1-4061-b5bb-34b79d4e4a29'
      // 'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/modelMV2.json?alt=media&token=e263d7e7-2622-46eb-97fb-f4b4152d0859'
       //'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/modelMV2cpy.json?alt=media&token=3268f342-3655-4926-a7c6-f314f0399399'
      // 'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/tmodel.json?alt=media&token=d38eca7f-8a02-46b2-8102-8bfbc10fb022'
      'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/model.json?alt=media&token=5dd6d798-00fc-49db-9f51-6d30d996d983' 
      // 'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/model2.json?alt=media&token=0e7bff37-5634-474c-9862-fd7261edcafb'
      // 'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/modelmodel.json?alt=media&token=e7da912f-4e98-4051-a9de-c63b0e9f81c3'
      );
      //}

    return styleNet;
  }


 loadOriginalTransformerModel=async ()=> {
    //if (!this.originalTransformNet) {
      const originalTransformNet = await tf.loadGraphModel(
        'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/sepmodel.json?alt=media&token=236864f2-2f9b-47a8-a3c6-1400ff7068b5'
        //'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/model2.json?alt=media&token=0e7bff37-5634-474c-9862-fd7261edcafb'
      );
   // }

    return originalTransformNet;
  }











  componentDidMount(){
      this.loadModel();
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
            },
            styleNet,
            transformNet
        }=this.state

        const links=['Gallery','Artists','Orders','Chats']
        let component=null
        switch(this.state.activeLink)
            {
                case 'Gallery':
                   component= <Gallery user={user} addToContent={this.addToContent} loggedinCustomer={true} />
                   break;

                case 'Artists':
                   component= <Artists  user={user} addToStyle={this.addToStyle}/>
                   break;

                case 'Orders':
                    component=<Orders  user={user} loggedinCustomer={true}/>
                    break;

                case 'Chats':
                    component=<Chats  user={user} loggedinCustomer={true}/>
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
                      
                        <ModalAC onClose={this.onClose} show={showModalAC}  >

                                
                                <ModalOrder contentImage={contentImage} styleImage={styleImage} onClose={this.onClose} styleNet={styleNet} transformNet={transformNet}/>
                               
                            
                        </ModalAC>
                    
                    :
                    null
                }
                
                
            </div>
        )
    }
}

export default Home
