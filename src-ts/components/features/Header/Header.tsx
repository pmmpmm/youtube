import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDarkModeContext } from '@/context/DarkModeContext';
import {
  IoIosSearch,
  IoIosSunny,
  IoIosMoon,
  IoIosArrowRoundBack,
  IoIosClose,
} from 'react-icons/io';
import LogoBox from '@/components/ui/LogoBox/LogoBox';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface Props {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notMobileScreen: boolean;
}

const Header = (t: Props) => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const { dark, modeToggle } = useDarkModeContext();
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const searchInp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !keyword ? setText('') : setText(keyword);

    focus
      ? searchInp.current && searchInp.current.focus()
      : searchInp.current && searchInp.current.blur();

    // 검색 결과 화면: 검색폼 노출
  }, [keyword, t.notMobileScreen, focus]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length > 0) navigate(`/videos/${text.trim()}`);
    setFocus(false);
  };

  return (
    <header className={styles['header-wrap']}>
      <div className={styles.header}>
        <LogoBox parent={'header'} onClick={() => t.setIsNavOpen(true)} />
        <div className={styles.formWrap}>
          <div className={cx('formBox', `${focus ? 'open' : ''}`)}>
            <button
              onClick={() => {
                setFocus(false);
              }}
              className={`${styles.btn} ${styles.close}`}
              aria-label='모바일 화면 검색 폼 숨김 버튼'
            >
              <IoIosArrowRoundBack />
            </button>
            <form
              onSubmit={handleSubmit}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={cx('form', `${focus ? 'focus' : ''}`)}
            >
              <input
                type='text'
                placeholder='검색'
                ref={searchInp}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {text && (
                <button
                  className={cx('btn', 'del')}
                  aria-label='검색어 삭제 버튼'
                  type='button'
                  onClick={() => setText('')}
                >
                  <IoIosClose />
                </button>
              )}
              <button type='submit' className={styles.btn} aria-label='검색 버튼'>
                <IoIosSearch />
              </button>
            </form>
          </div>
          <button
            onClick={() => {
              setFocus(true);
            }}
            className={`${styles.btn} ${styles.moShowFormBtn}`}
            aria-label='검색 폼 노출 버튼'
          >
            <IoIosSearch />
          </button>
        </div>
        <button className={styles.colorTheme} onClick={modeToggle}>
          {dark ? (
            <span className={styles.sun}>
              라이트모드
              <IoIosSunny />
            </span>
          ) : (
            <span className={styles.moon}>
              다크모드
              <IoIosMoon />
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
