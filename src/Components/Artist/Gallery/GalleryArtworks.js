import React, { Component } from 'react'

import fire from "../../config/fire";



class GalleryArtworks extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             artworkData:this.props.data
        }
    }
   



    updatePrice=(value)=>{
        
        if(value>=0)
            this.setState({
                artworkData:{
                    basePrice:value
                }
            })
      //  else if(value=NaN)
            




    }


    deleteImage=(e)=>{
        let key=e.target.getAttribute('datakey')
        let here=this
        const ref=fire.database().ref('Users/Artist/'+here.props.user.uid+'/Artworks/'+key)
        ref.remove();
    }




    componentDidUpdate()
    {

        const ref=fire.database().ref('Users/Artist/'+this.props.user.uid+'/Artworks/'+this.props.firekey)

        ref.update({
            basePrice:(this.state.artworkData.basePrice)
        })

    }


    render() {
        const {
            data:{
                url,
                basePrice
            }
            }=this.props

        return (
            <div className="image-item" key={url} >
                <img className='i-item' src={url} />
                <div className='close-container' onClick={this.deleteImage} > <a href="#" className="close delete-image" datakey={this.props.datakey} ></a> </div>
                
                <input type='number' className='price' data={url} min='0'  onChange={e=>this.updatePrice(e.target.value)} value={this.state.artworkData.basePrice} />
                <span className='dolors'>$</span>
                
            </div>
        )
    }

}

export default GalleryArtworks
