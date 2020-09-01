import React, { Component } from 'react'
import GalleryImages from "./GalleryImages";
import Upload from '../../ImageUpload/Upload';

import fire from "../../config/fire";

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
        //  let images=[]
         // this.setState({images:[]})
          const ref=fire.database().ref('Users/Customer/'+this.props.user.uid+'/Images');
          ref.on('value',(s)=>{
              this.setState({images:{}})
              console.log(s);
              s.forEach((cs)=>{
                      console.log(cs.val())
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
           // upload the first file only
           // fileUpload.addEventListener('change', function(evt) 
            //{
           //console.log('File ');
               
    
                   // uploadTask.on
           // }); 
    
    
        }

        
    addToContent=(url)=>{
        this.props.addToContent(url)
    }









        componentDidMount()
        {
           console.log('mounted')
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

            {/* <Gallery images={this.state.images}/> */}

            <div>{

               Object.entries( this.state.images).map(([k,s])=>{

                // return( <div className="image-item" key={s}>
                //     <img className='i-item' src={s} />
                // </div>)

                return(
                    <GalleryImages key={k} dataKey={k} src={s} addToContent={this.addToContent} uid={this.props.user.uid}/>
                )

                })
            }</div>

            {/* <div>{this.updateGallery()}</div> */}
            {/* <div className="image-item">
                <img className='i-item' src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/La_forma.jpg?alt=media&token=cff265d1-ab36-45ad-8f4e-2de5dc26cce7'/>
            </div>
            <div className="image-item">
                <img className='i-item' src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/La_forma.jpg?alt=media&token=cff265d1-ab36-45ad-8f4e-2de5dc26cce7'/>
            </div>
            <div className="image-item">
                <img className='i-item' src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/La_forma.jpg?alt=media&token=cff265d1-ab36-45ad-8f4e-2de5dc26cce7'/>
            </div>
            <div className="image-item">
                <img className='i-item' src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/La_forma.jpg?alt=media&token=cff265d1-ab36-45ad-8f4e-2de5dc26cce7'/>
            </div>
            <div className="image-item">
                <img className='i-item' src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/La_forma.jpg?alt=media&token=cff265d1-ab36-45ad-8f4e-2de5dc26cce7'/>
            </div> */}

        {
        this.state.uploading===true &&
            <Upload done={this.doneUpload} user={this.props.user} file={this.state.file} who='customer'/>
          }
            
            
        </div>
    
   
    
            
        )
    }
}

export default Gallery
