import queryClient from '@/service/QueryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavVideos from '@/pages/NavVideos';
//
import NotFound from '@/pages/NotFound';
import PopularVideos from '@/pages/PopularVideos';
import SearchVideos from '@/pages/SearchVideos';
import MusicVideos from '@/pages/MusicVideos';
import EnterVideos from '@/pages/EnterVideos';
import NewsVideos from '@/pages/NewsVideos';
import VideoDetail from '@/pages/VideoDetail';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider
        router={createBrowserRouter([
          { path: '/', element: <PopularVideos /> },
          { path: '*', element: <NotFound /> },
          { path: 'videos', element: <PopularVideos /> },
          { path: 'videos/:keyword', element: <SearchVideos /> },
          { path: 'page/music', element: <MusicVideos /> },
          { path: 'page/enter', element: <EnterVideos /> },
          { path: 'page/news', element: <NewsVideos /> },
          { path: 'videos/watch/:id', element: <VideoDetail /> },
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
