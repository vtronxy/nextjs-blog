import Head from 'next/head';

import { MainLayout, siteTitle } from '@/components';
import utilStyles from '@/styles/utils.module.css';
import Link from "next/link";
import { isEmpty } from 'lodash';
import { sleep } from '@/apis'

//NOTE: Home 首页组件
export default function Test(props) {
  const { test } = props;
  console.log('Home get isEmpty', isEmpty);
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
      </h2>
    </MainLayout>
  );
}

// NOTE: 只在Server端执行
/**
 * 在客户端切换场景下切换，next 会发起 GET 请求
 * http://localhost:3000/_next/data/development/index.json
 * 响应结果是：
 * {
 *  pageProps: {数据预取的数据},
 *  __N_SSP: true
 * }
 */
// NOTE: 在这里使用全局store的dispatch请求数据
// export async function getServerSideProps() {
//   console.log('Test page running');
//   // NOTE: response中的http协议中状态码 307 来完成页面重定向
//   /**
// When using redirect() you may notice that the status codes used are 307 for a temporary redirect, and 308 for a permanent redirect. While traditionally a 302 was used for a temporary redirect, and a 301 for a permanent redirect, many browsers changed the request method of the redirect, from a POST to GET request when using a 302, regardless of the origins request method.

// Taking the following example of a redirect from /users to /people, if you make a POST request to /users to create a new user, and are conforming to a 302 temporary redirect, the request method will be changed from a POST to a GET request. This doesn't make sense, as to create a new user, you should be making a POST request to /people, and not a GET request.

// The introduction of the 307 status code means that the request method is preserved as POST.

// 302 - Temporary redirect, will change the request method from POST to GET
// 307 - Temporary redirect, will preserve the request method as POST
// The redirect() method uses a 307 by default, instead of a 302 temporary redirect, meaning your requests will always be preserved as POST requests.
//    */
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false
//     }
//   }
// }
