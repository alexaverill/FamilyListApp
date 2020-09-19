import Head from 'next/head'
import LoginView from '../views/LoginView'
export default function Home() {
  return (
    <>
        <Head>
        <title>List App - Login </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginView/>
    </>
  )
}
