import '@/App.css';
import { useState, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/service/QueryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { screens } from 'tailwindcss/defaultTheme';
import Header from './components/features/Header/Header';
import Nav from './components/features/Nav/Nav';
import Container from './components/features/Container/Container';

const App = () => {
  const screenX = window.matchMedia(`(min-width: ${screens.sm})`);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [mobileScreen, setMobileScreen] = useState<boolean>(screenX.matches);

  useEffect(() => {
    screenX.addEventListener('change', function () {
      setMobileScreen(screenX.matches);
    });
  }, [screenX]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Header setIsNavOpen={setIsNavOpen} />
        {mobileScreen ? (
          <Nav
            isNavOpen={isNavOpen}
            setIsNavOpen={setIsNavOpen}
            device='not-mobile'
            screenX={screenX}
          />
        ) : (
          <Nav
            isNavOpen={isNavOpen}
            setIsNavOpen={setIsNavOpen}
            device='mobile'
            screenX={screenX}
          />
        )}
        <Container />
      </BrowserRouter>
      {/* <div className='text-red-300'>처음</div> */}
    </QueryClientProvider>
  );
};

export default App;
