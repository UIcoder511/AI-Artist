import React from 'react';
//import logo from './logo.svg';
import './App.css';
import fire from './Components/config/fire'
import ArtistHome from "./Components/Artist/Home";
import CustomerHome from "./Components/Customer/Home";
import MainHome from "./Components/Registration/MainHome";

import { BoxLoading,NineCellLoading,CircleToBlockLoading } from 'react-loadingg';



//import './AppLoader.scss'

//import Loader from 'react-loaders'

class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       user:null,
      // who:'',
       loggedin:''
    }

    //console.log('co')
  }


  authListner()
  {
    fire.auth().onAuthStateChanged(user =>
      {
         console.log('a')
         if(user)
         {
          
          const ref=fire.database().ref('Users/Customer');
          //const ref2=fire.database().ref('Users/Artist');

          (async ()=>{
            await ref.once('value')
              .then(d=>{
                  const isCoustomer=d.hasChild(user.uid)
                  console.log(isCoustomer)
                  if(isCoustomer)
                    this.setState({loggedin:'Customer',user:user})
                  else
                    this.setState({loggedin:'Artist',user:user})
              })
      
          // await ref2.once('value')
          // .then(d=>{
          //   console.log(d.hasChild(user.uid))
          // })

          })();
            console.log('waited')
         
           // this.setState({user})

         }
            
          else
            this.setState({user:'MainHome'})
      })
    
  }

  componentDidMount(){
    //await this.checkUser();
    this.authListner();
  }


  renderFakeSass() {
    return `$primary-color: $my-brand-color;
        @import 'loaders.css/src/animations/ball-rotate.scss'
        .loader-hidden {
          display: none;
        }
        .loader-active {
          display: block;
        }`
  }

  
  render()
  {





    
    const user=this.state.user
    console.log(user)


    if(user==null)
    {
      return( <CircleToBlockLoading />)
    }


    if(user!='MainHome')
    {
      console.log(user.emailVerified)
      
      
      if(user.emailVerified)
      {
        console.log('here')
        if(this.state.loggedin==='Artist')
        {
          return(<div><ArtistHome user={user}/></div>)
        }
        else if(this.state.loggedin==='Customer'){
          return(<div><CustomerHome user={user}/></div>)
        }



      }
      else{

        alert('Please, Verify email')
        fire.auth().signOut()
        return(<MainHome />)

      }
     // const data=fire.database().ref()

        
    }
    else{

      return (
        // <div>
        //   {this.state.user ? (<Home/>) : (<Register/>)}
        // </div>
        <>
        {/* <Loader type="ball-rotate" /> */}
        {/* {this.renderFakeSass()} */}
        <MainHome />
        </>
        
      );

    }

  
    

  }
  

 
}

export default App;
