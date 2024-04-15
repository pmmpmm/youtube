import { useEffect, useState } from 'react';
import { IoIosSunny, IoIosMoon } from 'react-icons/io';

const ThemeModeCtrl = () => {
  const [dark, setDark] = useState(localStorage.theme === 'dark' ? true : false || false);

  useEffect(() => {
    window.localStorage.setItem('theme', dark === true ? 'dark' : 'light');
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className='flex-none w-10 h-10 text-[0]'>
      {dark ? (
        <span className='block text-center'>
          라이트모드
          <IoIosSunny className='inline-block -ml-1 w-[66%] h-[66%] text-neutral-700 sm:w-[64%] sm:h-[64%] dark:text-neutral-50' />
        </span>
      ) : (
        <span className='block text-center'>
          다크모드
          <IoIosMoon className='inline-block -ml-1 w-[66%] h-[66%] text-neutral-700 sm:w-[64%] sm:h-[64%] dark:text-neutral-50' />
        </span>
      )}
    </button>
  );
};

export default ThemeModeCtrl;
