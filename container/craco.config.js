const cracoModuleFederation = require("./craco-module-federation");

module.exports = {
  mode: process.env.NODE_ENV,
  // Adding Server
  devServer: {
    port: process.env.PORT,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
