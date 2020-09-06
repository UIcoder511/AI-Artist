import React, { Component } from 'react'
// import img from './IMG.png';
//import logosvg from "./slack-new-logo.svg";


import logosvg from "../svg/AI_artistLogo3.svg";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
// import ProfileOps from './ProfileOps';
import ProfilePic from './ProfilePic';

class Nav extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             activeLink:this.props.activeLink,
             isOpenProfileProps:false
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

    
    checker=(e)=>{
        console.log(e.target)
        if (!document.getElementById('myNav').contains(e.target)){
            console.log('removed')
            window.removeEventListener('mousedown',this.checker);
            document.getElementById('myNav').className = "nav-links";
          } 
    }


    makeClassResponsive=()=>{
        let x=document.getElementById('myNav');
   

        if (x.className === "nav-links"){// && y.className==="lout") {
            
                window.addEventListener('mousedown',this.checker);

                x.className += " nav-responsive";
   
            
            // y.className += " lout-responsive"
          } else {
            window.removeEventListener('mousedown',this.checker);
            x.className = "nav-links";
            // y.className = "lout"
          }
          
    }

    
  
  


    render() {
        console.log("render Nav.js");
        const {links}=this.props
        const navLink='nav-link'
        const navActive=' nav-link nav-active'


        return (<>
            <div className='nav'>

                
                <img src='https://firebasestorage.googleapis.com/v0/b/ai-artist-511.appspot.com/o/Logo%2FAI_artistLogo3.svg?alt=media&token=a4cf9e22-d724-4eae-b752-c06d1ffb5390' className='logo-svg logo-left' />

                   <div className="nav-links" id='myNav'>
                        <ul>
                            {/* <li className='nav-link' onClick={this.chnageNavActive}><a>Gallery</a></li>
                            <li className='nav-link' onClick={this.chnageNavActive}><a>Artists</a></li>
                            <li className='nav-link' onClick={this.chnageNavActive}><a>Orders</a></li> */}
                            {
                                links.map(link=>{
                                     return <li className={this.props.activeLink===link?`${navActive}`:`${navLink}`} ><a onClick={this.changeNavActive}>{link}</a></li>
                                })
                            }


                        </ul>
                     </div>

                    <ProfilePic dp={this.props.user.photoURL} name={this.props.user.displayName}/>       
                    
                    <div id="navButton">
                         <FontAwesomeIcon icon={faBars} onClick={this.makeClassResponsive}/>
                     </div> 
                
               
                
                     
                     

                     {/* <div className="user-name">
                            {this.props.user.displayName}
                     </div> */}

                     {/* <button id='logout-btn' onClick={this.logout} className='lout'>Logout</button> */}

                      
                </div>

               
       </> )
    }
}

export default Nav
