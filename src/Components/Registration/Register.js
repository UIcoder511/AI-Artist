import React, { Component } from 'react'
import fire from "../config/fire";
import './logreg.css'
import Upload from '../ImageUpload/Upload';


const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const validation=({regErrors,...other})=>{

    let valid=true

    Object.values(regErrors).forEach(v=>{
        v.length>0 && (valid=false);
    })

    Object.values(other).forEach(v=>{
        v==='' && (valid=false);
    })

    return valid
    
    

}

class Register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             name:'',
             profilePic:null,
             profilePicUrl:null,
             regErrors:{
                 email:'',
                 password:'',
                 name:''
             }
        }
    }

    register=(e)=>{
        e.preventDefault()
        

        if(validation(this.state))
        {
            console.log('h')
            fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
                const ui=u.user.uid
    
                fire.auth().currentUser.sendEmailVerification().then(function() {
                    alert('Email Verification Sent!');
                    });
    
                fire.database().ref('Users/'+this.props.who+'/'+ui).set({
                    email:this.state.email,
                    //password:this.state.password,
                    name:this.state.name,
                    profilePic:this.state.profilePicUrl,
                    userId:ui
                   // who:this.props.who
                 }).then(x=>{
                     u.user.updateProfile({
                         displayName:this.state.name,
                         photoURL:this.state.profilePicUrl
                        })
                 })
    
                fire.auth().signOut();
               
                
            }).catch((err)=>{
                console.log(err)
            })

            
        }
        else{
            console.error('NO VALIDATION')
        }


    }

    handler=(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        const {regErrors}=this.state

        switch(name)
        {
            case 'name':
            {
                regErrors.name=value.length<3?'minimum 3 characters required':'';
                break;
            }
            case 'password':
            {
                regErrors.password=value.length<6?'minimum 6 characters required':'';
                break;
            }
            case 'email':
            {
                regErrors.email=emailRegex.test(value)?'':'Invalid email';
                break;
            }
            default:
                break;
            

        }
        
        this.setState({
            [name]:value,
            regErrors
        })
    }



    uploadProfilePic=(e)=>{
        let file = e.target.files[0];
        let self=this;
        let storageRef = fire.storage().ref();
        let uploadTask = storageRef.child(file.name).put(file)
        
        uploadTask.on('state_changed'
            
            ,(snapshot)=>{
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
               // let pro=parseInt(progress*(20)/100)
                //console.log('width'+pro)
                //imagee.style.width=pro+'vw';

            }
            ,(error)=>{
                console.log(console.error);
                
            }
            ,() => {
                uploadTask.snapshot.ref.getDownloadURL()
                .then(function(downloadURL) 
                    {
                        console.log('File available at', downloadURL);
                        self.setState({
                            profilePicUrl:downloadURL
                        })
                       // DPURL=downloadURL;
                    });  // Will return a promise with the download link
            }
            
            )
        
    }








    

    render() {

        const {regErrors}=this.state
        const {who}=this.props
         const bgcolor=who==='Artist'?{backgroundColor:'#dd2600'}:{backgroundColor:'dd2600'}//'#2067ba'}

        return (
            
                <form noValidate className='form'>

                <input
                  placeholder='Name'
                  type="text"
                  id="name"
                  name='name'
                  className={regErrors.name.length>0?'input error':'input'} 
                  onChange={this.handler}
                  value={this.state.name} 
                  />
                  <span className='errorMessage'>{regErrors.name}</span> 
                
                <input 
                    placeholder='Email' 
                    type="text" 
                    id="email" 
                    name='email' 
                    className={regErrors.email.length>0?'input error':'input'} 
                    onChange={this.handler} 
                    value={this.state.email}
                    />
                    <span className='errorMessage'>{regErrors.email}</span> 

                    {/* <br/> */}
                
                <input 
                    placeholder='Password' 
                    type="password" 
                    id="password" 
                    name='password' 
                    className={regErrors.password.length>0?'input error':'input'}  
                    onChange={this.handler} 
                    value={this.state.password}
                    />
                    <span className='errorMessage'>{regErrors.password}</span> 

                <input
                    type='file'
                    name='profilePic'
                    className='profile-pic-btn'
                    onChange={this.uploadProfilePic}
                    accept="image/*"
                    />
                
                <button 
                    type='submit' 
                    onClick={this.register} 
                    className='inputButton'
                    >Register</button>
                </form>
            
        )
    }
}

export default Register
