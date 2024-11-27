import Head from 'next/head';
import { useRouter } from 'next/router';
import { MainLayout, siteTitle } from '@/components';
import { useStoreContext } from '@/contexts'
import utilStyles from '@/styles/utils.module.css';
import Link from "next/link";
// import { isEmpty } from 'lodash';
import { sleep } from '@/apis'

//NOTE: Home 首页
export default function Home(props) {
  const { test } = props;
  const router = useRouter();
  console.log('Home is render complete');

  const globalInitData = useStoreContext();
  console.log('Home: globalInitData', globalInitData);

  const handleDynamicClick = () => {
    router.push('/posts/[id]', undefined, {shallow: true});
  }

  return (
    <MainLayout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction: test value from {test}]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <h2>
        <Link href="/posts/first-post">first posts</Link>
        
        <br />
        <Link href="/posts/1">1 posts</Link>
        <button onClick={handleDynamicClick}>1 posts</button>
      </h2>
    </MainLayout>
  );
}

// NOTE: 只在Server端执行
/**
 * 在客户端切换场景下切换，Next动态加载页面时，会判断目标页面是否有data fetch
 * next 框架会发起 GET 请求,由 next 内置 node 服务处理
 * http://localhost:3000/_next/data/development/index.json
 * 响应结果是：
 * {
 *  pageProps: {数据预取的数据},
 *  __N_SSP: true
 * }
 * 虽然 getServerSideProps 为 server 端代码，但是客户端打包时好似仍然会将对应的代码打包到页面中，所以应当尽量避免其中有过于复杂的逻辑或引入一些较大的包
 */
// NOTE: 在这里使用全局store的dispatch请求数据
export async function getServerSideProps(context) {
  console.log('Home getServerSideProps running');
  await sleep(1000);
  console.log('Home getServerSideProps end');
  return {
    props: {
      test: '11111'
    }
  }
}

// NOTE: getInitialProps 功能等同 getServerSideProps, 后续被废弃
// NOTE: 在SPA路由切换场景，该段逻辑会在client端执行并非打请求(这是与getServerSideProps不同的地方)
// Home.getInitialProps = async (ctx) => {
//   //NOTE: 这里的ctx实质上是_app函数入参的 context.ctx
//   console.log('Home getInitialProps running: ');
//   await sleep(2000);
//   console.log('Home getInitialProps end');
//   // NOTE: 注意这里返回的数据格式（对比 getServerSideProps）
//   return {
//     test: '11111'
//   }
// }