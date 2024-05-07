import queryClient from "@/service/QueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import PopularVideos from "@/pages/PopularVideos";
import SearchVideos from "@/pages/SearchVideos";
import MusicVideos from "@/pages/MusicVideos";
import EnterVideos from "@/pages/EnterVideos";
import NewsVideos from "@/pages/NewsVideos";
import VideoDetail from "@/pages/VideoDetail";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import MyPage from "@/pages/MyPage";
import FindAccount from "@/pages/FindAccount";
import ModifyInfo from "@/pages/ModifyInfo";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <PopularVideos /> },
          { path: "*", element: <NotFound /> },
          { path: "videos", element: <PopularVideos /> },
          { path: "videos/results", element: <SearchVideos /> },
          { path: "page/music", element: <MusicVideos /> },
          { path: "page/enter", element: <EnterVideos /> },
          { path: "page/news", element: <NewsVideos /> },
          { path: "videos/watch", element: <VideoDetail /> },
          { path: "member/signup", element: <Signup /> },
          { path: "member/login", element: <Login /> },
          { path: "member/find", element: <FindAccount /> },
          { path: "mypage", element: <MyPage /> },
          { path: "mypage/modify", element: <ModifyInfo /> }
        ])}
      />
    </QueryClientProvider>
  );
};

export default App;
