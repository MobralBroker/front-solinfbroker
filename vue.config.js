const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true

})

module.exports = {
  configureWebpack: {
    watchOptions: {
      poll: 1000, // Intervalo de polling em milissegundos
    },
  },
};

