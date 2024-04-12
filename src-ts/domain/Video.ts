export type ThumbnailItem = {
  url: string,
  width: number,
  height: number
}

export type Thumbnail = {
  default: ThumbnailItem,
  medium: ThumbnailItem,
  high: ThumbnailItem,
  standard: ThumbnailItem,
  maxres: ThumbnailItem
}

export type Localized = {
  title: string,
  description: string
}

export type Snippet = {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  thumbnails: Thumbnail
}

export type VideoId = {
  kind: string,
  videoId?: string,
  channelId?: string
}

export type VideoItem = {
  kind: string,
  etag: string,
  id: string | VideoId,
  snippet: Snippet,
  channelTitle: string,
  categoryId: string,
  liveBroadcastContent: string,
  localized: Localized,
  defaultAudioLanguage: string
}
