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

        if(displayFull)
        {
            var classname='art-item-full'
        }
        else{
            var classname='art-item'
        }

        return (
            <div className='art-items' onClick={displayFull?this.addToStyle:null}> 
                <img className={displayFull?'art-item-full':'art-item'} src={url} />
                <p className={displayFull?'art-price-full':'art-price'}>{basePrice}</p>
                <span className={displayFull?'art-dolors-full':'art-dolors'}>$</span>
                {
                    displayFull?
                    <div>
                    <div className='plus-icon'>
                        +
                    </div>
                    
                    </div>:
                    null
                    
                }
            </div>
        )
    }
}

export default SingleArtwork
