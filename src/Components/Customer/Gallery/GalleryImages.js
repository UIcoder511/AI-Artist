import React, { Component } from 'react'
import './Gallery.css'
import fire from '../../config/fire'

class GalleryImages extends Component {

    // dragHandler=(e)=>{
    //     console.log(e.target.src)
    // }

    // dragRemove=()=>{
    //     console.log('remove')
    // }

    addToContent=()=>{
        this.props.addToContent(this.props.src)
    }

    deleteImage=(e)=>{
            let key=e.target.getAttribute('dataKey')
            let here=this
            const ref=fire.database().ref('Users/Customer/'+here.props.uid+'/Images/'+key)
            ref.remove();
    }

    render() {
        return (
            <div className="image-item" key={this.props.src}  >
                <img className='i-item' src={this.props.src} onClick={this.addToContent}/>
                <a href="#" className="close delete-image" dataKey={this.props.dataKey} onClick={this.deleteImage}></a>
                {/*onDragStart={this.dragHandler} onDragEnd={this.dragRemove}/>*/}
            </div>
        )
    }
}

export default GalleryImages
