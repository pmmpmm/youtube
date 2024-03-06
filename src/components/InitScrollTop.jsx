import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavContext } from '../context/NavContext';

const InitScrollTop = () => {
  const { pathname } = useLocation();
  const { navMenu } = useNavContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, navMenu]);
  return null;
};

export default InitScrollTop;
