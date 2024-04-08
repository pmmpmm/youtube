import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IoIosSearch,
  IoIosSunny,
  IoIosMoon,
  IoIosArrowRoundBack,
} from 'react-icons/io';
import LogoBox from '@/components/ui/LogoBox/LogoBox';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface Props {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (t: Props) => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');
  const searchInp = useRef<HTMLInputElement>(null);
  const searchWord = text.trim();

  useEffect(() => {
    if (!keyword) {
      setText('');
    } else {
      setText(keyword);
      // ❗️useRef.current? 사용 방법 확인
      searchInp.current?.blur();
    }
  }, [keyword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchWord.length > 0) {
      navigate(`/videos/${searchWord}`);
    }
  };
  const handleFormOpen = () => {
    if (focus) {
      setFocus(false);
      searchInp.current?.blur();
    } else {
      setFocus(true);
      searchInp.current?.focus();
    }
  };
  return (
    <header className={styles['header-wrap']}>
      <div className={styles.header}>
        <LogoBox parent={'header'} onClick={() => t.setIsNavOpen(true)} />
        <div className={styles.formWrap}>
          <div className={cx('formBox', `${focus ? 'open' : ''}`)}>
            <button
              onClick={handleFormOpen}
              className={`${styles.btn} ${styles.close}`}
              oaria-label='검색 폼 비노출 버튼'
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
              <button className={styles.btn} aria-label='검색 버튼'>
                <IoIosSearch />
              </button>
            </form>
          </div>
          <button
            onClick={handleFormOpen}
            className={`${styles.btn} ${styles.moShowFormBtn}`}
            aria-label='검색 폼 노출 버튼'
          >
            <IoIosSearch />
          </button>
        </div>
        <button className={styles.colorTheme}>
          <span className={styles.moon}>
            다크모드
            <IoIosMoon />
          </span>
          {/* {dark ? (
          <span className={styles.sun}>
            라이트모드
            <IoIosSunny />
          </span>
        ) : (
          <span className={styles.moon}>
            다크모드
            <IoIosMoon />
          </span>
        )} */}
        </button>
      </div>
    </header>
  );
};

export default Header;
