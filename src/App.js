import './App.css';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import { YoutubeApiProvider } from './context/YoutubeApiContext';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className='App'>
      <div className='header'>
        <Header />
      </div>
      <div className='container'>
        <div className='nav'>
          <Nav />
        </div>
        <div className='content'>
          <QueryClientProvider client={queryClient}>
            <YoutubeApiProvider>
              <Outlet />
            </YoutubeApiProvider>
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
