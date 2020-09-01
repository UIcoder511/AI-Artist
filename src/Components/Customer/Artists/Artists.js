import React, { Component } from 'react'
import fire from '../../config/fire'
import SingleArtist from './SingleArtist'

class Artists extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             artists:[],
             openFull:false,
             openArtistData:null
        }
    }


    updateAtrists=()=>{

        const ref=fire.database().ref('Users/Artist');
        ref.on('value',(s)=>{
            this.setState({artists:[]})
            console.log(s);
            s.forEach((cs)=>{
                    console.log(cs.val()+" "+cs.key)
                    this.setState(prevState => ({
                        artists: [...prevState.artists, cs.val()]
                      }));
                    //images.push(cs.val().toString())
                    
            })

        })
    }

    openFullFunction=(aData)=>{

        this.setState({
            openFull:true,
            openArtistData:aData
        })

    }

    addToStyle=(artdata,uid,an,ae,ap)=>{
        this.props.addToStyle(artdata,uid,an,ae,ap)
    }






    componentDidMount()
    {
        this.updateAtrists()
    }


    
    render() {

        const {openFull,artists,openArtistData}=this.state

        if(openFull)
        {
            console.log(openFull)
            return (
                <div className='full-artist'>
                   
                        {
                            /* Object.values(this.state.openArtistData).map((artist)=>{  */
                        }
                         
                            <SingleArtist artistData={openArtistData} displayFull={openFull} goBack={()=>this.setState({openFull:false,openArtistData:null})} addToStyle={this.addToStyle}/>
                       
                    
                </div>
            )

        }
        else{
            return(<div className='artists'>
                   {   
                        Object.values(artists).map((artist)=>{
                           return(<SingleArtist artistData={artist} displayFull={openFull} openFull={this.openFullFunction}/>)
                       })
                   }
                
            </div>)
        }
        
    }
}

export default Artists
