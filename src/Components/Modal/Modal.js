import React, { Component } from 'react'

// import Tabs from "../TabLayout/Tabs";

import './modal.css'


class Modal extends Component {

   

    checker=(e)=>{
        console.log(e.target)
        if (!document.getElementById('modalContent').contains(e.target)){
            //console.log('removed')
            //window.removeEventListener('mousedown',this.checker);
            this.props.onClose();
          } 
    }
    


    onClose=()=>{
      //  document.getElementsByTagName('body')[0].style.overflow='auto';
       // document.querySelector(".blured").style=null;
        this.props.onClose()
    }


    componentDidMount()
    {
        console.log('added')
        window.addEventListener('mousedown',this.checker);
    }


    // componentDidUpdate(){
    //     console.log('didupdate')
    //     if(this.props.show)
    //     {   
            
    //     }
            
    // }

    componentWillUnmount()
    {
        console.log('removed')
        window.removeEventListener('mousedown',this.checker);
    }


    




    render() {
      
            return (
                <div className="modalBack">
                    <div className="modalContent" id="modalContent"> 
                        {/* style={this.props.ACwidth?{width:'55%'}:{width:'40%'}} > */}
                        <div className='close-container' onClick={this.onClose}> <a href="#" className="close" ></a> </div>
                    
                     
        
                        {
                            this.props.children.length?
                                this.props.children.map(child=>{
                                    return(
                                        <>
                                                {child}
                                        </>
                                    )
                                })
                                :
                                this.props.children

                         }
     

                    </div>
                    
                    
                </div>
            )

        
        
    }
}

export default Modal
