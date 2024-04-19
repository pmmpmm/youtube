import axios, { AxiosResponse } from 'axios';

const YOUTUBE_KEY = import.meta.env.VITE_APP_YOUTUBE_KEY;
const httpClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: YOUTUBE_KEY,
    type: 'video',
  },
});

type params = {
  params: { id?: string; maxResults?: number; q?: string; channelId?: string };
};
type YoutubeApi = {
  videos: () => Promise<AxiosResponse<any>>;
  search: <T extends params>(params: T) => Promise<AxiosResponse<any>>;
  channelVideos: <T extends params>(params: T) => Promise<AxiosResponse<any>>;
  channelDetail: <T extends params>(params: T) => Promise<AxiosResponse<any>>;
  navVideos: (navName: string) => Promise<AxiosResponse<any>>;
};

const youtubeApi = {
  // 인기 비디오 리스트
  videos: async function () {
    return await axios.get('/data/most_popular.json');
  },
  // 검색 비디오 리스트
  search: async function <T extends params>(params: T) {
    // 실제 api ↓
    // return await httpClient.get('search', params);
    return await axios.get('/data/keyword_bts.json');
  },
  // nav menu 비디오 리스트
  navVideos: async function (navName: string) {
    // return await axios.get('/data/k_pop_music.json');
    return navName === 'music'
      ? await axios.get('/data/k_pop_music.json')
      : navName === 'enter'
      ? await axios.get('/data/k_entertainment.json')
      : navName === 'news'
      ? await axios.get('/data/k_news.json')
      : await Promise.reject(new Error('fail'));
  },

  // 비디오 상세페이지: 채널 섬네일
  channelDetail: async function <T extends params>(params: T) {
    // 실제 api ↓
    // return await httpClient.get('channels', params);
    return await axios.get('/data/channel_details.json');
  },
  // 비디오 상세페이지: 채널 관련 동영상 리스트
  channelVideos: async function <T extends params>(params: T) {
    // 실제 api ↓
    // return await httpClient.get('search', params);
    return await axios.get('/data/channel_videos.json');
  },
};

class YoutubeImpl<T extends YoutubeApi> {
  constructor(private apiClient: T) {}
  async videos(keyword: string) {
    return keyword ? this.#searchVideos(keyword) : this.#mostPopularVideos();
  }
  async channelVideos(channelId: string) {
    return await this.apiClient
      .channelVideos({ params: { maxResults: 6, channelId: channelId } })
      .then((res) => res.data.items)
      .then((items) => {
        const item = items.map((item: any) => ({
          ...item,
          id: item.id.videoId ? item.id.videoId : item.id.playlistId,
        }));
        return item;
      });
  }
  async channelDetail(channelId: string) {
    return await this.apiClient
      .channelDetail({ params: { id: channelId } })
      .then((res) => res.data.items)
      .then((items) => items[0].snippet);
  }
  async navVideos(navName: string) {
    return await this.apiClient
      .navVideos(navName)
      .then((res) => res.data.items)
      .then((items) => {
        const item = items.map((item: any) => ({
          ...item,
          id: item.id.videoId ? item.id.videoId : item.id.playlistId,
        }));
        return item;
      });
  }

  async #mostPopularVideos() {
    return await this.apiClient.videos().then((res) => res.data.items);
  }
  async #searchVideos(keyword: string) {
    return await this.apiClient
      .search({ params: { maxResults: 1, q: keyword } })
      .then((res) => res.data.items)
      .then((items) => {
        const item = items.map((item: any) => ({
          ...item,
          id: item.id.videoId ? item.id.videoId : item.id.channelId,
        }));
        return item;
      });
  }
}
export const youtubeClient = new YoutubeImpl(youtubeApi);
