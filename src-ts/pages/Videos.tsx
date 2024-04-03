import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavContext } from '../context/NavContext';
import Search from './Search';
import Etc from './Etc';

export default function Videos() {
  const { keyword } = useParams();
  const { navs, navMenu } = useNavContext();

  return (
    <>
      VideosVideos
      {console.log(navs)}
      {(navMenu === navs[0].name || keyword) && <Search />}
      {navMenu !== navs[0].name && !keyword && <Etc />}
    </>
  );
}
