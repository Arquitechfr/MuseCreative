module.exports = {
  apps: [
    {
      name: 'muse-creative',
      script: 'dist/server.cjs',
      env: {
        NODE_ENV: 'production',
        PORT: '0902',
      },
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
};
