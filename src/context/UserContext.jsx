import React, { Component, createContext } from "react";

export const UserContext = createContext();

class UserContextProvider extends Component {

    state = {
        loggedInstatus: localStorage.getItem('loggedInStatus'),
        userData: JSON.parse(localStorage.getItem('userData'))
    }

    setLoggedInStatus(loggedInStatus){
        this.setState((state)=>({...state, loggedInStatus})); 
    }
    
    setUserData(userData){
        localStorage.setItem('userData', JSON.stringify(userData));
        this.setState((state)=>({...state, userData})); 
    }

    render () {
        return (
            <UserContext.Provider  value={{
                ...this.state,
                setLoggedInStatus: this.setLoggedInStatus.bind(this),
                setUserData: this.setUserData.bind(this)
              }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContextProvider;