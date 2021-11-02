import { useState, useCallback } from 'react'
import axios from 'axios'
import { Card, Button, CardContent } from '@mui/material'


export default function Search({ search, setSearch }) {
	const [wookiee, setWookie] = useState('')

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

	const handleChange = useCallback((e) => {
		setSearch(e.target.value)
		},[setSearch]) 

	if (wookiee) {
		return (
			<>
			<button onClick={handleClear}>Clear</button>		
			<Card sx={{width: "fit-content"}}>
				<CardContent>
				{wookiee}
				</CardContent>
			</Card>
		</>
		)
	}

	return (
		<>  
		 <div className="input">
			<input 
				type="text"
				placeholder="Search a Film"
				value={search}
				onChange={handleChange}
			/>
			<Button sx={{
				background: "#feda4a",
				color: "black",
				margin: "0.1em"
			}}
			size="small" 
			onClick={handleClick}>
				Wookie
			</Button>
			<Button 
			sx={{
				background: "#feda4a", 
				color: "black", 
				margin: "0.1em"
			}}  
			size="small" 
			onClick={handleClear}>
				Clear
			</Button>		
		 </div>
		</>
	)
}