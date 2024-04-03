import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderLogo.module.css';
import Logo from '../Logo/Logo';
import { useNavContext } from '../../context/NavContext';

const HeaderLogo = () => {
  //Q1 : 홈 버튼 클릭 시 실행 함수 작성 아래외 같이 가능?
  const { navs, setNavMenu } = useNavContext();
  return (
    <h1 className={styles.logo}>
      <Link to='/' onClick={() => setNavMenu(navs[0].name)}>
        <Logo className={'header-logo'} />
        로고
      </Link>
    </h1>
  );
};

export default HeaderLogo;
