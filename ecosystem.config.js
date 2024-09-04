module.exports = {
  apps: [
    {
      name: "friendore", // The name of your application
      script: "npm",
      args: "run prod",
      instances: 1, // Number of instances to run (0 for max)
      autorestart: true, // Auto-restart on crash
    },
    {
      name: "cron:find-connection", // The name of your application
      script: "npm",
      args: "run prod:cron:find-connection",
      instances: 1, // Number of instances to run (0 for max)
      autorestart: true, // Auto-restart on crash
    },
    {
      name: "cron:expiring-connection-email", // The name of your application
      script: "npm",
      args: "run prod:cron:expiring-connection-email",
      instances: 1, // Number of instances to run (0 for max)
      autorestart: true, // Auto-restart on crash
    },
    {
      name: "cron:expiring-friends-email", // The name of your application
      script: "npm",
      args: "run prod:cron:expiring-friends-email",
      instances: 1, // Number of instances to run (0 for max)
      autorestart: true, // Auto-restart on crash
    },
  ],
};
