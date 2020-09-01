import React, { Component } from 'react'
import fire from "../config/fire";
//import './Artisthome.css'

//import Gallery from "./Gallery";
// import ArtworkGallery from './Gallery/Gallery';
import Gallery from './Gallery/Gallery'

import ArtistNav from "../Nav/Nav";
import Chats from "./Chats/Chats";
import Orders from "./Orders/Orders";

class Home extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
           //  images:[],
             activeLink:'Artworks'
        }
    }
    


   


    logout=()=>{
        fire.auth().signOut();
    }

    changeHomeView=(view)=>{
        this.setState({
            activeLink:view
        })
    }



    render() {
        const {user}=this.props
        const links=['Artworks','Orders','Chats']
        let component=null
        switch(this.state.activeLink)
            {
                case 'Artworks':
                   component= <Gallery user={user}/>
                   break;

                case 'Chats':
                   component= <Chats  user={user} loggedinCustomer={false} />
                   break;

                case 'Orders':
                    component=<Orders  user={user}/>
                   
            }


        
        return (

            <div>
                
                <ArtistNav user={user} activeLink={this.state.activeLink} changeView={this.changeHomeView} links={links}/>




                <div className="content">
                    <p className='title-content'>{this.state.activeLink}</p>

                    {
                        component
                    }
                    
                </div>
                   
                
            </div>


                    /*
            <div>
                <div className='nav'>
                     <div className='logo-left'>
                        Logo
                     </div>
                     <div className="user-name">
                            {this.props.user.displayName}
                     </div>
                     <div className="nav-links">
                        <ul>
                            <li className='nav-active'><a>Artworks</a></li>
                            <li><a>Orders</a></li>

                        </ul>
                     </div>
                     <button id='logout-btn' onClick={this.logout}>Logout</button>
                </div>
                <div className="content">
                    <p className='title-content'>Artworks</p>
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
                                    <ArtworkGallery key={key} data={value[0]} user={this.props.user} firekey={key}/>
                                )

                            })
                            
                            
                            
                          /*  ((s)=>{

                            // return( <div className="image-item" key={s}>
                            //     <img className='i-item' src={s} />
                            // </div>)
                            console.log(s)

                            return(
                                <ArtworkGallery key={s[0].key} data={s[0]} user={this.props.user} firekey={s[0].key}/>
                            )

                            })  
                        }</div>

                    </div>
                </div>
                
                
            </div>
            */
        )
    }
}

export default Home
