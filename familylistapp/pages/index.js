import Head from 'next/head'
import HomeView from '../views/HomeView'
export default function Home() {
  console.log(process.env.URL);
  return (
    <>
        <Head>
        <title>List App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="android-chrome-192x192.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="android-chrome-512x512.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"/>

      </Head>
      <HomeView/>
    </>
  )
}
