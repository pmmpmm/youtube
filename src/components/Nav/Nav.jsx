import React from 'react';
import styles from './Nav.module.css';
import classNames from 'classnames/bind';
import { AiFillHome, AiFillSmile } from 'react-icons/ai';
import { MdSportsBaseball } from 'react-icons/md';
import { PiNewspaperFill } from 'react-icons/pi';

const cx = classNames.bind(styles);

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-header']}>로고</div>
      <button className={styles.btn}>
        <AiFillHome />
        <span className={styles.tx}>홈</span>
        <span className={styles['break-lap']}>icon 홈</span>
      </button>
      <button className={styles.btn}>
        <AiFillSmile />
        <span className={styles.tx}>예능</span>
        <span className={styles['break-lap']}>icon 예능</span>
      </button>
      <button className={styles.btn}>
        <MdSportsBaseball />
        <span className={styles.tx}>스포츠</span>
        <span className={styles['break-lap']}>icon 스포츠</span>
      </button>
      <button className={styles.btn}>
        <PiNewspaperFill />
        <span className={styles.tx}>뉴스</span>
        <span className={styles['break-lap']}>icon 뉴스</span>
      </button>
    </nav>
  );
}
