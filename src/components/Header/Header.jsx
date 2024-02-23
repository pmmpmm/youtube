import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import Logo from '../../svg/Logo';
import { IoIosSearch } from 'react-icons/io';

const cx = classNames.bind(styles);

export default function Header() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const searchInp = useRef();
  const [focus, setFocus] = useState();
  const [text, setText] = useState('');
  const searchWord = text.trim();

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

  return (
    <header className={styles.header}>
      <div className={styles.logoBox}>
        <div className={styles.navBtn}>
          <button className={styles.btn}>메뉴 버튼</button>
        </div>
        <h1 className={styles.logo}>
          <Link to='/'>
            <Logo />
            로고
          </Link>
        </h1>
      </div>
      <form onSubmit={handleSubmit} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className={cx('form', `${focus ? 'focus' : ''}`)}>
        <input type='text' placeholder='검색' ref={searchInp} value={text} onChange={(e) => setText(e.target.value)} />
        <button className={styles.searchBtn}>
          <IoIosSearch />
        </button>
      </form>
      <button className={styles.colorTheme}>
        <span>다크모드</span>
        <span>라이트모드</span>
      </button>
    </header>
  );
}
