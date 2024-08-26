require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'daily-report',
      script: 'dist/main.js',
      watch: false,
      env: {
        PORT: 3001,
        SELF_SIGNED_KEY_PATH: process.env.SELF_SIGNED_KEY_PATH,
        SELF_SIGNED_CRT_PATH: process.env.SELF_SIGNED_CRT_PATH,
      },
    },
  ],
};
