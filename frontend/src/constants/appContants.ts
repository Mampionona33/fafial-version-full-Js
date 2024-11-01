export const BACKEND_URL = `${import.meta.env.VITE_API_END_POINT}/api/v1`;
export const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME || "auth_token";
export const REFRESH_TOKEN_NAME =
  import.meta.env.VITE_REFRESH_TOKEN_NAME || "refresh_token";
export const ACCESS_TOKEN_NAME =
  import.meta.env.VITE_ACCESS_TOKEN_NAME || "access_token";
export const EXPIRATION_BUFFER = import.meta.env.VITE_EXPIRATION_BUFFER || 60000;
