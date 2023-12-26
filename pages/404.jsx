import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Custom404() {
  return (
    <Layout>
      <main className="items-center mx-auto pt-16 md:pt-24">
        <Head>
          <title>404 Error</title>
        </Head>
        <h2 className="text-xl text-center my-12">
          404 - Something went wrong!
        </h2>
        <div className="text-center">
          <Link href="/">Back to home</Link>
        </div>
      </main>
    </Layout>
  )
}
