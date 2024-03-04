import React from 'react';
import styles from './LogoBox.module.css';
import classNames from 'classnames/bind';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import { IoIosMenu } from 'react-icons/io';

const cx = classNames.bind(styles);

const LogoBox = ({ parent, onClick }) => {
  return (
    <div className={cx('logoBox', `${parent}`)}>
      <button className={styles.navBtn} onClick={onClick} aria-label='메뉴 버튼'>
        <IoIosMenu />
      </button>
      <HeaderLogo />
    </div>
  );
};

export default LogoBox;
