import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { GoHome, GoSmiley } from 'react-icons/go';
import { IoIosMenu } from 'react-icons/io';
import { FaSmile } from 'react-icons/fa';
import { MdHomeFilled } from 'react-icons/md';
import { PiNewspaper, PiNewspaperFill } from 'react-icons/pi';
import { IoMusicalNotesOutline, IoMusicalNotes } from 'react-icons/io5';
import Logo from '../ui/Logo';

const navs = [
  {
    title: '홈',
    name: 'home',
    icon: <GoHome className='w-[1.375rem] h-[1.375rem] text-neutral-800 dark:text-neutral-200' />,
    actionIcon: <MdHomeFilled className='w-[1.5rem] h-[1.5rem] text-neutral-950 dark:text-white' />,
  },
  {
    title: '음악',
    name: 'music',
    icon: (
      <IoMusicalNotesOutline className='w-[1.3rem] h-[1.3rem] text-neutral-800 dark:text-neutral-200' />
    ),
    actionIcon: (
      <IoMusicalNotes className='w-[1.3rem] h-[1.3rem] text-neutral-950 dark:text-white' />
    ),
  },
  {
    title: '예능',
    name: 'enter',
    icon: <GoSmiley className='w-[1.25rem] h-[1.25rem] text-neutral-800 dark:text-neutral-200' />,
    actionIcon: <FaSmile className='w-[1.25rem] h-[1.25rem] text-neutral-950 dark:text-white' />,
  },
  {
    title: '뉴스',
    name: 'news',
    icon: (
      <PiNewspaper className='w-[1.25rem] h-[1.25rem] text-neutral-800 dark:text-neutral-200' />
    ),
    actionIcon: (
      <PiNewspaperFill className='w-[1.25rem] h-[1.25rem] text-neutral-950 dark:text-white' />
    ),
  },
];

interface NavProps {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileScreenX: boolean;
}
interface RouteState {
  pathname: string;
}

const Nav = (props: NavProps) => {
  const navRef = useRef<HTMLElement>(null);
  const [navMenu, setNavMenu] = useState(navs[0].name);
  const navigate = useNavigate();
  const { pathname } = useLocation() as RouteState;
  const { keyword } = useParams();

  const handleNavLink = (name: string) => {
    navigate(name === 'home' ? '/' : `/page/${name}`);
    setNavMenu(name);
  };

  //화면의 경로에 따른 nav menu active ON
  const navActiveHandle = (pathname: string, keyword?: string) => {
    navs.map((nav) =>
      pathname === `/page/${nav.name}`
        ? setNavMenu(nav.name)
        : pathname === '/' && setNavMenu('home')
    );
    // 상세페이지,검색 결과 페이지 진입 → nav 메뉴 active OFF
    if (pathname.includes('watch') || keyword) setNavMenu('');
  };

  //모바일 nav open → nav 클릭 영역에 따른 close 혹은 open
  const handleNavClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const nav = navRef.current && navRef.current;
    const navParent = nav && navRef.current.parentElement;
    const target = e.target as HTMLElement;
    if (target === navParent || target.closest('h1.logo') || target.closest('li .btn')) {
      props.setIsNavOpen(false);
    }
  };

  useEffect(() => {
    navActiveHandle(pathname, keyword);
  }, [keyword, pathname]);

  return (
    <div
      onClick={(e) => handleNavClick(e)}
      className={`nav-wrap flex-none h-full fixed top-0 left-0 z-50 sm:z-0 
      ${
        props.isNavOpen &&
        `before:content-[''] before:block before:w-full before:h-full before:bg-black/[.30] before:backdrop-blur-[2px] before:fixed before:top-0 before:left-0 before:z-0`
      }`}
    >
      <nav
        ref={navRef}
        className={`flex-none flex-col w-60 h-full px-2 bg-white absolute top-0 sm:w-20 sm:px-4 sm:z-0 xl:w-60 dark:bg-[#171717] 
        ${
          props.mobileScreenX
            ? 'flex -left-60 z-50 duration-300 sm:hidden'
            : 'hidden left-0 sm:flex'
        }
        ${props.isNavOpen ? 'left-0' : ''}
        `}
      >
        <div className='visible flex items-center h-header-height sm:invisible sm:h-header-height-sm'>
          <button
            onClick={() => props.setIsNavOpen(!props.isNavOpen)}
            className='block flex-none w-10 h-10 mr-2 sm:hidden'
            aria-label='메뉴 열림, 닫힘 버튼'
          >
            <IoIosMenu className='w-8 h-8 m-auto text-black dark:text-white' />
          </button>
          <Link to='/' className='flex-none w-[7.5rem] text-[0]'>
            <h1 className='logo'>
              <Logo />
            </h1>
          </Link>
        </div>

        <ul className='navList px-1 sm:px-0'>
          {navs.map((nav, idx) => {
            return (
              <li key={idx} className='py-1'>
                <button
                  className={`${
                    nav.name
                  } btn flex flex-row items-center w-full px-2 py-[0.625rem] rounded-lg sm:flex-col xl:flex-row
                    ${
                      navMenu === nav.name &&
                      'bg-neutral-100 sm:bg-white xl:bg-neutral-100 dark:bg-neutral-800 dark:sm:bg-[#171717]'
                    }`}
                  onClick={() => handleNavLink(nav.name)}
                >
                  <span className='icon flex justify-center items-center w-[1.625rem] h-[1.625rem] mr-3 sm:mr-0 xl:mr-3'>
                    {navMenu === nav.name ? nav.actionIcon : nav.icon}
                  </span>
                  <span
                    className={`tx block pt-0 text-sm sm:text-xs sm:pt-1 xl:text-sm xl:pt-0 xl:font-medium 
                    ${
                      navMenu === nav.name
                        ? ' font-semibold text-neutral-950 dark:text-white'
                        : 'font-medium text-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    {nav.title}
                  </span>
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
