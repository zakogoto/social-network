import React from 'react'
import preloader from '../assets/image/preloader.svg'

export default function Preloader() {
  return (
    <div style={{'textAlign': 'center'}}>
      <img src={preloader} alt="preloader"  style={{'height': '200px'}}/>
    </div>
  )
}
