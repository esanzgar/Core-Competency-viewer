import React, { Component } from 'react';
import Parser from 'html-react-parser';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            resourcePath: window.location.href.split('?resourceid='),
        };
    }

    componentDidMount(){
        fetch('http://competencymapper/api/v1/training-resources/krc?_format=json')
            .then((Response)=>Response.json())
            .then((findresponse) =>
            {
                this.setState({data:findresponse})
            });


    }

    render() {

        let name = "";
        let description = "";
        let learningOutcome = "";
        let type = "";
        let provider = "";
        let url = "";

        {this.state.data.map((item, key) => {
                if(item.nid == this.state.resourcePath[1] ){
                    name = item.name;
                    url = item.url;
                    description =   (item.description?item.description:"");
                    learningOutcome =  (item.learningOutcome?item.learningOutcome:"") ;
                    type = item.typeOnlineOrFacetoface;
                    provider = item.provider;

                }
            }
        )}

        return (
            <div className="App">

                <h2> {name} </h2>
                <div><p><strong>Type:</strong> {type} </p><p><strong> URL: </strong> <a href="{url}" target="_blank">{url} </a></p></div>
                <h3>Overview</h3>
                <p>{Parser(description)} </p>
                <h3>Learning Outcomes</h3>
                <p> {Parser(learningOutcome)} </p>
                <h3>Organizers/ Partners</h3>
                <p>Forschungszentrum Juelich</p>
                <h3>Provider</h3>
                {provider}


            </div>
        );
    }
}



export default App;
