import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Error({ statusCode }) {
  return (
    <Layout>
      <main className="items-center mx-auto pt-16 md:pt-24">
        <Head>
          <title>{`${statusCode} Error`}</title>
        </Head>
        <h2 className="text-xl text-center my-12">
          {statusCode ? `${statusCode} - Something went wrong!` : 'Something went wrong!'}
        </h2>
        <div className="text-center">
          <Link href="/">Back to home</Link>
        </div>
      </main>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
