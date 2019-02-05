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
        //fetch('http://competencymapper/api/v1/training-resources/krc?_format=json')
        fetch('http://dev-competency-mapper.pantheonsite.io/api/v1/training-resources/all?_format=json')
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
      let organisers = "";
      let type = "";
      let provider = "";
      let url = "";
      let domains = [];
      let attribute_types= ["Knowledge","Skills","Attitude"];

      {this.state.data.map((item, key) => {
              if(item.id == this.state.resourcePath[1] ){
                name = item.title;
                  url = item.url;
                  description =   (item.description?item.description:"");
                  learningOutcome =  (item.learningOutcome?item.learningOutcome:"");
                  organisers = (item.organisers?item.organisers:"");
                  //type = item.typeOnlineOrFacetoface;
                  type = item.type;
                  //provider = item.provider;
                  provider = "Some provider";
                  item.competency_profile.map((profile) =>{
                    profile.domains.map((domain) =>{
                        domains.push(domain.title);
                    });
                  });

              }
          }
      )}

      const Profile = this.state.data.map((item, key) => {
          if(item.id == this.state.resourcePath[1]) {
              return item.competency_profile.map((profile) => {
                  return <ul>{
                      profile.domains.map((domain)=> {
                           return   <div>
                                  <h4>{domain.title}</h4>
                                  <ul>{domain.competencies.map((competency) =>
                                      <li> {competency.title}
                                          <ul>{attribute_types.map((type) =>
                                                  <span>
                                                {competency.attributes.map((attribute) => {
                                                        if (attribute.type === type) {
                                                            return <li>
                                                                <em>{type}</em> - {attribute.title}
                                                            </li>
                                                        }
                                                    }
                                                )}
                                        </span>
                                          )}
                                          </ul>
                                      </li>
                                  )}
                                  </ul>
                              </div>
                          }
                      )}
                  }
                  </ul>
              });
              }
            });


    return (
      <div className="App">

          <h2> {name} </h2>
      <div><p><strong>Type:</strong> {type} </p><p><strong> URL: </strong> <a href="{url}" target="_blank">{url} </a></p></div>
      <h3>Overview</h3>
      <p>{Parser(description)} </p>
      <h3>Learning Outcomes</h3>
      <p> {Parser(learningOutcome)} </p>
      <h3>Organizers/ Partners</h3>
      <p> {Parser(organisers)}</p>
      <h3>Provider</h3>
          {provider}
          <h3>Competency profile</h3>
          {Profile}


      </div>
    );
  }
}



export default App;
