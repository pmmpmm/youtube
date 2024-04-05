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
  params: { maxResults: number; q: string };
};
type YoutubeApi = {
  videos: () => Promise<AxiosResponse<any, any>>;
  search: <T extends params>(params: T) => Promise<AxiosResponse<any, any>>;
};
const youtubeApi = {
  videos: async function () {
    return await axios.get('/data/most_popular.json');
  },
  search: async function <T extends params>(params: T) {
    // return await axios.get('/data/keyword_bts.json');
    // 실제 api ↓
    return await httpClient.get('search', params);
  },
};
class YoutubeImpl<T extends YoutubeApi> {
  constructor(private apiClient: T) {}
  async videos(keyword: string) {
    return keyword ? this.#searchVideos(keyword) : this.#mostPopularVideos();
  }
  async #mostPopularVideos() {
    return await this.apiClient.videos().then((res) => res.data.items);
  }
  async #searchVideos(keyword: string) {
    return await this.apiClient
      .search({ params: { maxResults: 1, q: keyword } })
      .then((res) => res.data.items);
  }
}
export const youtubeClient = new YoutubeImpl(youtubeApi);
