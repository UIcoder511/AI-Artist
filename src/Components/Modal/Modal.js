import React, { Component } from 'react'

// import Tabs from "../TabLayout/Tabs";

import './modal.css'


class Modal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }



        

      



           


        //document.addEventListener('click',this.onCloseOutside)
    }
    


    onClose=()=>{
      //  document.getElementsByTagName('body')[0].style.overflow='auto';
        this.props.onClose()
    }






    










    
    
    



    render() {
        console.log(this.props.children)
       // const {who}=this.props
      // if(this.props.modalData)
         //   const{modalData}=this.props

         
            

        if(!this.props.show)
        {
            return null
        }
        else{
          //  document.getElementsByTagName('body')[0].style.overflow='hidden';
            return (
                <div className="modalBack">
                    <div className="modalContent" style={this.props.ACwidth?{width:'55%'}:{width:'40%'}} >
                    <a href="#" className="close" onClick={this.onClose}></a>
                    
                     
                        {/* { this.props.who===true && <p id="titleReg">Artist</p> } */}
                        {/* {String(this.props.who)} */}
                        {/* { this.props.who===false && <p id="titleReg">Customer</p> } */}
                       
                        {/* <div className="inner">&nbsp;</div> */}

                        {
                           
                        this.props.children.map(child=>{

                            const {label}=child.props;

                            return(
                                <div
                                   
                                    key={label}
                                    label={label}
                                    >
                                        {child}
                                </div>
                            )
                        })
                         }
                     
                     
                    
                     
                    

                    </div>
                    
                    
                </div>
            )

        }
        
    }
}

export default Modal
