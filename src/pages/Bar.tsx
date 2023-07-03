/* eslint-disable react/no-unknown-property */
// @ts-nocheck

import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

const currentdate = new Date()
let min = currentdate.getMinutes()
if (min < 10) {
  min = '0' + min
}
const datetime =
  'Last synced ' + (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' at '

function Bar() {
  const [clockState, setClockState] = useState()

  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      setClockState(date.toLocaleTimeString())
    }, 1000)
  }, [])

  return (
    <div className="flex">
      <div
        className="flex items-center justify-center"
        style={{
          background: 'linear-gradient(45deg, #ac50ef, #7059fb 50%, #2ecff6)',
          lineHeight: 19,
          boxSizing: 'border-box',
          width: '100%',
          height: 19,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            verticalAlign: 'center',
            textAlign: 'center',
            color: 'white',
            lineHeight: 19,
          }}
        >
          {datetime}
        </Text>
        <div style={{ color: 'white', fontSize: 14 }}>
          <Text
            style={{
              fontSize: 14,
              verticalAlign: 'center',
              textAlign: 'center',
              color: 'white',
              lineHeight: 19,
            }}
          >
            {clockState}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Bar
