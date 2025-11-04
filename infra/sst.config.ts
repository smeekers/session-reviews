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
    await import('./api');
    await import('./secrets');
    await import('./storage');
  },
});

