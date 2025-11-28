import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || null,
    },
  };
};
