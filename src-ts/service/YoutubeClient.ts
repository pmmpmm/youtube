import axios, { AxiosResponse } from 'axios';

const YOUTUBE_KEY = import.meta.env.VITE_APP_YOUTUBE_KEY;
const httpClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: YOUTUBE_KEY,
  },
});

type params = {
  params: { id?: string; maxResults?: number; q?: string; channelId?: string };
};
type YoutubeApi = {
  videos: () => Promise<AxiosResponse<any, any>>;
  search: <T extends params>(params: T) => Promise<AxiosResponse<any, any>>;
  channelVideos: <T extends params>(params: T) => Promise<AxiosResponse<any>>;
  channelDetail: <T extends params>(params: T) => Promise<AxiosResponse<any>>;
};

const youtubeApi = {
  videos: async function () {
    return await axios.get('/data/most_popular.json');
  },
  search: async function <T extends params>(params: T) {
    // 실제 api ↓
    // return await httpClient.get('search', params);
    return await axios.get('/data/keyword_bts.json');
  },
  channelVideos: async function <T extends params>(params: T) {
    // 실제 api ↓
    // return await httpClient.get('playlists', params);
    return await axios.get('/data/channel_videos.json');
  },
  channelDetail: async function <T extends params>(params: T) {
    // 실제 api ↓
    // return await httpClient.get('channels', params);
    return await axios.get('/data/channel_details.json');
  },
};
class YoutubeImpl<T extends YoutubeApi> {
  constructor(private apiClient: T) {}
  async videos(keyword: string) {
    return keyword ? this.#searchVideos(keyword) : this.#mostPopularVideos();
  }
  async channelVideos(channelId: string) {
    return await this.apiClient
      .channelVideos({ params: { maxResults: 1, channelId } })
      .then((res) => res.data.items);
  }
  async channelDetail(channelId: string) {
    return await this.apiClient
      .channelDetail({ params: { id: channelId } })
      .then((res) => res.data.items)
      .then((items) => items[0].snippet);
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
