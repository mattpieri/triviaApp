import React from "react";

import Header from "./header";
import Title from "./Title";

export default class Layout2 extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Weclome"
        };
    }

    changeTitle(title){
        this.setState({title:title})
    }

    render() {
        return(
            <div>
               <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title}/> 
               
            </div>
        )
    }
}