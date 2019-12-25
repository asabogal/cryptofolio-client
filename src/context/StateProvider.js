import React, { Component } from 'react';
import axios from 'axios';

export const StateContext = React.createContext();

class StateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: false,
      user: '',
      userCoins: '',
      selectedCoin: '',
      active: false,
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout,
      processLogout: this.processLogout
     };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  
  handleLogin = (data) => {
    this.setState({
      loggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({ 
    loggedIn: false,
    user: ''
    })
  }

  processLogout = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => this.handleLogout())
    .catch(error => console.log(error))
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateProvider;