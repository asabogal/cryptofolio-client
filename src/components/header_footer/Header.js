import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Logo} from '../utils/Logos'
import logo from '../../images/crypto-vault.png'
import {StateContext} from '../../context/StateProvider'

const Header = () => {

    return (
      <StateContext.Consumer>
        {(context) => (
          <Container>
            {
              context.loggedIn ? 
              <div>
                <Logo link="/settings" logo={logo} width='60px' height='60px'/>
              </div> 
            :
              <div>
                <Logo link="/" logo={logo} width='60px' height='60px'/>
              </div> 
            }
        
            {
              context.loggedIn ? 
              <ul>
                <Link to='/dashboard'><li>Dashboard</li></Link>
                <Link to='/settings'><li>Settings</li></Link>
                <Link to='/' onClick={() => context.processLogout()}><li>Log Out</li></Link> 
              </ul>  : null
            }
          </Container>
        )}
      </StateContext.Consumer>
    );
  }

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: none;
  margin: 30px;
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
  }
  a {
    text-decoration: none;
    color: white;
  }
  li {
    list-style: none;
    text-decoration: none;
    padding-left: 20px;
  }
`;