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
}
