import React, { Component } from 'react'
import './Artists.css'
import SingleArtwork from './SingleArtwork'
//import backbtn from "../../svg/back-button.svg";

class SingleArtist extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             openFull:false,
             openArtist:null
        }
    }


    // openFullArtist=()=>{
    //     this.props.openFull()
    // }
    addToStyle=(artdata,uid,an,ae,ap)=>{
                this.props.addToStyle(artdata,uid,an,ae,ap)
    }
    

    render() {

        const {
            openFull,
            displayFull,
            goBack,
            artistData:{
                email,
                name,
                profilePic,
                Artworks,
                userId
            }
         }=this.props

         //const x=Artworks.slice(0,2)
         if(!displayFull)
            var three=Object.keys(Artworks).slice(0,3).map(key => ({[key]:Artworks[key]}));
        else
            var three=Object.keys(Artworks).map(key => ({[key]:Artworks[key]}));
       // console.log(three)
        // Object.entries(three).map(([x,y])=>{
        //     console.log(y)
        // })

         //console.log(a)
       
        
         
            return (
                <div className={displayFull?'full-single-artist':'single-artist'} onClick={!displayFull?()=>openFull(this.props.artistData):null}> 
                        
                    <img src={profilePic} className='artist-pic'/>

                    <p className='artist-name'>{name}</p>

                    <div className={displayFull?"full-all-artworks":"all-artworks"}>
                        {
                            Object.entries(three).map(([key,art])=>{
                               return( <SingleArtwork userId={userId} artistemail={email} artistname={name} artistpic={profilePic}  artdata={Object.values(art)[0]} firekey={Object.keys(art)[0]} displayFull={displayFull} addToStyle={this.addToStyle} />)
                            })
                        }
                       
                    </div>
                    {
                        displayFull?
                        <div className='back-btn'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/Logo%2Fback-button.svg?alt=media&token=ad8cbbca-6a2c-4100-824e-c8747e49b535' className='back-btn-icon' onClick={()=>goBack()}/>
                        </div>
                        :
                        null
                    }
                   
                </div>
            )
         
        
    }
}

export default SingleArtist
