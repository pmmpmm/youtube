import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavContext } from '../../context/NavContext';
import classNames from 'classnames/bind';
import styles from './Nav.module.css';
import LogoBox from '../LogoBox/LogoBox';

const cx = classNames.bind(styles);

export default function Nav({ use }) {
  const { navs, navRef, setIsNavOpen, navMenu, setNavMenu } = useNavContext();
  const navigate = useNavigate();
  const handleNavMenu = (name) => {
    // Q4 : 메뉴 작업을 해당 컴포넌트에서 작성해도 되는지 아니면 부모 Context에서 함수를 전달해주는게 맞는지??
    setNavMenu(name);
    navigate('/');
  };

  return (
    <nav ref={navRef} className={`nav ${use} ${cx('nav')}`}>
      <div className={styles.logoBox}>
        <LogoBox parent='nav' onClick={() => setIsNavOpen(false)} />
      </div>
      <ul className={styles.navList}>
        {navs.map((nav, idx) => {
          return (
            <li key={idx}>
              <button className={cx([`${nav.name}`, `${navMenu === nav.name ? 'active' : ''}`])} onClick={() => handleNavMenu(nav.name)}>
                <span className={styles.icon}>{navMenu === nav.name ? nav.actionIcon : nav.icon}</span>
                <span className={styles.tx}>{nav.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
