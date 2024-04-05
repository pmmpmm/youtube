import { Link } from 'react-router-dom';
import styles from './LogoBox.module.css';
import { IoIosMenu } from 'react-icons/io';
import Logo from '@/components/ui/Logo/Logo';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface Props {
  parent: string;
  onClick: () => void;
}
const LogoBox = (t: Props) => {
  return (
    <div className={cx('logoBox', `${t.parent}`)}>
      <button
        className={styles.navBtn}
        onClick={t.onClick}
        aria-label='메뉴 버튼'
      >
        <IoIosMenu />
      </button>
      <Link to='/' className={styles.logo}>
        <h1 className='logo'>
          <Logo />
        </h1>
      </Link>
    </div>
  );
};

export default LogoBox;
