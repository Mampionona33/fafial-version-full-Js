/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_END_POINT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
