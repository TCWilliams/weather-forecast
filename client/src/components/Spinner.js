import React from 'react'

const Spinner = ({text}='Loading') => {
  return (
    <div>
      <div id="spinner" className="ui active inverted dimmer">
        <div className="ui text loader">{text}</div>
      </div>
      <p></p>
    </div>
  )
}

export default Spinner