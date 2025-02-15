import React, { useEffect, useMemo } from 'react'
import { PageWrapper } from 'pages/styled'
import { AutoColumn } from 'components/Column'
import { TYPE } from 'theme'
import PoolTable from 'components/pools/PoolTable'
import { useAllPoolData, usePoolDatas } from 'state/pools/hooks'
import { notEmpty } from 'utils'
import { useSavedPools } from 'state/user/hooks'
import { DarkGreyCard } from 'components/Card'
import Bar from '../Bar'
// import TopPoolMovers from 'components/pools/TopPoolMovers'

export default function PoolPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // get all the pool datas that exist
  const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((p) => p.data)
      .filter(notEmpty)
  }, [allPoolData])

  const [savedPools] = useSavedPools()
  const watchlistPools = usePoolDatas(savedPools)

  return (
    <PageWrapper>
      <AutoColumn gap="16px">
        <h1
          style={{
            lineHeight: '80px',
            fontSize: 40,
            color: 'white',
            margin: 0,
            padding: 0,
            textAlign: 'center',
          }}
        >
          Pools
        </h1>
        <Bar></Bar>
        <div style={{
          width: "90%",
          margin: "auto"}}
        >  
          <div
            style={{
              borderRadius: 15,
              backgroundColor: 'rgba(32, 34, 50, 0.5)',
              padding: 15,
              marginTop: 25,
            }}
          >
            <TYPE.main style={{ marginBottom: 10 }}>Your Watchlist</TYPE.main>
            {watchlistPools.length > 0 ? (
              <PoolTable poolDatas={watchlistPools} />
            ) : (
              <DarkGreyCard>
                <TYPE.main>Saved pools will appear here</TYPE.main>
              </DarkGreyCard>
            )}
          {/* <HideSmall>
            <DarkGreyCard style={{ paddingTop: '12px' }}>
              <AutoColumn gap="md">
                <TYPE.mediumHeader fontSize="16px">Trending by 24H Volume</TYPE.mediumHeader>
                <TopPoolMovers />
              </AutoColumn>
            </DarkGreyCard>
          </HideSmall> */}
          <br />
            <TYPE.main style={{ marginBottom: 10 }}>All Pools</TYPE.main>
            <PoolTable poolDatas={poolDatas} />
          </div>
        </div>
      </AutoColumn>
    </PageWrapper>
  )
}
