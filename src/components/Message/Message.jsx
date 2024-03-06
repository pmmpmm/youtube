import React from 'react';
import { BiMessageSquareError } from 'react-icons/bi';
import { TbFaceIdError } from 'react-icons/tb';
import styles from './Message.module.css';
import { Link } from 'react-router-dom';

const Loading = () => {
  return (
    <div className={styles.loadingIcon}>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
    </div>
  );
};
const Message = ({ type }) => {
  let icon;
  let state;
  let text;
  switch (type) {
    case 'loading':
      icon = <Loading />;
      state = `컨텐츠를 불러오고 있습니다.`;
      text = `잠시만 기다려주세요.`;
      break;
    case 'error':
      icon = <BiMessageSquareError />;
      state = `죄송합니다.<br/>컨텐츠 준비가 아직 안 되어있습니다.`;
      text = `빠른 시일 내에 다시 찾아뵙겠습니다.`;
      break;
    case 'notFound':
      icon = <TbFaceIdError />;
      state = `죄송합니다.<br/>페이지를 찾을 수 없습니다.`;
      text = `페이지의 이름이 변경되었거나 일시적으로 이용이 불가능합니다.`;
      break;
    default:
      icon = '';
      state = '기본';
      text = '기본';
  }
  return (
    <div className={styles.messagesBox}>
      <div className={styles.messages}>
        <div className={`${styles.icon} ${styles[`${type}-icon`]}`}>{icon}</div>
        <div className={styles.textBox}>
          <p className={styles.title} dangerouslySetInnerHTML={{ __html: state }}></p>
          <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
        {type === 'notFound' && (
          <div className={styles.goToHome}>
            <Link to='/'>홈으로 이동</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
