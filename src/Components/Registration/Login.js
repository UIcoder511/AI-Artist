import React, { Component } from 'react'
import fire from "../config/fire";
import './logreg.css'

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:''

        }
    }

    login=(e)=>{
        e.preventDefault()
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{

        })
    }

    handler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    

    render() {
        return (
            
                <form className='form'>
                <input autoComplete='on' placeholder='Email' type="text" id="email" className='input' name='email' onChange={this.handler} value={this.state.email}/>
                <input autoComplete='on' placeholder='Password' type="password" id="password" className='input' name='password' onChange={this.handler} value={this.state.password}/> 
                <button type='submit' onClick={this.login} className='inputButton'>Login</button>
                </form>
            
        )
    }
}

export default Login
