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
  const { pathname } = useLocation() as RouteState;
  const { keyword } = useParams();

  const handleNavBtn = (name: string) => {
    navigate(name === 'home' ? '/' : `/page/${name}`);
    setNavMenu(name);
  };
  const navActiveHandle = (pathname: string, keyword?: string) => {
    //화면의 경로에 따른 nav menu active ON
    navs.map((nav) =>
      pathname === `/page/${nav.name}`
        ? setNavMenu(nav.name)
        : pathname === '/' && setNavMenu('home')
    );
    // 상세페이지,검색 결과 페이지 진입 → nav 메뉴 active OFF
    if (pathname.includes('watch') || keyword) setNavMenu('');
  };

  useEffect(() => {
    const navParent = navRef.current && navRef.current.parentElement;
    if (navParent) {
      // 모바일 nav의 오픈 여부에 따른 class 설정
      t.isNavOpen ? navParent.classList.add(styles.open) : navParent.classList.remove(styles.open);

      //모바일 nav open 일 때: 화면 가로사이즈 모바일을 초과하였을 경우 nav HIDE
      if (navParent.classList.contains(styles.open)) {
        t.screenX.addEventListener('change', function () {
          if (t.screenX.matches) t.setIsNavOpen(false);
        });
      }

      //nav 컨텐츠 외 클릭 → nav 닫기
      navParent.addEventListener('click', (e: Event) => {
        const isNavExist = e.composedPath().includes(navRef.current!);
        const target = e.target as HTMLElement;
        if (
          (!isNavExist && navParent.classList.contains(styles.open)) ||
          target.closest('h1.logo') ||
          target.closest('li .btn')
        ) {
          t.setIsNavOpen(false);
        }
      });
    }
    navActiveHandle(pathname, keyword);
  }, [t, t.isNavOpen, keyword, pathname, t.screenX]);

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
                  onClick={() => handleNavBtn(nav.name)}
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
