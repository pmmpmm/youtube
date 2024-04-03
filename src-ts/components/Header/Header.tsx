import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDarkModeContext } from '../../context/DarkModeContext';
import { useNavContext } from '../../context/NavContext';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import LogoBox from '../LogoBox/LogoBox';
import {
  IoIosSearch,
  IoIosSunny,
  IoIosMoon,
  IoIosArrowRoundBack,
} from 'react-icons/io';
import InitScrollTop from '../InitScrollTop';

const cx = classNames.bind(styles);

export default function Header() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const searchInp = useRef();
  const formWrap = useRef();
  const [focus, setFocus] = useState();
  const [text, setText] = useState('');
  const searchWord = text.trim();
  const { dark, modeToggle } = useDarkModeContext();
  const { setIsNavOpen } = useNavContext();

  useEffect(() => {
    if (!keyword) {
      setText('');
    } else {
      setText(keyword);
      searchInp.current.blur();
    }
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchWord.length > 0) {
      navigate(`/videos/${searchWord}`);
    }
  };
  const handleFormOpen = () => {
    if (focus) {
      setFocus(false);
      searchInp.current.blur();
    } else {
      setFocus(true);
      searchInp.current.focus();
    }
  };

  return (
    <header className={styles.header}>
      <LogoBox parent='header' onClick={() => setIsNavOpen(true)} />
      <div className={styles.formWrap} ref={formWrap}>
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
          oaria-label='검색 폼 노출 버튼'
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
      <InitScrollTop />
    </header>
  );
}
