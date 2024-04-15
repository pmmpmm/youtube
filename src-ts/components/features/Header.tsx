import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosSearch, IoIosArrowRoundBack, IoIosClose } from 'react-icons/io';
import Logo from '@/components/ui/Logo';
import DarkModeBtn from '@/components/ui/DarkModeBtn';

const Header = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const searchInp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !keyword ? setText('') : setText(keyword);

    focus
      ? searchInp.current && searchInp.current.focus()
      : searchInp.current && searchInp.current.blur();
  }, [keyword, focus]);

  const handleSubmit = () => {
    if (text.trim().length > 0) navigate(`/videos/${text.trim()}`);
    setFocus(false);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <>
      <Link to='/' className='flex-none w-[7.5rem] text-[0]'>
        <h1 className='logo'>
          <Logo />
        </h1>
      </Link>
      <div className='flex flex-initial basis-[62%] justify-end sm:justify-center md:basis-6/12 lg:basis-5/12'>
        <div
          className={`items-center w-full h-full px-4 bg-white absolute top-0 left-0 -z-10 
            sm:flex sm:p-0 sm:relative sm:z-10 dark:bg-neutral-900
            ${focus ? 'flex z-50' : 'hidden'}`}
        >
          <button
            onClick={() => setFocus(false)}
            className='btn close flex-none block w-10 h-10 sm:hidden'
            aria-label='모바일 화면 검색 폼 숨김 버튼'
          >
            <IoIosArrowRoundBack className='inline-block w-7 h-7 text-neutral-700 dark:text-white' />
          </button>
          {/* form */}
          <div
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`flex w-full h-10 border border-solid border-neutral-200 rounded-full dark:border-neutral-700
              ${focus ? 'border-transparent shadow-form-focus dark:border-neutral-100' : ''}`}
          >
            <input
              type='text'
              placeholder='검색'
              ref={searchInp}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='flex-initial w-full h-10 px-6 font-normal text-neutral-950 bg-transparent border-transparent placeholder:text-neutral-400 dark:text-neutral-100 dark:font-light dark:placeholder:text-neutral-300'
              onKeyPress={handleKeyPress}
            />
            {text && (
              <button
                className='btn del flex-none w-[26px] opacity-50'
                aria-label='검색어 삭제 버튼'
                type='button'
                onClick={() => setText('')}
              >
                <IoIosClose className='inline-block w-7 h-7 text-neutral-700 dark:text-neutral-50' />
              </button>
            )}
            <button
              type='button'
              onClick={handleSubmit}
              aria-label='검색 버튼'
              className='flex-none w-16'
            >
              <IoIosSearch className='inline-block w-7 h-7 text-neutral-700 dark:text-white' />
            </button>
          </div>
        </div>
        {/* 모바일화면 - 검색폼 노출 버튼 */}
        <button
          onClick={() => {
            setFocus(true);
          }}
          className='btn moShowFormBtn flex-none block mx-1 relative z-[1] w-10 h-10 sm:hidden'
          aria-label='검색 폼 노출 버튼'
        >
          <IoIosSearch className='inline-block w-7 h-7 text-neutral-700 dark:text-white' />
        </button>
      </div>

      {/* 다크모드 버튼 */}
      <DarkModeBtn />
    </>
  );
};

export default Header;
