import React , { Component } from 'react';

import { Redirect } from 'react-router-dom';



class Logout extends Component {

    componentDidMount(){
        this.logout();
    }

     logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
    }
    

    render(){
        return <Redirect to="/" />
    }
}


export default Logout;