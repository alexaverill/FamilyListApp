
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <>
  <Navigation/>
  <Container>
    
  <Component {...pageProps} />
  </Container>
  </>
}

export default MyApp
