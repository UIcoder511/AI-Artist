import React, { Component } from 'react'


class SingleArtwork extends Component {


    addToStyle=()=>{
        console.log('sty')
        this.props.addToStyle(this.props.artdata,this.props.userId,this.props.artistname,this.props.artistemail,this.props.artistpic)
    }


    render() {

        const {
            displayFull,
            artdata:{
                basePrice,
                url
                
            }
        }=this.props

        // if(displayFull)
        // {
        //     var classname='art-item-full'
        // }
        // else{
        //     var classname='art-item'
        // }

        return (
            <div className={displayFull?'art-items-full':'art-items'} onClick={displayFull?this.addToStyle:null} data-price={basePrice}> 
                
                <img className={displayFull?'art-item-full':'art-item'} src={url} />
               
            </div>
        )
    }
}

export default SingleArtwork
