const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);

  const { withNativeWind } = await import("nativewind/dist/metro/index.js");

  return withNativeWind(config, {
    input: "./global.css",
  });
})();