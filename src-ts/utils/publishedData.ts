import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

export const publishedDate = (publishedAt: string) => {
  dayjs.locale('ko');
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  const data = dayjs(publishedAt).utc().format('YYYY-MM-DD HH:mm:ss');
  return dayjs(data).fromNow();
};
