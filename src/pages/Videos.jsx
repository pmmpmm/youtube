import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useNavContext } from '../context/NavContext';
import Loading from '../components/Loading/Loading';
import Error from '../components/ErrorComponent/Error';
import VideoCard from '../components/VideoCard/VideoCard';
import Search from './Search';
import Etc from './Etc';

export default function Videos() {
  const { keyword } = useParams();
  const { navs, navMenu } = useNavContext();

  return (
    <>
      {(navMenu === navs[0].name || keyword) && <Search />}
      {navMenu !== navs[0].name && <Etc />}
    </>
  );
  // const { keyword } = useParams();
  // const { youtube } = useYoutubeApi();
  // const { navs, navMenu } = useNavContext();

  // // Q1 : nav의 '음악' 혹은 '예능' 클릭 시 컨텐츠 전환
  // const {
  //   data: videos,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['videos', keyword, navMenu],
  //   queryFn: () => {
  //     if (navMenu === navs[0].name || keyword) {
  //       return youtube.search(keyword);
  //     } else if (navMenu !== navs[0].name) {
  //       return youtube.etc(navMenu);
  //     }
  //   },
  //   staleTime: 1000 * 60 * 5,
  // });

  // return (
  //   <>
  //     {isLoading && <Loading />}
  //     {error && <Error />}
  //     {videos && (
  //       <ul className={`videos ${keyword ? 'list' : ''}`}>
  //         {videos.map((video) => {
  //           return <VideoCard key={video.id} video={video} style={`${keyword ? 'list' : ''}`} />;
  //         })}
  //       </ul>
  //     )}
  //   </>
  // );
}
