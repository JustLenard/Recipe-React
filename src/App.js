import React, { useEffect, useState } from 'react'
import Recipe from './Recipe'
import './App.css'

const App = () => {
	const APP_ID = 'affec02f'
	const APP_KEY = 'f721daeae16cbfd95cf18e79e7cdcf4a'

	const [recipes, setRecipes] = useState([])
	const [search, setSearch] = useState('chicken')

	useEffect(() => {
		getRecipes()
	}, [])

	const getRecipes = async () => {
		console.log('Doing get')
		const response = await fetch(
			`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
		)
		const data = await response.json()
		setRecipes(data.hits)
	}

	const updateSearch = e => {
		setSearch(e.target.value)
	}

	const getSearch = e => {
		getRecipes()
		e.preventDefault()
		setSearch('')
	}

	return (
		<div className="App">
			<form onSubmit={getSearch} className="search-form">
				<input
					className="search-bar"
					type="text"
					value={search}
					onChange={updateSearch}
				/>
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			<div className="recipies">
				{recipes.map((recipe, index) => (
					<Recipe
						key={index}
						title={recipe.recipe.label}
						calories={recipe.recipe.calories}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
		</div>
	)
}

export default App
