import React, { Component } from 'react'
import Modal from "../Modal/Modal";
import Tabs from "../TabLayout/Tabs";
import Login from '../Registration/Login'
import Register from '../Registration/Register'

class ModalForm extends Component {
    render() {
        const {who}=this.props
        return (
            <Modal show={this.props.show} onClose={this.props.onClose}>
                <div className="log-reg-container">
                    <p className="titleReg">{who}</p>
                    <Tabs>
                            <div label='Login'>
                                <Login who={who}/>
                                {/* <button className='reglog'>Login</button> */}
                            </div>
                            <div label='Register'>
                                <Register  who={who} />
                            </div>
                    </Tabs>
                </div>
                
            </Modal>
        )
    }
}

export default ModalForm
