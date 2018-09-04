
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
}

export const checkAuthTimeout = (expirationTime) => {
    console.log('checkAuthTimeout Ejecutandose',expirationTime)
    setTimeout(() => {
        logout();
    }, expirationTime * 1000);
}

export const authSuccess = (token, userId) => {
    console.log(token,userId,'authsuccess');
    return {
        idToken: token,
        userId: userId
    }
};

//se pone en un componentDidMount en el APP.js
export const authCheckState = () => {

        const token = localStorage.getItem('token');
        
        if(!token) {
            logout();
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                logout();
            }else{
                const userId = localStorage.getItem('userId')
                //dispatch(authSuccess(token, userId));
                authSuccess(token, userId);
                //dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
                checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)

            }
        }
        return {
            token: token
        }
    
}


