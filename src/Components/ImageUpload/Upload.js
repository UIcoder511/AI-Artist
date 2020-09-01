import React, { Component } from 'react'
import fire from "../config/fire";
import './Upload.css'
//import Modal from "../Modal/Modal";

class Upload extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             done:false,
             url:null
        }
    }
    



    makeid=(length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

     uploadImage=()=>{

        document.getElementsByTagName('body')[0].style.overflow='hidden';
        let imagee=document.getElementsByClassName('imagee')[0];


        const {user,file,done}= this.props
        let reader=new FileReader();
        // reader.onload=(e)=>{

        //     this.setState({src:e.target.result})

        // }

        reader.onloadend = ()=> {
            this.setState({url:reader.result})

          }

        reader.readAsDataURL(file);
        let self=this
        
        const id=this.makeid(9);        
       // const {}
        let storageRef = fire.storage().ref(user.uid);
        
        let uploadTask = storageRef.child(file.name).put(file)
        
        uploadTask.on('state_changed'
            
            ,(snapshot)=>{
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                let pro=parseInt(progress*(20)/100)
                console.log('width'+pro)
                imagee.style.width=pro+'vw';

            }
            ,(error)=>{
                console.log(console.error);
                
            }
            ,() => {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) 
                    {
                        console.log('File available at', downloadURL);

                        if(self.props.who==='customer')
                        {
                            const reff=fire.database().ref('Users/Customer/'+user.uid+'/Images');
                            reff.update({[id]:downloadURL})
                        }
                            
                        else
                        {
                            const reff=fire.database().ref('Users/Artist/'+user.uid+'/Artworks/'+id);
                           // this.makeid(9)
                            reff.update({
                                url:downloadURL,
                                basePrice:0
                            })

                        }
                            
                        
                       // this.makeid(9)
                       

                    
                        // self.setState({
                        //     done:true
                        // })
                        document.getElementsByTagName('body')[0].style.overflow='auto';
                        done('done')
                       // DPURL=downloadURL;
                    });  // Will return a promise with the download link
            }
            
            )

     }

     componentDidMount(){
        this.uploadImage();
     }


    render() {
       
        if(this.state.done)
        {
            return (
               null
            )
        }
        else
        {
            return (
            <div>
                {/* Upload... */}
                
                
                {/* <img id='loadImage' style={{width:'100px',height:'100px'}} src={this.state.url}/> */}
                     {/* <input type="file" className="fileselect" accept="image/*" onChange="DP()"/> */}
                {/* <Modal onClose={} show={}> */}
                    <div className="imagediv">
                        <img  className='image' src={this.state.url}/>
                    </div>
                    <div className="backgroundGray"></div>
                    <div className="imagetop">
                        <div className="imagee"></div>
                    </div>
                {/* </Modal> */}

            </div>)
        }
       
        
    }
}

export default Upload
