/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_YOUTUBE_KEY: string;
  readonly VITE_APP_USER_API_CLIENT: string;
  readonly VITE_ACCESS_TOKEN: string;
  readonly VITE_REFRESH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
