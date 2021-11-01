import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Films() {
  const [films, setFilms] = useState([])
  const [wookiee, setWookie] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getFilms = () => {
      axios
        .get(`https://swapi.dev/api/films/?search=${search}`)
        .then(res => {
          const films = res.data.results
          console.log(films)
          setFilms(films)
        })
        .catch(error => { 
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
  
  const handleClick = () => {
    axios 
     .get(`https://swapi.dev/api/films/?format=wookiee`)
     .then(res => {
       const wookiee = res.data
       setWookie(wookiee)
     })
     .catch(error => {
        if (error.res) {
         console.log(error.res.data)
         console.log(error.res.status)
         console.log(error.res.headers)
       } else if (error.req) {
         console.log(error.req)
       }
     })
  }
  
  const handleClear = () => {setWookie(null)}

  if (films.length < 1) {
    return (
      <>
      <div className="input">
        <div>
          <input 
            type="text"
            placeholder="Search a Film"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="film">
        <h3>No results found.</h3>
      </div>
      </>
    )
   }

  return (
    <>
    <div className="input">
      <div>
        <input 
          type="text"
          placeholder="Search a Film"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleClick}>Wookie</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
    <div className="wookiee">
      <section>{wookiee}</section>  
    </div>
    <div className="film">
      {films.map((film) => (
        <div className="" key={film.episode_id}>
          <h2>{film.title}</h2>
          <h3>{film.release_date}</h3>
          <section>{film.opening_crawl}</section>
        </div>
      ))}
    </div>
    </>      
  )
}
  
