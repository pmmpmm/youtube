import axios from 'axios';
import Youtube from './youtube';

const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;

const httpClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  timeout: 1000,
  params: {
    part: 'snippet',
    key: YOUTUBE_KEY,
  },
});
const fakeYoutubeApi = {
  search: async function (params) {
    return await axios.get(`/data/keyword_bts.json`);
    // return await httpClient.get('search', params);
  },
  videos: async function () {
    return await axios.get('/data/most_popular.json');
  },
  channelInfo: async function (params) {
    // return await axios.get('/data/channel_details.json');
    return await httpClient.get('channels', params);
  },
  channelVideos: async function () {
    return await axios.get('/data/channel_videos.json');
  },

  // 검색 키워드 음악:Latest kpop music, 예능:인기 예능
  etc: async function (navMenu) {
    if (navMenu === 'music') {
      return await axios.get('/data/kPop_music.json');
    }
    if (navMenu === 'enter') {
      return await axios.get('/data/k_entertainment.json');
    }
  },
};
export const fakeYoutubeClient = new Youtube(fakeYoutubeApi);
