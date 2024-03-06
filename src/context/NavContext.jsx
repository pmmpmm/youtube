import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { GoHome, GoSmiley } from 'react-icons/go';
import { MdHomeFilled } from 'react-icons/md';
import { FaSmile } from 'react-icons/fa';
import { PiNewspaper, PiNewspaperFill } from 'react-icons/pi';
import { IoMusicalNotesOutline, IoMusicalNotes } from 'react-icons/io5';
import { useParams, useLocation } from 'react-router-dom';

const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
  const navs = [
    { title: '홈', name: 'home', icon: <GoHome />, actionIcon: <MdHomeFilled /> },
    { title: '음악', name: 'music', icon: <IoMusicalNotesOutline />, actionIcon: <IoMusicalNotes /> },
    { title: '예능', name: 'enter', icon: <GoSmiley />, actionIcon: <FaSmile /> },
    { title: '뉴스', name: 'news', icon: <PiNewspaper />, actionIcon: <PiNewspaperFill /> },
  ];
  // Q1 : 사이드 nav 버튼 관련 클릭 이벤트 함수 어떤 방식(컴포넌트 안에 작성)으로 작업 가능?
  //      컴포넌트 페이지에 전달된 navMenu, setNavMenu, setIsNavOpen 등등 괜찮은지

  // 현재 컨텐츠 혹은 nav menu 클릭 상태
  const [navMenu, setNavMenu] = useState(navs[0].name);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Q3 : 검색 결과 페이지, 상세페이지 진입 시 메뉴 active 해제(작업 방법과 작업 위치???)
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const { keyword } = useParams();

  const navRef = useRef();
  const defaultTheme = require('tailwindcss/defaultTheme');
  const screenX = window.matchMedia(`(min-width: ${defaultTheme.screens.sm})`);

  useEffect(() => {
    // Q1 : 화면 사이즈 모바일의 경우 nav 여닫는 기능
    const navParent = navRef.current.parentNode;
    isNavOpen ? navParent.classList.add('open') : navParent.classList.remove('open');

    // Q1 : nav 컨텐츠 외 클릭 시 nav 닫기
    navParent.addEventListener('click', (e) => {
      const isNavExist = e.composedPath().includes(navRef.current);
      if ((!isNavExist && navParent.classList.contains('open')) || e.target.closest('.mo h1') || e.target.closest('.mo button')) {
        setIsNavOpen(false);
      }
    });

    // Q2 :반응형 스크립트 내 작성 방법?
    // 화면 가로사이즈가 모바일을 초과하였을 경우 nav 안보임
    if (navParent.classList.contains('open')) {
      screenX.addEventListener('change', function () {
        if (screenX.matches) setIsNavOpen(false);
      });
    }

    // Q3 : 상세페이지 진입 시 메뉴 active 해제(작업 위치를 어느곳에 해야 하는지?)
    if (paths.some((path) => path === 'watch') || !!keyword) setNavMenu('');

    //
  }, [isNavOpen, paths, keyword, screenX]);

  return <NavContext.Provider value={{ navs, navRef, isNavOpen, setIsNavOpen, navMenu, setNavMenu }}>{children}</NavContext.Provider>;
};
export const useNavContext = () => useContext(NavContext);
