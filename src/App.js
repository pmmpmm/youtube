import './App.css';
import { NavContextProvider } from './context/NavContext';
import HeaderWrap from './components/HeaderWrap';
import ContainerWrap from './components/ContainerWrap';

function App() {
  return (
    <div className='App'>
      <NavContextProvider>
        <HeaderWrap />
        <ContainerWrap />
      </NavContextProvider>
    </div>
  );
}

export default App;
