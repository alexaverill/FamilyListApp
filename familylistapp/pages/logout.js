import Head from 'next/head'
import LoginView from '../views/LoginView'
import {endSession} from '../utils/session'
import Router from 'next/router';
import { useEffect } from 'react';
export default function Home() {

useEffect(()=>{
    endSession();
    Router.push("/login");
});
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