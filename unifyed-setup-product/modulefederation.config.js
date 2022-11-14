const deps = require("./package.json").dependencies;

module.exports = {
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./Product": `./src/bootstrap`,
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
