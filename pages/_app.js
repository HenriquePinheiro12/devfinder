import GlobalStyle from "../src/components/GlobalStyle"


function MyApp({ Component, pageProps }) {
    console.log('custom app')
    return (
        <>
        <GlobalStyle/>
        <Component {...pageProps} children='a'/>
        </>
    )
  }

  export default MyApp