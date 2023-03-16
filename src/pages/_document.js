import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { getInitialData } from "@/apis";
import { StoreContextProvider } from "@/contexts";
import { setGlobalData } from "@/utils";

const MODULE_VAR = "11111";
// 自定义 renderPage，只在Server端执行
MyDocument.getInitialProps = async (ctx) => {
  console.log('_document getInitialProps running');
  const originalRenderPage = ctx.renderPage;
  // 这是一个方法，全局只执行一次
  const appInitialData = await getInitialData('_document');
  setGlobalData("initAppData", appInitialData);
  // NOTE: 设在全局变量可以在 Server 端使用
  // 直接操作window，导致
  console.log(`_document getInitialProps running: ${appInitialData}`);
  // Run the React rendering logic synchronously
  ctx.renderPage = () =>
    originalRenderPage({
      // Useful for wrapping the whole react tree
      // 如果发生覆盖行为，下面的props一定要解构透传
      // NOTE: 只在服务器端执行，只在Server端才可以使用该 context,
      // 客户端React接管的内容只有 <App />,在客户端是无法使用该 context
      // 所以在自定义的 renderPage 是无法进行应用全局数据初始化
      // enhanceApp: (App) => (props) => (
      //   <StoreContextProvider value={{
      //     appInitialData
      //   }}>
      //     <App {...props} />
      //   </StoreContextProvider>
      // ),
      enhanceApp: (App) => App,
      // Useful for wrapping in a per-page basis
      enhanceComponent: (Component) => Component,
    });

  // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  // 同步执行React组件的渲染代码
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    appInitialData,
  };
};
// NOTE: 只在 Server 执行用于拼接完整的 HTML
// out of <Main /> 其它组件都不会再浏览器初始化
export default function MyDocument({ appInitialData }) {
  console.log('-------_document render completed-----------');
  return (
    <Html>
      <Head lang="zh-CN">
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge, chrome=1" />
        <meta name="renderer" content="webkit|ie-comp|ie-stand" />
        <meta name="keywords" content="Next.js demo" />
        <meta
          name="description"
          content={"This is a next.js demo 手动添加meta标签"}
        />
        {/* <script src="/externals/vendors/axios/0.18.1/axios.min.js"/> */}
      </Head>
      <body>
        <div
          style={{ width: "500px", height: "300px", backgroundColor: "deeppink" }}
        >
          {appInitialData}
        </div>
        {/* Main 传递额外属性数据后，_app.js 无法接受该属性数据, 不知道该 */}
        <Main className="fuck your fuck" id="fuck" appInitialData={appInitialData}/>
        {/* <Main /> */}
        <NextScript />
        {/* 
          0. 脚本只会在「客户端」进行加载
          1. <Script></Script> 在_document.js中的放置的位置一定是紧跟<NextScript /> 之后
          2. 「beforeInteractive」 无论 <Script/> 在组件树中的何处位置，最后都渲染在 head 标签中，无法使用onLoad只能使用onReady事件
          3. 如果不指定 strategy,那么默认值是 afterInteractive
        */}
        <Script
          src="/externals/vendors/axios/0.18.1/axios.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/externals/vendors/lodash/4.17.21/lodash.min.js"
          strategy="beforeInteractive"
        />
        {/* 
          1. 可以取，数据预取中的数据
        */}
        <Script strategy="afterInteractive">
          {`
            window.initAppData = ${JSON.stringify(appInitialData)};
            console.log('I am running document afterInteractive script');
          `}
        </Script>
        {/* 
          1. 可以取，模块中的变量
        */}
        <Script strategy="beforeInteractive">
          {`
            // 注意模板字符串语法底层调用的是对象的 toString方法，与JSON.stringify()不同
            // 涉及到网络传输，要把值进行序列化这样用户在window上取值时，可以保障值正确类型
            window.moduleVar = ${JSON.stringify(MODULE_VAR)};
            console.log('I am running document beforeInteractive script');
          `}
        </Script>
      </body>
    </Html>
  );
}
