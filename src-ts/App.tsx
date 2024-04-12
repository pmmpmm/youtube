import '@/App.css';
import queryClient from '@/service/QueryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DarkModeContext } from '@/context/DarkModeContext';
//
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import NavVideos from './pages/NavVideos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      { path: 'videos', element: <Videos /> },
      { path: 'videos/:keyword', element: <Videos /> },
      { path: 'videos/watch/:id', element: <VideoDetail /> },
      { path: 'page/:navName', element: <NavVideos /> },
    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <DarkModeContext>
        <RouterProvider router={router} />
      </DarkModeContext>
    </QueryClientProvider>
  );
};
console.log("a-1")
console.log("a-2")
export default App;

