export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchKeyword(keyword) : this.#mostPopular();
  }
  async #searchKeyword(keyword) {
    const items = this.apiClient
      .search({ params: { maxResults: '1', q: keyword } }) //
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId || item.id.channelId })));
    return items;
  }
  async #mostPopular() {
    const items = this.apiClient
      .videos({ params: { maxResults: '1', chart: 'mostPopular' } }) //
      .then((res) => res.data.items);
    return items;
  }
  async channelInfo(id) {
    return this.apiClient
      .channelInfo({ params: { id } }) //
      .then((res) => res.data.items[0].snippet);
  }
  async channelVideos(id) {
    return this.apiClient
      .channelVideos({ params: { maxResults: '6', channelId: id } }) //
      .then((res) => res.data.items);
  }
  async etc(navMenu) {
    const items = this.apiClient
      .etc(navMenu) //
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId || item.id.channelId || item.id.playlistId })));
    return items;
  }
}
