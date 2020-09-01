import React, { Component } from 'react'

import GalleryArtworks from "./GalleryArtworks";
import Upload from "../../ImageUpload/Upload";
import fire from "../../config/fire";

export class Gallery extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             images:[],
             uploading:false,
             file:null
        }
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

    /*
       // fileUpload.addEventListener('change', function(evt) 
        //{
       //console.log('File ');
            const id=this.makeid(9);
            const {uid}  = this.props.user
            let storageRef = fire.storage().ref(uid);
            let firstFile = e.target.files[0]; // upload the first file only
            let uploadTask = storageRef.child(e.target.files[0].name).put(firstFile)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(function(downloadURL) 
                        {
                            console.log('File available at', downloadURL);
                            const reff=fire.database().ref('Users/Artist/'+uid+'/Artworks/'+id);
                           // this.makeid(9)
                            reff.update({
                                url:downloadURL,
                                basePrice:0
                            })

                           // DPURL=downloadURL;
                        });  // Will return a promise with the download link
                })
       // }); 


    }*/


    updateGallery=()=>{
      //  let images=[]
       // this.setState({images:[]})
        const ref=fire.database().ref('Users/Artist/'+this.props.user.uid+'/Artworks');
        ref.on('value',(s)=>{
            this.setState({images:[]})
            console.log(s);
            s.forEach((cs)=>{

                    console.log(cs.key)
                    this.setState(prevState => ({
                        images:{
                            ...prevState.images,[cs.key]:[cs.val()]
                        } 
                        
                      }));
                    //images.push(cs.val().toString())
                    
            })

        })
    //return <p>{images}</p>
       
    }





    
    componentDidMount()
    {
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


           

            <div>{
                Object.entries(this.state.images).map( ([key,value])=>{

                    console.log(key+"|"+value )

                    return(
                        <GalleryArtworks key={key} data={value[0]} user={this.props.user} firekey={key} />
                    )

                })
            }
            </div>


                    {
                this.state.uploading===true &&
                    <Upload done={this.doneUpload} user={this.props.user} file={this.state.file} who='Artist'/>
                }


            </div>

        )
    }
}

export default Gallery
