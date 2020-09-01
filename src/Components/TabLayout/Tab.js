import React, { Component } from 'react'
import './tabstyle.css'

class Tab extends Component {

    onClickLis=()=>{
        const {label,onClick}=this.props
        onClick(label)
    }

    
    

    render() {

        const {activeTab,label}=this.props

        let className = 'tab-list-item';

        if (activeTab === label) {
            className += ' tab-list-active';
        }

        return (
            <li className={className} onClick={this.onClickLis}>
                {label}
            </li>
        )
    }
}

export default Tab
