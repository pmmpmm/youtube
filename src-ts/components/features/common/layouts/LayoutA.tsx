import { ReactElement, useEffect, useState } from "react";
import { screens } from 'tailwindcss/defaultTheme';

export type LayoutA = {
  children: string | ReactElement | ReactElement[];
}

const LayoutA = ({ children }: LayoutA) => {
  const screenX = window.matchMedia(`(min-width: ${screens.sm})`);

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    screenX.addEventListener('change', () => {
      setIsNavOpen(false);
    });
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex">
        {/* 햄버거 버튼 */}
        {/* 헤더 */}
      </div>
      {/* LNB */}

      <div className='flex pt-container-top pb-8 sm:pt-container-top-sm'>
        <div className='flex-initial w-full pl-0 sm:pl-20 xl:pl-60'>
          <div className='px-4 py-0 sm:px-4'>
            { children }
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutA;