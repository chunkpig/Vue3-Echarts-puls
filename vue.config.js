const webpack = require("webpack");
const path = require("path");
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const port = 3527; // dev port
const name = "Vue Typescript";
const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/", //根路径 cli3.0以上使用publicPath
  // //打包后输出路径
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "/", // 本地测试
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {},
    },
  },
  // configureWebpack 值为对象，会通过 webpack-merge 合并到最终的配置
  configureWebpack: {
    //   //在webpack的name字段中提供应用程序的标题，以便可以在index.html中访问它来注入正确的标题
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },

    externals: {},
  },
  chainWebpack(config) {
    // config.plugin('define').tap(args => {
    //   // args[0]['process.env'].IMAGE_URL = "'http://120.53.244.200:8085/'";
    //   return args;
    // });
    // config.plugin('provide').use(webpack.ProvidePlugin, [
    //   {
    //     $: 'jquery',
    //     jquery: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery'
    //   }
    // ]);

    // 设置svg
    //  config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    //  config.module
    //    .rule('icons')
    //    .test(/\.svg$/)
    //    .include.add(resolve('src/icons'))
    //    .end()
    //    .use('svg-sprite-loader')
    //    .loader('svg-sprite-loader')
    //    .options({
    //      symbolId: 'icon-[name]'
    //    })
    //    .end();
    //设置开发环境sourceMap
    config.when(!isProd, (config) => config.devtool("cheap-source-map"));
    //开发环境

    config.when(isProd, (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // config.plugin('html').tap(args => {
      //     args[0].cdn = cdn;
      //     return args;
      // });
      config.optimization.runtimeChunk("single");

      //去除生产环境debugger 和console
      config.optimization.minimizer("terser").tap((args) => {
        args[0].terserOptions.compress.warnings = false;
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
        args[0].terserOptions.compress.pure_funcs = ["console.*"];
        return args;
      });
      //g-zip开启
      // config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [{
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.css/, //匹配文件名
      //   threshold: 10240, //对超过10k的数据压缩
      //   minRatio: 0.8
      // }]);
    });
  },
};