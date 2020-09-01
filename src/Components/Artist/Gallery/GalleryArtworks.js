import React, { Component } from 'react'

import fire from "../../config/fire";
import './Gallery.css';


class GalleryArtworks extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             artworkData:this.props.data
        }
    }
    

    // dragHandler=(e)=>{
    //     console.log(e.target.src)
    // }

    // dragRemove=()=>{
    //     console.log('remove')
    // }



    updatePrice=(value)=>{
        //e.preventDefault()
        // console.log(e.target.getAttribute('data')+" "+e.target.value)
  // console.log(e.keyCode)
        if(value>=0)
            this.setState({
                artworkData:{
                    basePrice:value
                }
            })
      //  else if(value=NaN)
            




    }


    deleteImage=(e)=>{
        let key=e.target.getAttribute('dataKey')
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
            <div className="image-item" key={url} style={{position:'relative',display:'flex'}}>
                <img className='i-item' src={url} onDragStart={this.dragHandler} onDragEnd={this.dragRemove}/>
                <input type='number' className='price' data={url} min='0'  onChange={e=>this.updatePrice(e.target.value)} value={this.state.artworkData.basePrice} />
                <span className='dolors'>$</span>
                <a href="#" className="close delete-image" dataKey={this.props.firekey} onClick={this.deleteImage}></a>
            </div>
        )
    }

}

export default GalleryArtworks
