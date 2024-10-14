import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientId: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL 
} as any);
