/* eslint-disable react/react-in-jsx-scope */
// @ts-nocheck
import { useCallback, useRef, useState } from 'react'
import { JSON_RPC_URL } from '../constants'
import DocumentationCards from './DocumentationCards'
import { SupportedLocale, SwapWidget, darkTheme, Theme } from '@uniswap/widgets'

// ↓↓↓ Don't forget to import the widgets' fonts! ↓↓↓
import '@uniswap/widgets/fonts.css'
// ↑↑↑

import { useActiveProvider } from '../connectors'
import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'
import React from 'react'
import store from '../../../../state'
import { Provider } from 'react-redux'

const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

export default function App() {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  // The locale to pass to the SwapWidget.
  // This is a value from the SUPPORTED_LOCALES exported by @uniswap/widgets.
  const [locale, setLocale] = useState<SupportedLocale>('en-US')

  const myDarkTheme: Theme = {
    ...darkTheme, // Extend the darkTheme
    // interactive: '#CBD6BA',
    // container: '#212429',
    module: '#202232',
    accent: '#6248ff',
    // outline: '#CADDC2',
    // dialog: '#FFF',
    // borderRadius: 0.8,
    // tokenColorExtraction: true,
  }

  return (
    <div className={styles.container}>
      {/* <HeaderBar /> */}
      {/* <div className={styles.i18n}>
        <label style={{ display: 'flex' }}>
          <FiGlobe />
        </label>
        <select onChange={onSelectLocale}>
          {SUPPORTED_LOCALES.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div> */}

      <main className={styles.main}>
        {/* <h1 className={styles.title}>Swap Widget</h1> */}

        <div className={styles.demo}>
          <div className={styles.connectors} ref={connectors} tabIndex={-1}>
            <Provider store={store}>
              <Web3Connectors />
            </Provider>
          </div>

          <div className={styles.widget}>
            <Provider store={store}>
              <SwapWidget
                jsonRpcEndpoint={JSON_RPC_URL}
                tokenList={TOKEN_LIST}
                provider={provider}
                locale={locale}
                onConnectWallet={focusConnectors}
                defaultInputTokenAddress="NATIVE"
                defaultInputAmount="1"
                // defaultOutputTokenAddress={UNI}
                theme={myDarkTheme}
              />
            </Provider>
          </div>
        </div>

        <hr className={styles.rule} />

        <DocumentationCards />
      </main>
    </div>
  )
}