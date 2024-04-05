import { createContext, useContext } from 'react';
import { youtubeClient } from '../service/YoutubeClient';

// any: class Youtube interface 만들어서 다시 해보기
const YoutubeApiContext = createContext<any | undefined>(undefined);

export const YoutubeApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const youtube = youtubeClient;

  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
};

export const useYoutubeApi = () => useContext(YoutubeApiContext);
