import App from "next/app";
import { useEffect } from "react";
import Head from "next/head";
// import Script from "next/script";
import { getInitialData } from "@/apis";
import { getGlobalData } from "@/utils";
import { useStoreContext, StoreContextProvider } from "@/contexts";
import "@/styles/globals.css"; // NOTE: 引入全局样式及布局，默认支持css的导入

// NOTE: 页面每次切换_app都需重新render
// 抽象封装 useStore
// viewport meta 标签要添加到 _app.js 当中
function MyApp({ Component, pageProps, globalInitData }) {
  console.log("_app render");
  console.log("render hook globalInitData: ", globalInitData);
  // console.log("_document pass by props: ", getGlobalData("initAppData"));
  // const { appInitialData } = useStoreContext() || {};
  // console.log("appInitialData: ", appInitialData);
  // 这里 pageProps 是要透传给「页面组件」，也就是「水合的过程」
  // beforeInteractive 行为是defer，执行顺序是有保障, Script 无法放置在 Head 当中
  useEffect(() => {
    console.log("MyApp effect running");
    setTimeout(() => {
      // 生产环境下会自动移除debugger
      console.log("client rendering");
    }, 4000);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover"
        />
      </Head>
      <StoreContextProvider value={globalInitData}>
        <div className="layout">
          <Component {...pageProps} />
        </div>
      </StoreContextProvider>
    </>
  );
}

/**
 * 数据预取，完成了对 server-脱水 与 Client-水合 抽象
 * 数据预取完成后才会发生渲染行为
 * 数据预期每次
 */

// 【反模式】不存在这样的用法
// let globalInitFlag = false;

/**
 * 这个方法使得每一个页面都由服务器渲染，禁用了自动静态优化功能，
 * 所以只有应用中每个单独页面都有阻塞数据的请求时才可以使用该方法。
 * 但是如果特定的页面中有调用 getStaticProps/getStaticPaths,那么该页面还是SSG
 * desc: 该方法能在 Server 也能在 Client 端运行
 * 入参 context 包含：
 * AppTree
 * Component
 * router
 * ctx 包含 req: IncomingMessage、res: ServerResponse
 */
MyApp.getInitialProps = async (context) => {
  console.log("-----------_app getInitialProps running------------");
  // NOTE: 会调用各个Page中 getInitialProps,
  // 如果页面中使用的是getServerSideProps 那么下面的调用是非必要
  // ctx 包含了
  const ctx = await App.getInitialProps(context);

  // NOTE: req、res 只在服务器端才存在
  // if(context.ctx.req) {
  //   // NOTE: 全局同步加载配置
  //   globalInitData = await getInitialData();
  // }
  /**
   * 获取初始化数据，每次客户端页面切换比如Link，该段逻辑都会执行
   * getInitialData 这个方法在 client/server 都实现单例及缓存,在重复执行的过程便不会打冗余请求
   * 类似于全局store，在服务器端per request便会初始化一次，客户端也会初始化一次
   * fetch 需要实现同构的、缓存库
   */

  const globalInitData = await getInitialData("_app");

  // suspense 悬停，在SSR处理部分水合

  // 返回的数据,plain object 支持序列化，警惕这里不要包括敏感信息
  return {
    ...ctx,
    globalInitData,
  };
};

export default MyApp;

/**
 * next dev headers are overwritten to prevent caching locally
 */

// export async function getInitialProps({Component, router, ctx}) {
//   info('Execute _App getInitialProps()!', 'executeReport');
  
//   // app的getInitialProps会在服务端被调用一次，后续在前端每次切换页面时被调用。

//   let pageProps = {}, appProps = {};
//   if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//   }
//   if (ctx && !ctx.req) {//客户端执行
//     // 直接从 HTML 中取数据
//       appProps = window.__NEXT_DATA__.props.appProps;
//   } else {//服务端执行
//       appProps = await executeAsyncFoo();
//   }
//   return {pageProps, appProps}
// }
