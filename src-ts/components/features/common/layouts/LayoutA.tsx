import { ReactElement, useEffect, useState } from 'react';
import { screens } from 'tailwindcss/defaultTheme';
import { IoIosMenu } from 'react-icons/io';
import Header from '@/components/features/Header';
import Nav from '@/components/features/Nav';

export type LayoutAProps = {
  children: string | ReactElement | ReactElement[];
};

const LayoutA = ({ children }: LayoutAProps) => {
  const screenX = window.matchMedia(`(max-width: ${screens.sm})`);
  const [mobileScreenX, setMobileScreenX] = useState(screenX.matches);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    // 화면 가로사이즈 resize
    screenX.addEventListener('change', () => {
      if (mobileScreenX) setIsNavOpen(false);
      setMobileScreenX(screenX.matches);
    });
  }, []);

  return (
    <>
      {/* Header */}
      <div className='w-full flex flex-row items-center justify-between px-2 h-header-height bg-white fixed top-0 left-0 z-50 dark:bg-[#171717] sm:h-header-height-sm sm:px-4'>
        {/* nav menu btn */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className='block flex-none w-10 h-10 mr-2 sm:hidden'
          aria-label='메뉴 열림, 닫힘 버튼'
        >
          <IoIosMenu className='w-8 h-8 m-auto text-black dark:text-white' />
        </button>
        <Header />
      </div>

      {/* LNB */}
      <Nav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} mobileScreenX={mobileScreenX} />

      {/* contents */}
      <div className='flex pt-container-top pb-8 sm:pt-container-top-sm'>
        <div className='flex-initial w-full pl-0 sm:pl-20 xl:pl-60'>
          <div className='px-4 py-0 sm:px-4'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutA;
