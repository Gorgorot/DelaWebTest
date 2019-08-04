import React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import logo from './logo.svg';
import './App.less';
import 'jquery';
import './libs/bootstrap-4.0.0-dist/css/bootstrap.min.css';
import './libs/bootstrap-4.0.0-dist/js/bootstrap.bundle';

import ModalWindow from "./components/ModalWindow/ModalWindow";
import Header from "./components/Header/header";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import ProfileEditor from "./components/ProfileEditor/ProfileEditor";

class App extends React.Component{
  constructor(props){
    super(props);
    this.SignIn = this.SignIn.bind(this);
    this.state = {
      auth: false,
      id: null,
      email: null,
      sliderTimer: null
    };
  }

  SignIn({id, email}){
    this.setState({
      auth: true,
      id: id,
      email: email
    }, ()=> {
      document.querySelector(".close").click();
      clearInterval(this.state.sliderTimer);
      document.location.href = `/#/profile/${id}`;
    });    
  }

  render(){
    console.log(this.state.sliderTimer);
    return (
      <div className="App">
        <ModalWindow onSuccessAuth = { this.SignIn }/>
        <Header auth = { this.state.auth } email= { this.state.email }/>
        <HashRouter>
          <Switch>
            <Route exact path="/" children={ ()=> <MainPage timer = { this.state.sliderTimer }/> }/>
            <Route exact exact path="/profile/:id" { ...this.state } render = { props=>
              this.state.auth ? <Profile {...this.state } /> : <Redirect to="/" />
            } />
            <Route exact exact path="/profile/:id/edit" { ...this.state } render = { props=>
              this.state.auth ? <ProfileEditor { ...this.state } /> : <Redirect to="/" />
            } />           
          </Switch>
        </HashRouter>
      </div>
    );
  }
  
}

export default App;
