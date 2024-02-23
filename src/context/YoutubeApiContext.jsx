import React, { createContext, useContext } from 'react';
import { youtubeClient } from '../api/youtubeClient';
import { fakeYoutubeClient } from '../api/fakeYoutubeClient';

const YoutubeApiContext = createContext();
export function YoutubeApiProvider({ children }) {
  const youtube = fakeYoutubeClient;

  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}
export const useYoutubeApi = () => useContext(YoutubeApiContext);
