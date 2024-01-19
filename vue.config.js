const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8085, // Defina a porta desejada
  },

  configureWebpack: {
    watchOptions: {
      poll: 1000, // Intervalo de polling em milissegundos
    },
  },
});

