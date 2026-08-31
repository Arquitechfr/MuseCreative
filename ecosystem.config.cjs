module.exports = {
  apps: [
    {
      name: 'muse-creative',
      script: 'dist/server.cjs',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: '9102',
      },
      env_file: '.env',
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
};
