/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'session-reviews',
      removal: 'remove',
      protect: false,
      home: 'aws',
      providers: {
        aws: {
          region: 'us-west-2',
        },
      },
    };
  },
  async run() {
    // Import infrastructure
    await import('./infra/secrets');
    
    // Only import storage if ENABLE_AWS_STORAGE is set
    // This prevents SST from trying to create AWS resources when just managing secrets
    if (process.env.ENABLE_AWS_STORAGE === 'true') {
      await import('./infra/storage');
    }
    
    await import('./infra/api');
  },
});

