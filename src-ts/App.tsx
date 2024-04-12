import queryClient from '@/service/QueryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import NavVideos from './pages/NavVideos';
import PopularVideos from './pages/PopularVideos';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
        <RouterProvider router={createBrowserRouter([
        // {
        //   path: '/',
        //   element: <Root />,
        //   errorElement: <NotFound />,
        //   children: [
        //     { index: true, element: <Videos /> },
        //     { path: 'videos', element: <Videos /> },
        //     { path: 'videos/:keyword', element: <Videos /> },
        //     { path: 'videos/watch/:id', element: <VideoDetail /> },
        //     { path: 'page/:navName', element: <NavVideos /> },
        //   ],
        // },
        { path: '/', element: <PopularVideos /> },
        { path: 'videos', element: <Videos /> },
        { path: 'videos/:keyword', element: <Videos /> },
        { path: 'videos/watch/:id', element: <VideoDetail /> },
        { path: 'page/:navName', element: <NavVideos /> },
      ])} />
    </QueryClientProvider>
  );
};

export default App;
