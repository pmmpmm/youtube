import { useParams } from 'react-router-dom';

const SearchVideosContent = () => {
  const { keyword } = useParams();
  return <div>{keyword}</div>;
};

export default SearchVideosContent;
