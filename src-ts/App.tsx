import '@/App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/service/QueryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Videos from './pages/Videos';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/* <Header /> */}
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: <Videos />,
          },
        ])}
      ></RouterProvider>
      <div className='text-red-300'>처음</div>
    </QueryClientProvider>
  );
};

export default App;
