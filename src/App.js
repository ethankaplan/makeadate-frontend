import React, { Component } from 'react';
import { Switch, Route,withRouter } from 'react-router-dom'

import NavBar from './component/NavBar/NavBar'
import Login from './component/Login/Login'
import ShowUser from './component/ShowUser/ShowUser'
import DateBuilder from './component/Builder/DateBuilder'
import ViewResults from './component/Builder/ViewResults'
import Register from "./component/Register/Register"
import { Redirect } from 'react-router-dom'
import * as routes from './constants/routes'
import './App.css';
import { isNull } from 'util';


class App extends Component {
  state = {
    currentUser: null,
    buildingDate:{
      activityJ:null,
      dinnerJ:null,
      location:"",

      dinnerObj:null,
      activityObj:null
    }
    
  }

  doSearch =async (location, activity,cuisine)=>{

    try {
      console.log("Hit 1")
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/l_${location}/a_${activity}`)  
        console.log("Hit 2")            
        const resJson = await res.json()
        console.log("Hit 3")
        const resDin = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/l_${location}/c_${cuisine}`)

        console.log("Hit 4")
        const resDinJson = await resDin.json()
        await this.setState({
            activityJ:resJson.data,
            dinnerJ:resDinJson.data,
            location  
        })
        
    } catch(err) {
        console.log(err)  
    }
}

formHandleSubmit=async(e,act,din)=>{
  e.preventDefault();
  console.log(din)
  await this.setState({
    activityObj:act,
    dinnerObj:din
  })
  console.log(this.state.dinnerObj)
  return(
  <Redirect to={`/users/${this.state.currentUser._id}`} />)
  
}



  doSetCurrentUser = user =>
    this.setState({
      currentUser: user
    })
    doLogout=()=>{
      this.setState({
        currentUser:null
      })
      //~~~Change this to route~~~
      this.props.history.push(routes.LOGIN)
    }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} doLogout={this.doLogout}/><br/>
        <Switch>
          <Route exact path={routes.ROOT} render={() => <div>ROOT</div>} />
          <Route exact path={routes.HOME} render={() => <div>HOME</div>} />
          <Route exact path={routes.USERS} render={() => <div>USER</div>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
          
          <Route exact path={routes.POSTS} render={() => 
                  <DateBuilder activityList={this.state.activityJ} dinnerList={this.state.dinnerJ} location={this.state.location} doSearch={this.doSearch} formHandleSubmit={this.formHandleSubmit}/>} />
            <Route exact path={`${routes.POSTS}/buildresults`} render={() => 
                  <div><ViewResults places={this.state.activityJ}/><br/><hr/>
                  <ViewResults places={this.state.dinnerJ} /></div>} />
         
         <Route exact path={routes.REGISTER} render={() => <Register currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route exact path={routes.LOGIN} render={() => <Login currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route render={() => <div>NOT FOUND</div>} />
        </Switch>
      </div>
    );
  }
}



export default withRouter(App);
