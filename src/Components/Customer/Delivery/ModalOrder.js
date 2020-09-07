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

   // this.initializeStyleTransfer();
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
          
      
          this.styleButton = document.getElementById('style-btn');
          this.styleButton.textContent = 'Create';
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
          const opiv3=this.props.styleNet.predict(tensor_style);
          return opiv3
        })
       
        this.styleButton.textContent = 'Stylizing';
        await tf.nextFrame();
        const stylized = await tf.tidy(() => {
          const contentimagetensor=tf.browser.fromPixels(this.contentImg).toFloat().div(tf.scalar(255)).expandDims()
          const op=this.props.transformNet.predict([contentimagetensor, bottleneck])
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

    //   checker=(e)=>{
    //     console.log(e.target)
    //     if (!document.getElementById('modalContent').contains(e.target)){
    //         console.log('removed')
    //         window.removeEventListener('mousedown',this.checker);
    //         this.props.onClose();
    //       } 
    // }





      componentDidMount()
    {
        // console.log('loaded')
      //  if(this.props.ACwidth)
            // console.log('added')
            // window.addEventListener('mousedown',this.checker);
             this.initializeStyleTransfer();



    }

    // componentWillMount(){
    //   window.removeEventListener('mousedown',this.checker);
    // }


    


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
            <>
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

            </>
        )
    }
}

export default ModalOrder
