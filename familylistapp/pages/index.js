import Head from 'next/head'
import HomeView from '../views/HomeView'
export default function Home() {
  console.log(process.env.URL);
  return (
    <>
        <Head>
        <title>List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView/>
    </>
  )
}
