// Set via CLI using "pnpm sst secret set <secret-name> <secret-value>"
// https://sst.dev/docs/component/secret/
export const secret = {
  // AWS credentials for local development
  AwsAccessKeyId: new sst.Secret('AwsAccessKeyId'),
  AwsSecretAccessKey: new sst.Secret('AwsSecretAccessKey'),
  AwsRegion: new sst.Secret('AwsRegion', 'us-west-2'), // Default region, can be overridden

  // Liveblocks credentials
  LiveblocksPublicKey: new sst.Secret('LiveblocksPublicKey'),
  LiveblocksSecretKey: new sst.Secret('LiveblocksSecretKey'),
};
