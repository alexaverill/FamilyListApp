import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomeView from '../views/HomeView'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView/>
    </div>
  )
}
