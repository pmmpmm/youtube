import './App.css';
// import { useState } from 'react';
import { DarkModeContext } from './context/DarkModeContext';
import { NavContextProvider } from './context/NavContext';
import HeaderWrap from './components/HeaderWrap';
import ContainerWrap from './components/ContainerWrap';

function App() {
  return (
    <DarkModeContext>
      <div className='App'>
        <NavContextProvider>
          <HeaderWrap />
          <ContainerWrap />
        </NavContextProvider>
      </div>
    </DarkModeContext>
  );
}

export default App;
