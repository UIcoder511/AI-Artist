import React, { Component } from 'react'
// import img from './IMG.png';
//import logosvg from "./slack-new-logo.svg";


import logosvg from "../svg/AI_artistLogo3.svg";
import fire from "../config/fire";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             activeLink:this.props.activeLink
        }
    }


    changeNavActive=(e)=>{
        let view=e.target.innerHTML
       // console.log(e.target.innerHTML)
        this.setState({
            activeLink:view
        })

        this.props.changeView(view)
    }


    makeClassResponsive=()=>{
        let x=document.getElementById('myNav');
        let y=document.getElementById('logout-btn');

        if (x.className === "nav-links" && y.className==="lout") {
            x.className += " nav-responsive";
            y.className += " lout-responsive"
          } else {
            x.className = "nav-links";
            y.className = "lout"
          }
    }

    
    logout=(e)=>{
        e.preventDefault()
        fire.auth().signOut();  
    }
  


    render() {

        const {links}=this.props
        const navLink='nav-link'
        const navActive=' nav-link nav-active'


        return (
            <div className='nav'>
                <div className='profile-pic-div'>
                     <img className='profile-pic' src={this.props.user.photoURL}/>
                </div>
                <div className="user-name">
                            {this.props.user.displayName}
                </div>
                <div className='logo-left'>
                     <img src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/Logo%2FAI_artistLogo3.svg?alt=media&token=a4cf9e22-d724-4eae-b752-c06d1ffb5390' className='logo-svg' style={{width:'59px'}}/>
                </div>
                     
                     <div className="nav-links" id='myNav'>
                        <ul>
                            {/* <li className='nav-link' onClick={this.chnageNavActive}><a>Gallery</a></li>
                            <li className='nav-link' onClick={this.chnageNavActive}><a>Artists</a></li>
                            <li className='nav-link' onClick={this.chnageNavActive}><a>Orders</a></li> */}
                            {
                                links.map(link=>{
                                     return <li className={this.props.activeLink===link?`${navActive}`:`${navLink}`} onClick={this.changeNavActive}><a>{link}</a></li>
                                })
                            }


                        </ul>
                     </div>

                     

                     <button id='logout-btn' onClick={this.logout} className='lout'>Logout</button>

                     <div id="navButton">
                         <FontAwesomeIcon icon={faBars} onClick={this.makeClassResponsive}/>
                     </div>  
                </div>
        )
    }
}

export default Nav
