import '../styles/globals.css'

import * as React from 'react';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import {createEmotionCache} from '../utils/emotionCashe';
import {store} from '../store/store'
import {Provider} from 'react-redux'
import {SnackbarProvider} from "notistack";
import {SnackbarCloseButton} from "../components/hooks/useSnackbar";



// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function MyApp(props) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;


    return (
        <CacheProvider value={emotionCache}>
            <Provider store={store}>
                <Head>
                    <title>
                        ASIST
                    </title>

                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <SnackbarProvider maxSnack={3} autoHideDuration={5000}
                                  action={(key) => <SnackbarCloseButton snackbarKey={key}/>}>
                    <Component {...pageProps} />
                </SnackbarProvider>
            </Provider>
        </CacheProvider>
    );
}