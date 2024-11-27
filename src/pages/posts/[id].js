import Head from "next/head";
// import Script from "next/script";
// import Link from "next/link";
import { useRouter } from 'next/router';
import { MainLayout } from "@/components";
import { useStoreContext } from '@/contexts';

// lazyOnload 是 async 脚本是非阻塞加载并且随机执行
export default function Post(props) {

  const router = useRouter();

  console.log(`${router.query.id} Post is render complete`);
  return (
    <MainLayout>
      <Head>
        <title> {`${router.query.id} Post `}</title>
      </Head>
      <h1> {`${router.query.id} Post `}</h1>
    </MainLayout>
  );
}

