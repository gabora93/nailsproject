import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect  } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Auth from './containers/Auth/Auth';
import { authCheckState } from './services/auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions';


class App extends Component {

  state={
    isAuth: false
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    authCheckState();
    if(!token){
      console.log(token);
      console.log('hola null');
      this.setState({isAuth:false})
    }
      else{
        console.log('hola no null');
        console.log(token);

        this.setState({isAuth:true})
      }
    }
  
  


  render() {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/about" component={About}/>
        <Route path="/" component={Home}/>
        
      </Switch>
    )

if(this.state.isAuth){
    routes = (
    <Switch>
    <Route path="/logout" component={Logout}/>
    <Route path="/about" component={About}/>
      <Route path="/" component={Home}/>
      
    </Switch>
  )
}


    return (
      <div className="App">
        <Layout isAuth={this.state.isAuth}>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
