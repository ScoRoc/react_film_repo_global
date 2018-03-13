import React, { Component } from 'react';

const FilmPoster = props => {

  const { url, title } = props
  const posterUrl = 'https://image.tmdb.org/t/p/w780/' + url

  return (
    <img src={posterUrl} alt={title} />
  )
}

export default FilmPoster
