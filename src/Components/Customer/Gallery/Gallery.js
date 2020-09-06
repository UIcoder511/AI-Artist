import React, { Component } from 'react'
import GalleryImages from "./GalleryImages";
import Upload from '../../ImageUpload/Upload';

import fire from "../../config/fire";
import GalleryArtworks from '../../Artist/Gallery/GalleryArtworks';

export class Gallery extends Component {



    constructor(props) {
        super(props)
    
        this.state = {
            images:{},
            uploading:false,
            file:null
             
        }
    }



    updateGallery=()=>{
        
          const ref=this.props.loggedinCustomer?
            fire.database().ref('Users/Customer/'+this.props.user.uid+'/Images'):
            fire.database().ref('Users/Artist/'+this.props.user.uid+'/Artworks');

          ref.on('value',(s)=>{
              this.setState({images:{}})
              console.log(s);
              s.forEach((cs)=>{
                    //  console.log(cs.val())
                      this.setState(prevState => ({
                          images: {
                              ...prevState.images, [cs.key]:cs.val()
                            }
                        }));
                      //images.push(cs.val().toString())
                      
              })
  
          })

        }


          doneUpload=(str)=>{
            console.log(str)
            this.setState({
                uploading:false,
                file:null
            })
            
        }


        addImage=(e)=>{
            console.log(e)
            let firstFile = e.target.files[0];
    
            this.setState({
                uploading:true,
                file:firstFile
            })
          
    
    
        }

        //Only cutomer//////////////
    addToContent=(url)=>{
        this.props.addToContent(url)
    }









        componentDidMount()
        {
        //    console.log('mounted')
           this.updateGallery();
            
        }



    
    

    render() {
        return (

            <div className="gallery">
            <div className="image-item">
                <label htmlFor="i-upload" className="add-image-label">
                        +
                </label>
                <input id='i-upload' type='file' accept="image/*" onChange={this.addImage} className='add-image' style={{display:'none'}} />
            </div>

           

            {

               Object.entries( this.state.images).map(([k,s])=>{

                console.log(s)

                if(this.props.loggedinCustomer)
                    return(
                        <GalleryImages key={k} datakey={k} src={s} addToContent={this.addToContent} uid={this.props.user.uid}/>
                    )
                else
                    return <GalleryArtworks key={k}  firekey={k} data={s} user={this.props.user} />    

                

              
               

                })
            }

           

        {
        this.state.uploading===true &&
            <Upload done={this.doneUpload} user={this.props.user} file={this.state.file} who='customer'/>
          }
            
            
        </div>
    
   
    
            
        )
    }
}

export default Gallery
