
const nodeExternals = require('webpack-node-externals');


const nextConfig = {
  // output: 'export',  // SPA 静态导出，会把public拷贝到最终产物
  // images: {
  //   unoptimized: true
  // },
  /* config options here */
  webpack: (config, { isServer }) => {
    // Server 端，node_modules 默认是不会打包的，所以只用配置Client端external配置
    if (!isServer) {
      config.externals = {
        lodash: 'window._',
        axios: 'window.axios',
      }
    } 
    return config;
  },
  productionBrowserSourceMaps: true,
};
 
module.exports = nextConfig;