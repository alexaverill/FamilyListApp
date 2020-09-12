import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  
  return <>

  <Container>
    <Navigation/>
  <Component {...pageProps} />
  </Container>
  </>
}

export default MyApp
