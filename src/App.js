import React from 'react';
import './App.css';
import fire from './Components/config/fire'
import ArtistHome from "./Components/Artist/Home";
import CustomerHome from "./Components/Customer/Home";
import MainHome from "./Components/Registration/MainHome";

import {CircleToBlockLoading } from 'react-loadingg';




class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       user:null,
       loggedin:''
    }

  
  }


  authListner()
  {
    fire.auth().onAuthStateChanged(user =>
      {
         console.log('a')
         if(user)
         {
          
          const ref=fire.database().ref('Users/Customer');
          

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
      
        

          })();
            console.log('waited')
         
           
         }
            
          else
            this.setState({user:'MainHome'})
      })
    
  }

  componentDidMount(){
   
    this.authListner();
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
    

        
    }
    else{

      return (
        
        <>
          <MainHome />
        </>
        
      );

    }

  
    

  }
  

 
}

export default App;
