import React from 'react';
import StateProvider from './context/StateProvider';
import Router from './Router';

const App = () =>  {
  return (
    <StateProvider>
      <Router/>
    </StateProvider>
  );
}

export default App;
