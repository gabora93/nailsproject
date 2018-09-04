import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component{ 

    state={
        showSideDrawer : false
    }

    SideDrawerCloserHandler = () => {
        this.setState({showSideDrawer:false})
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
   

    render(){
        console.log(this.props);
        return(
            <Auxiliary>
                <Toolbar DrawerToggleClicked={this.SideDrawerToggleHandler} isAuth={this.props.isAuth} />
                <SideDrawer
                    open={this.state.showSideDrawer} 
                    closed={this.SideDrawerCloserHandler}
                />
                <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Auxiliary>
        )
    }
}

export default Layout;