const deps = require("./package.json").dependencies;

module.exports = {
  name: "unifyed-setup-container",
  remotes: {
    products: `products@${process.env.HOST_PRODUCT}/remoteEntry.js`,
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};
