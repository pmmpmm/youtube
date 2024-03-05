import React from 'react';
import { BiMessageSquareError } from 'react-icons/bi';
import styles from './Message.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
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
    default:
      icon = '';
      state = '기본';
      text = '기본';
  }
  return (
    <div className={styles.messagesBox}>
      <div className={styles.messages}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.textBox}>
          <p className={styles.title} dangerouslySetInnerHTML={{ __html: state }}></p>
          <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
      </div>
    </div>
  );
};

export default Message;
