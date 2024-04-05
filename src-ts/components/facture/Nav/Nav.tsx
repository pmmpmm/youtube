import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

import { GoHome, GoSmiley } from 'react-icons/go';
import { MdHomeFilled } from 'react-icons/md';
import { FaSmile } from 'react-icons/fa';
import { PiNewspaper, PiNewspaperFill } from 'react-icons/pi';
import { IoMusicalNotesOutline, IoMusicalNotes } from 'react-icons/io5';
import styles from './Nav.module.css';
import LogoBox from '@/components/ui/LogoBox/LogoBox';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const navs = [
  { title: '홈', name: 'home', icon: <GoHome />, actionIcon: <MdHomeFilled /> },
  {
    title: '음악',
    name: 'music',
    icon: <IoMusicalNotesOutline />,
    actionIcon: <IoMusicalNotes />,
  },
  { title: '예능', name: 'enter', icon: <GoSmiley />, actionIcon: <FaSmile /> },
  {
    title: '뉴스',
    name: 'news',
    icon: <PiNewspaper />,
    actionIcon: <PiNewspaperFill />,
  },
];

interface Props {
  device: string;
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  screenX: MediaQueryList;
}
interface RouteState {
  pathname: string;
}

const Nav = (t: Props) => {
  const navRef = useRef<HTMLElement>(null);
  const [navMenu, setNavMenu] = useState(navs[0].name);
  const navigate = useNavigate();
  const handleNavMenu = (name: string) => {
    setNavMenu(name);
    navigate(name === 'home' ? '/' : `/${name}`);
  };

  const { pathname } = useLocation() as RouteState;
  const paths = pathname.split('/');
  const { keyword } = useParams();

  useEffect(() => {
    const navParent = navRef.current?.parentElement;
    if (navParent) {
      // mobile nav open & close
      t.isNavOpen
        ? navParent.classList.add(styles.open)
        : navParent.classList.remove(styles.open);

      //모바일 화면 nav가 open 일 때 화면 가로사이즈가 모바일을 초과하였을 경우 nav hide
      if (navParent.classList.contains(styles.open)) {
        t.screenX.addEventListener('change', function () {
          if (t.screenX.matches) t.setIsNavOpen(false);
        });
      }

      //nav 컨텐츠 외 클릭 → nav 닫기
      navParent.addEventListener('click', (e: Event) => {
        const isNavExist = e.composedPath().includes(navRef.current!);
        const target = e.target as HTMLElement;

        console.log('open', target.parentElement);

        if (
          (!isNavExist && navParent.classList.contains(styles.open)) ||
          target.closest('h1.logo') ||
          target.closest('li .btn')
        ) {
          t.setIsNavOpen(false);
        }
      });
    }
    // 상세페이지 진입 → nav 메뉴 active 해제
    if (paths.some((path) => path === 'watch') || !!keyword) setNavMenu('');

    //logo 버튼 클릭 → nav home active
    if (pathname === '/') setNavMenu('home');
  }, [t, t.isNavOpen, paths, keyword, pathname, t.screenX]);

  return (
    <div className={styles['nav-wrap']}>
      <nav ref={navRef} className={cx('nav', `${t.device}`)}>
        <div className={styles.logoBox}>
          <LogoBox parent={'nav'} onClick={() => t.setIsNavOpen(false)} />
        </div>
        <ul className={styles.navList}>
          {navs.map((nav, idx) => {
            return (
              <li key={idx}>
                <button
                  className={`btn ${cx([
                    `${nav.name}`,
                    `${navMenu === nav.name ? 'active' : ''}`,
                  ])}`}
                  onClick={() => handleNavMenu(nav.name)}
                >
                  <span className={styles.icon}>
                    {navMenu === nav.name ? nav.actionIcon : nav.icon}
                  </span>
                  <span className={styles.tx}>{nav.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
