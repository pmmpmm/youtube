import axios from 'axios';

import Youtube from './youtube';

const fakeYoutubeApi = {
  search: async function () {
    return await axios.get(`/data/keyword_bts.json`);
  },
  videos: async function () {
    return await axios.get('/data/most_popular.json');
  },
};
export const fakeYoutubeClient = new Youtube(fakeYoutubeApi);

// export default class FakeYoutube {
//   // constructor() {}
//   search(keyword) {
//     return keyword ? this.#searchKeyword(keyword) : this.#mostPopular();
//   }
//   async #searchKeyword(keyword) {
//     const items = await axios
//       .get(`/data/keyword_${keyword}.json`) //
//       .then((res) => res.data.items);
//     return items.map((item) => ({ ...item, id: item.id.videoId || item.id.channelId }));
//   }
//   async #mostPopular() {
//     const items = await axios
//       .get('/data/most_popular.json') //
//       .then((res) => res.data.items);
//     return items;
//   }
// }
