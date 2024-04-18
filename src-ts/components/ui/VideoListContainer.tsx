const VideoListContainer = ({ children }: { children: React.ReactNode }) => {
  return <ul className='grid grid-cols-1 gap-y-4 max-w-6xl m-auto'>{children}</ul>;
};

export default VideoListContainer;
