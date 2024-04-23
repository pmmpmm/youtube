import { VideoItem } from '@/domain/Video';

export const getVideoIdOrChannelId = (videoItem: VideoItem): string => {
  if (typeof videoItem.id !== 'string') {
    if (videoItem.id.videoId) {
      return videoItem.id.videoId;
    } else if (videoItem.id.channelId) {
      return videoItem.id.channelId;
    } else {
      // TODO: videoId, channelId 둘다 없는 케이스에 대한 후처리 필요
      return '';
    }
  } else {
    // TODO: videoId, channelId 둘다 없는 케이스에 대한 후처리 필요
    return '';
  }
};

export const getVideoIdOrPlaylistId = (videoItem: VideoItem): string => {
  if (typeof videoItem.id !== 'string') {
    if (videoItem.id.videoId) {
      return videoItem.id.videoId;
    } else if (videoItem.id.playlistId) {
      return videoItem.id.playlistId;
    } else {
      // TODO: videoId, playlistId 둘다 없는 케이스에 대한 후처리 필요
      return '';
    }
  } else {
    // TODO: videoId, playlistId 둘다 없는 케이스에 대한 후처리 필요
    return '';
  }
};
