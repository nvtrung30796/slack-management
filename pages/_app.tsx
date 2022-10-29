import React from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ThemeProvider from '../src/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Management Chat App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Trang cho phép quản lý dữ liệu của ứng dụng chat"/>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
    )
}

export default MyApp
