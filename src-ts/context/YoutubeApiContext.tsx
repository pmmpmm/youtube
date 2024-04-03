import React, { createContext, useContext } from 'react';
// import { youtubeClient } from '../api/youtubeClient';
import { fakeYoutubeClient } from '../api/fakeYoutubeClient';

const YoutubeApiContext = createContext(null);
export function YoutubeApiProvider({ children }) {
  const youtube = fakeYoutubeClient;
  // const youtube = youtubeClient;

  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
export const useYoutubeApi = () => useContext(YoutubeApiContext);
