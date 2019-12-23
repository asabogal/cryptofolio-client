import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './components/hoc/Layout';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Signup from './components/registrations/Signup';
import Login from './components/registrations/Login';
import DemoDashboard from './pages/DemoDashboard';
import ProtectedRoute from './ProtectedRoute';
import RedirectRoute from './RedirectRoute';
import RegistrationsRoute from './RegistrationsRoute';
import {StateContext} from './context/StateProvider';

const Router = () => {
  return (
    <StateContext.Consumer>
      {(context) => (
        <BrowserRouter>
          <Layout
            handleLogin={context.handleLogin}
            handleLogout={context.handleLogout}
            loggedIn={context.loggedIn}
          >
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Home {...props} handleLogout={context.handleLogout} loggedIn={context.loggedIn}/>
              )}
            />

            <ProtectedRoute 
              exact path='/dashboard' 
              component = {Dashboard}
              user={context.user} 
              loggedIn={context.loggedIn}
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
                user={context.user} 
                loggedIn={context.loggedIn}
              />
            
              <RegistrationsRoute 
                exact path='/signup' 
                component={Signup}
                handleLogin={context.handleLogin} 
                loggedIn={context.loggedIn}/>
              />

              <RegistrationsRoute 
                exact path='/login' 
                component={Login}
                handleLogin={context.handleLogin} 
                loggedIn={context.loggedIn}
              />

              <RedirectRoute 
                path='*'
                loggedIn={context.loggedIn}
              />
          </Switch>
        </Layout>
      </BrowserRouter>
      )}
      </StateContext.Consumer>
  );
};

export default Router;