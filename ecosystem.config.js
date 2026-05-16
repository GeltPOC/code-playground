module.exports = {
  apps: [{
    name: 'code-playground',
    script: 'npm',
    args: 'start -- -p 3637',
    cwd: '/home/gelt/apps/code-playground',
    env: {
      NODE_ENV: 'production',
      PORT: 3637,
    },
  }],
}
