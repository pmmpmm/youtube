const VideoCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4'>
      {children}
    </ul>
  );
};

export default VideoCardContainer;
