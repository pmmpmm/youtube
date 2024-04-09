import React from 'react';
import { useState, useEffect } from 'react';
import { screens } from 'tailwindcss/defaultTheme';
import Header from '../components/features/Header/Header';
import Nav from '../components/features/Nav/Nav';
import Container from '@/components/features/Container/Container';

const Root = () => {
  const screenX = window.matchMedia(`(min-width: ${screens.sm})`);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [notMobileScreen, setMobileScreen] = useState<boolean>(screenX.matches);

  useEffect(() => {
    screenX.addEventListener('change', function () {
      setMobileScreen(screenX.matches);
    });
  }, [screenX]);

  return (
    <>
      <Header setIsNavOpen={setIsNavOpen} notMobileScreen={notMobileScreen} />
      {notMobileScreen ? (
        <Nav
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          device='not-mobile'
          screenX={screenX}
        />
      ) : (
        <Nav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} device='mobile' screenX={screenX} />
      )}
      <Container />
    </>
  );
};

export default Root;
