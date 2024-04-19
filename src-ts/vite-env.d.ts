/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_YOUTUBE_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
