import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import Search from './Search'
import Error from './Error'

export default function Films() {
  const [films, setFilms] = useState([], null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getFilms = () => {
      axios
        .get(`https://swapi.dev/api/films/?search=${search}`)
        .then((res) => {
          const films = res.data.results
          setFilms(films)
        })
        .catch((error) => {
          if (error.res) {
            console.log(error.res.data)
            console.log(error.res.status)
            console.log(error.res.headers)
          } else if (error.req) {
            console.log(error.req)
          }
        })
    }
    getFilms()
  }, [search])

  if (films.length < 1) {
    return (
      <>
        <Search search={search} setSearch={setSearch} />
        <div className="title">
          <Error />
        </div>
      </>
    )
  }

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <div className="fade"></div>
      {films.map((film) => (
        <Card
          sx={{
            width: 'fit-content',
            color: '#feda4a',
            background: 'black',
          }}
          className="title"
          key={film.episode_id}
        >
          <h5>{film.title}</h5>
          <h5>{film.release_date}</h5>
        </Card>
      ))}
      <div className="star-wars">
        {films.slice(0,1).map((film) => (
          <section key={film.episode_id} className="crawl">
            {film.opening_crawl}
          </section>
        ))}
      </div>
    </>
  )
}
