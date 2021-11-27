import React from 'react'

const Loading = (props) => {
  return (
    <div className='container'>
      <div className='loading-container'>
        <div className='loading'>Loading {props.loading}...</div>
      </div>
    </div>
  )
}

export default Loading;