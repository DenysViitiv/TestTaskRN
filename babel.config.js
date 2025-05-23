module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@utils": "./src/utils",
          },
        },
      ],
      "nativewind/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
