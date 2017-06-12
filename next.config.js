module.exports = {
  webpack: (config, { dev }) => {
    // Perform customizations to webpack config
    config.node = { fs: "empty" };
    // Important: return the modified config
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
