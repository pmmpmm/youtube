import VideoCard from "../ui/VideoCard";
import { useQuery } from "@tanstack/react-query";
import PopularService from "@/service/PopularService";

const PopularVideosContent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["PopularService.getPopularList"],
    queryFn: PopularService.getPopularList,
    select: (response) => {
      return response.items;
    }
  })
  
  return (
    <>
      {error && <p>error</p>}
      {isLoading && <p>isLoading</p>}
      <ul className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'>
        {data && data.map((item: any) => (
            <VideoCard key={item.id} video={item} style='' />
          ))}
      </ul>
    </>
  );
};

export default PopularVideosContent;
