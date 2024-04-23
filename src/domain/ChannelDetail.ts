export type ThumbnailItem = {
  url: string;
  width: number;
  height: number;
};

export type Thumbnail = {
  default: ThumbnailItem;
  medium: ThumbnailItem;
  high: ThumbnailItem;
  standard: ThumbnailItem;
  maxres: ThumbnailItem;
};

export type Localized = {
  title: string;
  description: string;
};

export type Snippet = {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnail;
  localized?: Localized;
  country: string;
};

export type ChannelDatailItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};
