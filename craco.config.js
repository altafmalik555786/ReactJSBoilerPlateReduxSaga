const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      // '@utils': path.resolve(__dirname, 'src/utils'),
      // '@stores': path.resolve(__dirname, 'src/stores'),
      // '@api': path.resolve(__dirname, 'src/api'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@commonComponents': path.resolve(__dirname, 'src/components/commonComponents/components'),
      '@commonComponentsScss': path.resolve(__dirname, 'src/components/commonComponents/scss')
    }
  }
};