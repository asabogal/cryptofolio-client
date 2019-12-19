import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Layout from './components/hoc/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Signup from './components/registrations/Signup'
import Login from './components/registrations/Login'
import NotLoggedIn from './pages/NotLoggedIn'
import RedirectPage from './pages/RedirectPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: ''
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
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: ''
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            loggedInStatus={this.state.isLoggedIn}
          >
            <Switch>
              <Route 
                exact path='/' 
                render={props => (
                <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              {this.state.isLoggedIn ? 
              <Route 
                exact path='/dashboard' 
                component={props => (
                <Dashboard {...props} user={this.state.user} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              : <Route exact path='/dashboard' component={NotLoggedIn}/>
                }
              {this.state.isLoggedIn ? 
             <Route 
                exact path='/settings' 
                render={props => (
                <Settings {...props} user={this.state.user} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              : <Route exact path='/settings' component={NotLoggedIn}/>
            }
              <Route 
                exact path='/signup' 
                render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route 
                exact path='/login' 
                render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route 
                render={props => (
                <RedirectPage {...props}/>
                )}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
