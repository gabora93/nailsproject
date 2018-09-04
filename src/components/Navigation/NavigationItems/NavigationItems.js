import React, { Component} from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component{

    state={
        isAuth: false
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        if(!token){
            console.log(token,'<<<tokini')
            this.setState({
                isAuth:false
            })
        }else{
            console.log(token,'<<<tok true')
            this.setState({
                isAuth:true
            })
        }

    }

    

    render(){
        console.log(this.props);
        let routes = (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Nails Saloon</NavigationItem>
        <NavigationItem link="/about">About us</NavigationItem>
        {!this.state.isAuth ? <NavigationItem link="/auth">Log in</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem> }
            </ul>
        )


        // if(this.props.isAuth){
        //     console.log(this.props)
        //      routes = (
        //          <ul className={classes.NavigationItems}>
        //          <NavigationItem link="/">Nails Saloon</NavigationItem>
        //      <NavigationItem link="/about">About us</NavigationItem>
        //          <NavigationItem link="/logout">Logout</NavigationItem>
        //          </ul>
        //      )
        //  }
        return(
            <div>
                {routes}
            </div>
        )
    }

//     let routes = (
//     )

//     <ul className={classes.NavigationItems}>
//         <p>{JSON.stringify(props)}</p>
//         <NavigationItem link="/">Nails Saloon</NavigationItem>
//         <NavigationItem link="/about">About us</NavigationItem>
//         { !props.isAuth 
//             ? <NavigationItem link="/auth">Authenticate</NavigationItem>
//             : <NavigationItem link="/logout">Logout</NavigationItem>}
//     </ul>
    
// )
}

export default NavigationItems;
