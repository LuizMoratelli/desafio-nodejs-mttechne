export default {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '5.6.0',
      skipMD5: true,
    },
    autoStart: false,
  },
};
