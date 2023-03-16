import Head from "next/head";
import Script from "next/script";
// import Link from "next/link";
import { MainLayout } from "@/components";
import { useStoreContext } from '@/contexts';

// lazyOnload 是 async 脚本是非阻塞加载并且随机执行
export default function FirstPost() {
  console.log('FirstPost is render complete');
  const globalInitData = useStoreContext();
  console.log('FirstPost: globalInitData', globalInitData);
  return (
    <MainLayout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Script>
      {`
          window.tt = 'pantion is key of life';
      `}
      </Script>
      <h1>First Post</h1>
    </MainLayout>
  );
}

// 在开发模式，该函数getStaticProps，每次请求时都会执行
// export async function getStaticProps() {
//     // Get external data from the file system, API, DB, etc.
//     const data = null;

//     // The value of the `props` key will be
//     //  passed to the `Home` component
//     return {
//       props: {
//         data
//       }
//     }
// }
