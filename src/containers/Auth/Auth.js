import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject , checkValidity } from '../../shared/utility';
import { checkAuthTimeout, authSuccess, authCheckState } from '../../services/auth';



class Auth extends Component{

    state={
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation : {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation : {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup:true,
        authRedirectPath: '',
    isAuth: false

    }    
    
    setAuthRedirectPath = (path) => {
        return {
            path: path
        }
    };

    componentDidMount(){
        if(this.state.authRedirectPath !== '/'){
            this.setAuthRedirectPath('/');
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        }) 
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) =>{
        event.preventDefault();
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD4glT2X1IbAs1IC8UCDOccaUA2kuJ6aqc'
       if(!this.state.isSignup){
           url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD4glT2X1IbAs1IC8UCDOccaUA2kuJ6aqc'
       }
       axios.post(url, authData)
            .then(response => {
 
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                // const token = localStorage.getItem('token');
                // const userId = localStorage.getItem('userId');
                // authSuccess(token, userId);
                // checkAuthTimeout(expirationDate);
                     
            })
            .catch(err => {
                console.log(err)
               
            })
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event, formElement.id)}
            />
            
        ));

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage= (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.state.isAuth){
            authRedirect = <Redirect to={this.state.authRedirectPath} />
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN': 'SIGN UP'}
                </Button>
            </div>
        )
    }

}


export default Auth;