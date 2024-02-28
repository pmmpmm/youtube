import '@/App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/service/QueryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <div className='text-red-300'>처음</div>
  </QueryClientProvider>
}

export default App;
