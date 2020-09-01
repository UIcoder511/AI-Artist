import React, { Component } from 'react'
import "./OrderModal.css";
import * as tf from '@tensorflow/tfjs';


import AddressPicker from "./AddressPicker";
import fire from '../../config/fire';

class ModalOrder extends Component {



  constructor(props) {
    super(props)
  
    this.state = {
        displayAddress:false,
        canvasBase64:''
    }
  }



  




    
    ////////////////////////////////////


    loadModel=()=>{


        var styleRatio=1;
        this.initializeStyleTransfer();

        Promise.all([
        this.loadStyleModel(),
        
        this.loadOriginalTransformerModel(),
        ]).then(([styleNet, transformNet]) => {
        console.log('Loaded styleNet');
        this.styleNet = styleNet;
        this.transformNet = transformNet;
        // this.enableStylizeButtons()
        this.styleButton.textContent = 'Create';
        })

    }

    
  loadStyleModel=async ()=> {
    if (!this.StyleNet) {
      this.StyleNet = await tf.loadGraphModel(
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
      }

    return this.StyleNet;
  }


  async loadOriginalTransformerModel() {
    if (!this.originalTransformNet) {
      this.originalTransformNet = await tf.loadGraphModel(
        'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/sepmodel.json?alt=media&token=236864f2-2f9b-47a8-a3c6-1400ff7068b5'
        //'https://firebasestorage.googleapis.com/v0/b/voicemusic-8f29b.appspot.com/o/model2.json?alt=media&token=0e7bff37-5634-474c-9862-fd7261edcafb'
      );
    }

    return this.originalTransformNet;
  }





    
      initializeStyleTransfer=()=> {
        // Initialize images
        // <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.5.1/dist/tf.min.js"></script>
        this.contentImg = document.getElementById('content-image');
        // this.contentImg.onerror = () => {
        //   alert("Error loading " + this.contentImg.src + ".");
        // }
        this.styleImg = document.getElementById('style-image');
        // this.styleImg.onerror = () => {
        //   alert("Error loading " + this.styleImg.src + ".");
        // }
        this.stylized = document.getElementById('stylized-image');
        console.log('aaaaaaa')
    
        this.styleButton = document.getElementById('style-btn');
        this.styleButton.onclick = () => {
         
          this.startStyling();
        };
      }
    
    
      startStyling=async ()=> {
    
      
        
    
   
        await tf.nextFrame();
        this.styleButton.textContent = 'Generating';
        await tf.nextFrame();
        let bottleneck = await tf.tidy(() => {
          const styleimage=tf.browser.fromPixels(this.styleImg)//.toFloat().div(tf.scalar(255)).expandDims()
          const tensor_style=styleimage.toFloat().div(tf.scalar(255)).expandDims();
          console.log(styleimage)
          console.log(tensor_style)
          const opiv3=this.styleNet.predict(tensor_style);
          return opiv3
        })
       
        this.styleButton.textContent = 'Stylizing';
        await tf.nextFrame();
        const stylized = await tf.tidy(() => {
          const contentimagetensor=tf.browser.fromPixels(this.contentImg).toFloat().div(tf.scalar(255)).expandDims()
          const op=this.transformNet.predict([contentimagetensor, bottleneck])
          const opimage=op.squeeze();
          return opimage
        })
        await tf.browser.toPixels(stylized, this.stylized);



        var image = this.stylized.toDataURL("image/jpg");
        this.setState({
          canvasBase64:image
        })

       // this.uploadBase64Image();


        this.styleButton.textContent = 'Order Now';
        this.styleButton.setAttribute('id','order-now')
        this.styleButton.onclick = () => {
         
            this.orderNow();
          };

        bottleneck.dispose();  
        stylized.dispose();
    
    
      }
      //////////////////////////


      orderNow=()=>{
          console.log('order-now')

          this.setState({
            displayAddress:true
          })
      }





      componentDidMount()
    {
        // console.log('loaded')
      //  if(this.props.ACwidth)
             this.loadModel()



    }


    


    render() {

        
    let displayButtons={
        display:'none'
    }

    if(!this.state.displayAddress)
      if( this.props.contentImage.url!=null && 
          this.props.styleImage.url!=null)
          {
              displayButtons={
                  display:'block'
              }
          }




        return (
            <div>
                <div className='ACimage-container'>
                                    <div>
                                         <span className='titleAC'>content Image</span>

                                         <img crossOrigin="anonymous" src={this.props.contentImage.url} alt='select Image from Gallery' className='content-image' id='content-image' />
                                    </div>
                                    <div>
                                        <span className='titleAC'>Style Image</span>
                                        <img crossOrigin="anonymous" src={this.props.styleImage.url} alt='select Artwork' className='style-image' id='style-image' />
                                    </div>
                                    <div>
                                        <span className='titleAC'>Output Image</span>
                                        <canvas  alt='Stylized Image' className='stylized-image' id='stylized-image' />
                                    </div>
                                    <br/>
                                    
                                   
                                                       
                                     
                </div>
                
               
                
                

                                
                <div style={displayButtons}> 
                        <button type="button" id="style-btn">Loading model</button>
                        {/* <button type='button' id="order-now">Order Now</button> */}
                </div>
                
                {
                  this.state.displayAddress?
                      <AddressPicker contentImage={this.props.contentImage} styleImage={this.props.styleImage} stylizedBase64={this.state.canvasBase64}/>
                      :null
                }

            </div>
        )
    }
}

export default ModalOrder
