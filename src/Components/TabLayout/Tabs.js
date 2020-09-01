import React, { Component } from 'react'
import Tab from "./Tab";
import './tabstyle.css'

class Tabs extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             activeTab:this.props.children[0].props.label
        }
    }


    clickTab=(label)=>
    {
        this.setState({activeTab:label})
    }
    

    render() {
        console.log(this.props)
        const{
            clickTab,
            props:{
                children
            },
            state:{
                activeTab
            }
        }=this

        

        return (
            <div className="tabs">
                <ol className="tab-list">
                    {
                        children.map(child=>{

                            const {label}=child.props;

                            return(
                                <Tab
                                    activeTab={activeTab}
                                    key={label}
                                    label={label}
                                    onClick={clickTab}/>
                            )
                        })
                    }

                </ol>
                <div className="tab-content">

                    {
                        children.map(child=>{
                            if(child.props.label!==activeTab)
                                return undefined
                            else
                                return child.props.children
                        })
                    }


                </div>
            </div>
        )
    }
}

export default Tabs
