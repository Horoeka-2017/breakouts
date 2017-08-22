import React from 'react'

class Banner extends React.Component {
  render () {
    return (
      <div className="banner">
        <div className="header">
          <h1 className="title is-1">React + Redux</h1>
          <h2 className="subtitle is-3">without react-redux</h2>
        </div>
        <figure className="image is-128x128">
          <img className="tile" src="/duck.svg" alt="" />
        </figure>
      </div>
    )
  }
}

export default Banner
