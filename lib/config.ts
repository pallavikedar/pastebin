const BASE_URL =
  process.env.VERCEL_URL
    ? `https://pastebin-eight-kohl.vercel.app`
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const config = {
  BASE_URL,
};

export default config;
