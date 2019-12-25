import React, { Component } from 'react';
import StateProvider from './context/StateProvider'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Layout from './components/hoc/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Signup from './components/registrations/Signup'
import Login from './components/registrations/Login'
import DemoDashboard from './pages/DemoDashboard'
import ProtectedRoute from './ProtectedRoute'
import RedirectRoute from './RedirectRoute'
import RegistrationsRoute from './RegistrationsRoute'

const App = () => {
  
  return (
    <StateProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home}/>

            <ProtectedRoute 
              exact path='/dashboard' 
              component = {Dashboard}
              user={this.state.user} 
              loggedIn={this.state.isLoggedIn}
            />

            <Route 
              exact path='/demo' 
              render={props => (
              <DemoDashboard {...props}/>
              )}
            />

            <ProtectedRoute 
              exact path='/settings' 
              component = {Settings}
              user={this.state.user} 
              loggedIn={this.state.isLoggedIn}
            />
            
            <RegistrationsRoute 
              exact path='/signup' 
              component={Signup}
              handleLogin={this.handleLogin} 
              loggedIn={this.state.isLoggedIn}/>
            />

            <RegistrationsRoute 
              exact path='/login' 
              component={Login}
              handleLogin={this.handleLogin} 
              loggedIn={this.state.isLoggedIn}
            />

            <RedirectRoute 
              path='*'
              loggedIn={this.state.isLoggedIn}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;